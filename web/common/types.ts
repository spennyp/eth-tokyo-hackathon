export interface ProposalType {
    id: string;
    borrower: string;
    token: string;
    principal: number;
    interest: number;
    lengthDays: number;
    lender: string;
    fundDay: number;
    repayDay: number;
    state: LoanState;
}

export type ProposalsType = {
    fundedProposals: ProposalType[];
    createdProposals: ProposalType[];
}
 
export enum LoanState {
    UNFUNDED= "UNFUNDED",
    ACTIVE= "ACTIVE",
    REPAID= "REPAID",
}