import { Address } from "wagmi";

export enum LoanState {
    UNFUNDED = "UNFUNDED",
    ACTIVE = "ACTIVE",
    REPAID = "REPAID",
}

export interface Loan {
    id: string;
    borrower: Address;
    token: Address;
    principal: number;
    interest: number;
    lengthDays: number;
    lender: Address;
    fundDay: number;
    repayDay: number;
    title?: string;
    description?: string;
    state: LoanState;
}

export type ProposalsType = {
    fundedProposals: Loan[];
    createdProposals: Loan[];
};
