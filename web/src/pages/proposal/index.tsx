import ProposalCard from "@/components/ProposalCard";
import { createdProposals, fundedProposals } from "../../common/mock";
import { ProposalsType } from "../../common/types";
import { getLoansFromSubgraph } from "@/common/subgraphQuery";
import { useAccount } from "wagmi";

export default function Proposal(props: ProposalsType) {
    console.log(props);
    return (
        // <div className="flex w-full h-full flex-col justify-start items-center px-[20px] pb-[70px] space-y-8">
        <div className="flex w-full max-w-[1000px] mx-auto h-full flex-col justify-start items-center px-[20px] pb-[70px] space-y-8">
            <p className="text-[40px] font-bold text-left self-start">Funded Proposals</p>
            <div className="grid grid-cols-2 w-full h-fit gap-8 justify-items-center">
                {props.fundedProposals.map((element, id) => {
                    return <ProposalCard key={id} proposal={element} />;
                })}
            </div>
            <p className="text-[40px] font-bold text-left self-start">Created Proposals</p>
            <div className="grid grid-cols-2 w-full h-fit gap-8 justify-items-center">
                {props.createdProposals.map((element, id) => {
                    return <ProposalCard key={id} proposal={element} />;
                })}
            </div>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    // const loans = await getLoansFromSubgraph();
    // const loansOrSeed = loans ?? exploreProposals;

    // Not pulling from the graph right now
    const props: ProposalsType = {
        fundedProposals: fundedProposals,
        createdProposals: createdProposals,
    };

    return {
        props: props,
    };
}
