// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    struct proposal {
        address borrower;
        address lender;
        uint256 amount;
        address token;
        // simple annualized interest in bps
        uint256 interest;
        uint256 loanLengthDays;
        uint256 blockNumberEnd;
    }
    // 1% interest (0.01) -> 100 bps
    uint256 public bps_numberator = 10000;
    //    1% -> 1 * 10^4 = 10,000  (interest in bps)
    //      1 day of interest at a 1% annualized rate
    //      1% / 365 -> 10,000 / 365 = 27


}
