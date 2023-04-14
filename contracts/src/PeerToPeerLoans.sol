// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IERC20} from "openzeppelin-contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "openzeppelin-contracts/token/ERC20/utils/SafeERC20.sol";

contract PeerToPeerLoans {
    using SafeERC20 for IERC20;

    struct Loan {
        // Loan create
        address borrower;
        address token;
        uint256 principal;
        uint256 interest; // Simple anualized interest stored in bips (10^4), i.e 1% = 0.01 => 100 bips
        uint256 lengthDays;
        // Loan fund
        address lender;
        uint256 fundDay;
        // Loan repay
        bool repaid;
    }

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

    Loan[] public loans;

    function createLoan(address _token, uint256 _principal, uint256 _interest, uint256 _lengthDays)
        external
        returns (uint256 id)
    {
        require(_principal != 0, "createProposal/zero-principal");
        require(_lengthDays >= 1, "createProposal/loan-length-too-short");

        uint256 expectedReturn = computeInterest(_principal, _interest, _lengthDays);
        require(((expectedReturn > 0) || (_interest == 0)), "createProposal/unintentional-zero-interest");

        Loan memory loan = Loan({
            borrower: msg.sender,
            token: _token,
            principal: _principal,
            interest: _interest,
            lengthDays: _lengthDays,
            // Gets populated later
            lender: address(0),
            fundDay: 0,
            repaid: false
        });

        id = loans.length;
        loans.push(loan);

        emit LoanCreated(id, loan.borrower, loan.token, loan.principal, loan.interest, loan.lengthDays);

        return id;
    }

    function fundLoan(uint256 id) external {
        Loan storage loan = loans[id];

        require(loan.lender == address(0), "fundProposal/proposal-already-funded");
        require(loan.lender != msg.sender, "fundProposal/self-funding-not-allowed");

        loan.lender = msg.sender;
        loan.fundDay = block.timestamp / 1 days;

        IERC20(loan.token).safeTransferFrom(loan.lender, loan.borrower, loan.principal);

        emit LoanFunded(id, loan.lender, loan.fundDay);
    }

    function repayLoan(uint256 id) external {
        Loan storage loan = loans[id];

        require(msg.sender == loan.borrower, "repayLoan/not-borrower");
        require(loan.lender != address(0), "repayLoan/not-funded");
        require(!loan.repaid, "repayLoan/already-repaid");

        loan.repaid = true;

        uint256 loanLifetime = block.timestamp / 1 days - loan.fundDay; // To clamp this to the loan length ?
        uint256 repayAmount = loan.principal + computeInterest(loan.principal, loan.interest, loanLifetime);
        IERC20(loan.token).safeTransferFrom(loan.borrower, loan.lender, repayAmount);

        emit LoanRepayed(id);
    }

    // Interest amount = principal * interest * daysBorrowed / 365 / 10^4
    function computeInterest(uint256 principal, uint256 interestBips, uint256 daysBorrowed)
        public
        pure
        returns (uint256 interest)
    {
        return principal * interestBips * daysBorrowed / 365 / 10 ** 4;
    }
}
