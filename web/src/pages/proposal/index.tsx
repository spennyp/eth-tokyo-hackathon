import ProposalCard from "@/components/ProposalCard";
import { createdProposals, fundedProposals } from "../../../common/mock";
import { ProposalsType } from "../../../common/types";

export default function Proposal(props: ProposalsType) {
    return (
        <div className="flex w-full h-full flex-col justify-start items-center px-[20px] pb-[70px] space-y-8">
            <p className="text-[40px] font-bold text-center">Funded Proposals</p>
            <div className="grid grid-cols-2 w-full h-fit gap-8 justify-items-center">
                {props.fundedProposals.map((element, id) => {
                    return <ProposalCard key={id} proposal={element} />;
                })}
            </div>
            <p className="text-[40px] font-bold text-center">Created Proposals</p>
            <div className="grid grid-cols-2 w-full h-fit gap-8 justify-items-center">
                {props.createdProposals.map((element, id) => {
                    return <ProposalCard key={id} proposal={element} />;
                })}
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
