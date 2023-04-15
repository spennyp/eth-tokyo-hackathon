// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/PeerToPeerLoans.sol";
import {IERC20} from "openzeppelin-contracts/token/ERC20/IERC20.sol";

contract PeerToPeerLoansTest is Test {
    ////
    // Globals
    ////
    address DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;

    // Contracts under test
    PeerToPeerLoans public peerToPeerLoans;

    // Users
    address deployer;
    address borrower;
    address lender;

    // Expected events
    event LoanCreated(
        uint256 indexed id,
        address indexed borrower,
        address indexed token,
        uint256 principal,
        uint256 interest,
        uint256 lengthDays
    );

    event LoanFunded(uint256 indexed id, address indexed lender, uint256 fundDay);

    event LoanRepayed(uint256 indexed id);

    ////
    // Setup
    ////

    function setUp() public {
        uint256 mainnetFork = vm.createFork(vm.envString("MAINNET_RPC_URL"));
        uint256 mainnetBlockNumber = 14700000;

        vm.selectFork(mainnetFork);
        vm.rollFork(mainnetBlockNumber);

        deployer = vm.addr(1);
        borrower = vm.addr(2);
        lender = vm.addr(3);

        deal(deployer, 10e18);
        deal(borrower, 10e18);
        deal(lender, 10e18);

        deal(DAI, lender, 10e18);
        deal(DAI, borrower, 10e18);

        vm.prank(deployer);
        peerToPeerLoans = new PeerToPeerLoans();
    }

    function test_ComputeInterest() public {
        uint256 expected0 = peerToPeerLoans.computeInterest(10 ** 18, 100, 365);
        assertEq(expected0, 1 * 10 ** 16);

        uint256 expected1 = peerToPeerLoans.computeInterest(2 * 10 ** 18, 10, 40);
        assertEq(expected1, 219178082191780);

        uint256 expected2 = peerToPeerLoans.computeInterest(2 * 10 ** 18, 0, 40);
        assertEq(expected2, 0);
    }

    function test_CreateLoan() public {
        vm.startPrank(borrower);

        uint256 _principal = 1 * 10 ** 18;
        uint256 _interest = 100; // 1%
        uint256 _lengthDays = 365 * 2;

        // Expect this event to emit
        vm.expectEmit(true, true, true, true); // Check all indexed, and data
        emit LoanCreated(0, borrower, DAI, _principal, _interest, _lengthDays);

        uint256 id0 = peerToPeerLoans.createLoan(DAI, _principal, _interest, _lengthDays);
        assertEq(id0, 0);

        uint256 id1 = peerToPeerLoans.createLoan(DAI, _principal, _interest, _lengthDays);
        assertEq(id1, 1);

        (
            address b,
            address token,
            uint256 principal,
            uint256 interest,
            uint256 lengthDays,
            address l,
            uint256 fundDay,
            bool repaid
        ) = peerToPeerLoans.getLoan(id1);
        assertEq(b, borrower);
        assertEq(token, DAI);
        assertEq(principal, _principal);
        assertEq(interest, _interest);
        assertEq(lengthDays, _lengthDays);
        assertEq(l, address(0));
        assertEq(fundDay, 0);
        assertEq(repaid, false);
    }

    function test_FundLoan() public {
        uint256 _principal = 1 * 10 ** 18;
        uint256 _interest = 100; // 1%
        uint256 _lengthDays = 365 * 2;

        vm.prank(borrower);
        uint256 id = peerToPeerLoans.createLoan(DAI, _principal, _interest, _lengthDays);

        uint256 borrowerBalanceBefore = IERC20(DAI).balanceOf(borrower);
        uint256 lenderBalanceBefore = IERC20(DAI).balanceOf(lender);

        vm.startPrank(lender);
        IERC20(DAI).approve(address(peerToPeerLoans), _principal);

        vm.expectEmit(true, true, true, true); // Check all indexed, and data
        emit LoanFunded(id, lender, block.timestamp / 1 days);
        peerToPeerLoans.fundLoan(id);

        uint256 borrowerBalanceIncreace = IERC20(DAI).balanceOf(borrower) - borrowerBalanceBefore;
        uint256 lenderBalanceDecreace = lenderBalanceBefore - IERC20(DAI).balanceOf(lender);

        (,,,,, address loanLender, uint256 loanFundDay,) = peerToPeerLoans.getLoan(id);

        assertEq(loanLender, lender);
        assertEq(loanFundDay, block.timestamp / 1 days);
        assertEq(borrowerBalanceIncreace, _principal);
        assertEq(lenderBalanceDecreace, _principal);
    }

    function test_RepayLoan() public {
        uint256 _principal = 1 * 10 ** 18;
        uint256 _interest = 100; // 1%
        uint256 _lengthDays = 365 * 2;
        uint256 _fundBlockNumber = 14710000;
        uint256 _repayBlockNumber = 14810000;

        // Create loan
        vm.prank(borrower);
        uint256 id = peerToPeerLoans.createLoan(DAI, _principal, _interest, _lengthDays);

        // Fund loan
        vm.rollFork(_fundBlockNumber);
        deal(DAI, lender, 10e18);
        deal(DAI, borrower, 10e18);
        vm.startPrank(lender);
        IERC20(DAI).approve(address(peerToPeerLoans), _principal);
        peerToPeerLoans.fundLoan(id);
        vm.stopPrank();
        uint256 fundDay = block.timestamp / 1 days;

        uint256 borrowerBalanceBefore = IERC20(DAI).balanceOf(borrower);
        uint256 lenderBalanceBefore = IERC20(DAI).balanceOf(lender);

        // Repay loan
        vm.rollFork(_repayBlockNumber);
        deal(DAI, borrower, borrowerBalanceBefore);
        deal(DAI, lender, lenderBalanceBefore);

        uint256 loanLifetime = (block.timestamp / 1 days) - fundDay;
        uint256 repayAmount = _principal + peerToPeerLoans.computeInterest(_principal, _interest, loanLifetime);
        vm.startPrank(borrower);
        IERC20(DAI).approve(address(peerToPeerLoans), repayAmount);
        peerToPeerLoans.repayLoan(id);

        uint256 borrowerBalanceDecreace = borrowerBalanceBefore - IERC20(DAI).balanceOf(borrower);
        uint256 lenderBalanceIncreace = IERC20(DAI).balanceOf(lender) - lenderBalanceBefore;

        (,,,,,,, bool repaid) = peerToPeerLoans.getLoan(id);

        assertEq(repaid, true);
        assertEq(borrowerBalanceDecreace, repayAmount);
        assertEq(lenderBalanceIncreace, repayAmount);
    }
}
