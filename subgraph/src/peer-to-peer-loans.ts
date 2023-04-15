import {
    LoanCreated as LoanCreatedEvent,
    LoanFunded as LoanFundedEvent,
    LoanRepayed as LoanRepayedEvent,
} from "../generated/PeerToPeerLoans/PeerToPeerLoans";
import { LoanCreated, LoanFunded, LoanRepayed, Loan } from "../generated/schema";

import { Address, BigInt } from "@graphprotocol/graph-ts";
import { INTEREST_SCALER, LoanState, SEC_PER_DAY } from "./common/constants";

export function handleLoanCreated(event: LoanCreatedEvent): void {
    let entity = new LoanCreated(event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString());
    entity.loanId = event.params.id;
    entity.borrower = event.params.borrower.toHexString();
    entity.token = event.params.token.toHexString();
    entity.principal = event.params.principal;
    entity.interest = event.params.interest;
    entity.lengthDays = event.params.lengthDays;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash.toHexString();

    entity.save();

    let loan = new Loan(entity.loanId.toString());
    loan.borrower = entity.borrower;
    loan.token = entity.token;
    loan.principal = entity.principal;
    loan.interest = entity.interest.toBigDecimal().div(INTEREST_SCALER);
    loan.lengthDays = entity.lengthDays.toI32();
    loan.lender = Address.zero().toHexString();
    loan.fundDay = BigInt.fromI32(0);
    loan.repayDay = BigInt.fromI32(0);
    loan.state = LoanState.UNFUNDED;
    loan.save();
}

export function handleLoanFunded(event: LoanFundedEvent): void {
    let entity = new LoanFunded(event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString());
    entity.loanId = event.params.id;
    entity.lender = event.params.lender.toHexString();
    entity.fundDay = event.params.fundDay;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash.toHexString();

    entity.save();

    let loan = Loan.load(entity.loanId.toString()) as Loan;
    loan.state = LoanState.ACTIVE;
    loan.lender = entity.lender;
    loan.fundDay = entity.fundDay;
    loan.repayDay = BigInt.fromI32(0);
    loan.save();
}

export function handleLoanRepayed(event: LoanRepayedEvent): void {
    let entity = new LoanRepayed(event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString());
    entity.loanId = event.params.id;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash.toHexString();

    entity.save();

    let loan = Loan.load(entity.loanId.toString()) as Loan;
    loan.state = LoanState.REPAID;
    loan.repayDay = event.block.timestamp.div(SEC_PER_DAY);
    loan.save();
}
