import ProposalCard from "@/components/ProposalCard";
import { exploreProposals } from "../../common/mock";
import { ProposalType } from "../../common/types";

interface IProposals {
    proposals: ProposalType[];
}

export default function Explore(props: IProposals) {
    return (
        <div className="flex w-full h-full flex-col justify-start items-center px-[20px] pb-[70px] space-y-8">
            <p className="pl-24 text-[40px] font-bold self-start">Explore Proposals</p>
            <div className="grid grid-cols-2 w-full h-fit gap-8 justify-items-center">
                {props.proposals.map((element, id) => {
                    return <ProposalCard key={id} proposal={element} />;
                })}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    // const res = await fetch(`https://.../data`);

    return {
        props: { proposals: exploreProposals },
    };
}
