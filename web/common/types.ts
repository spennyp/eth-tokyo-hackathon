export type ProposalType = {
    borrowerAddress: string;
    tokenAddress: string;
    principal: number;
    interest: number;
    lengthDays: number;
    lenderAddress: string;
    fundDay: number;
    repaid: boolean;
}

export type ProposalsType = {
    proposals: ProposalType[];
}