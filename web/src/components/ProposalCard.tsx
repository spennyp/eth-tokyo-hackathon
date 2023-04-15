import { ProposalType } from "../../common/types";

interface IProps {
    proposal: ProposalType;
}

export default function ProposalCard({ proposal }: IProps) {
    return (
        <div className="flex w-screen flex-col justify-center px-[20px] pt-[35px] pb-[70px]">
            <p className="text-4xl font-bold">Funded Proposals</p>
            <p className="text-2xl font-base">borrower {proposal.borrower}</p>
            <p className="text-2xl font-base">token {proposal.token}</p>
            <p className="text-2xl font-base">principal {proposal.principal}</p>
        </div>
    );
}
