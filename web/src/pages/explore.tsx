import ProposalCard from "@/components/ProposalCard";
import { exploreProposals } from "../common/mock";
import { Loan } from "../common/types";
import { getLoansFromSubgraph } from "@/common/subgraphQuery";

interface IProposals {
    proposals: Loan[];
}

export default function Explore(props: IProposals) {
    return (
        <div className="flex w-full max-w-[1000px] mx-auto h-full flex-col justify-start items-center px-[20px] pb-[70px] space-y-8">
            <p className="text-[40px] font-bold self-start">Explore Proposals</p>
            <div className="grid grid-cols-2 w-full h-fit gap-8 justify-items-center">
                {props.proposals.map((element, id) => {
                    return <ProposalCard key={id} proposal={element} />;
                })}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const loans = await getLoansFromSubgraph();
    const loansWithSeeded = (loans ?? []).concat(exploreProposals);

    return {
        props: { proposals: loansWithSeeded },
    };
}
