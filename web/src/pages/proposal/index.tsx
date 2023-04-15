import ProposalCard from "@/components/ProposalCard";
import { createdProposals, fundedProposals } from "../../../common/mock";
import { ProposalsType } from "../../../common/types";

export default function Proposal(props: ProposalsType) {
    return (
        <div className="flex w-screen flex-col justify-center px-[20px] pt-[35px] pb-[70px]">
            <p className="text-4xl font-bold">Funded Proposals</p>
            <ProposalCard proposal={fundedProposals[0]} />
            <ProposalCard proposal={fundedProposals[1]} />
            <p className="text-4xl font-bold">Created Proposals</p>
            <ProposalCard proposal={createdProposals[0]} />
            <ProposalCard proposal={createdProposals[1]} />
        </div>
    );
}

export async function getServerSideProps() {
    // const res = await fetch(`https://.../data`);

    const props: ProposalsType = {
        fundedProposals: fundedProposals,
        createdProposals: createdProposals,
    };

    return {
        props: props,
    };
}
