import ProposalCard from "@/components/ProposalCard";
import { createdProposals, fundedProposals } from "../../../common/mock";
import { ProposalsType } from "../../../common/types";

export default function Proposal(props: ProposalsType) {
    return (
        <div className="flex w-full h-full flex-col justify-start items-center px-[20px] pb-[70px] space-y-8">
            <p className="text-4xl font-bold text-center">Funded Proposals</p>
            <div className="grid grid-cols-2 w-full h-fit gap-8 justify-items-center">
                <ProposalCard proposal={fundedProposals[0]} />
                <ProposalCard proposal={fundedProposals[1]} />
                <ProposalCard proposal={fundedProposals[0]} />
                <ProposalCard proposal={fundedProposals[0]} />
            </div>
            <p className="text-4xl font-bold text-center">Created Proposals</p>
            <div className="grid grid-cols-2 w-full h-fit gap-8 justify-items-center">
                <ProposalCard proposal={createdProposals[0]} />
                <ProposalCard proposal={createdProposals[1]} />
                <ProposalCard proposal={createdProposals[1]} />
            </div>
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
