import { ProposalType, ProposalsType } from "../../../common/types";

export default function Proposal(props: ProposalsType) {
    console.log(props);
    return <div>{props.proposals[0].borrowerAddress}</div>;
}

export async function getServerSideProps() {
    // const res = await fetch(`https://.../data`);

    const props: ProposalsType = {
        proposals: [
            {
                borrowerAddress: "",
                tokenAddress: "",
                principal: 0,
                interest: 0,
                lengthDays: 0,
                lenderAddress: "",
                fundDay: 0,
                repaid: false,
            },
            {
                borrowerAddress: "",
                tokenAddress: "",
                principal: 0,
                interest: 0,
                lengthDays: 0,
                lenderAddress: "",
                fundDay: 0,
                repaid: false,
            },
        ],
    };

    return {
        props: props,
    };
}
