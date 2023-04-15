export interface ProposalType {
    borrower: string;
    token: string;
    principal: number;
    interest: number;
    lengthDays: number;
    lender: string;
    fundDay: number;
    repaid: boolean;
    id: string;
}

export type ProposalsType = {
    fundedProposals: ProposalType[];
    createdProposals: ProposalType[];
}