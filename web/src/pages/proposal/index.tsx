import { ProposalType, ProposalsType } from "../../../common/types";

export default function Proposal(props: ProposalsType) {
    return (
        <div className="flex w-screen flex-col justify-center px-[20px] pt-[35px] pb-[70px] sm:px-[210px] md:flex-row md:pb-[106px] md:pt-[35px] lg:space-x-[80px] xl:space-x-[291px]">
            <p className="text-4xl font-bold">Funded Proposals</p>
            <p className="text-4xl font-bold">Created Proposals</p>
            <p>{props.fundedProposals[0].borrowerAddress}</p>
            <p>{props.createdProposals[0].borrowerAddress}</p>
        </div>
    );
}

export async function getServerSideProps() {
    // const res = await fetch(`https://.../data`);

    const props: ProposalsType = {
        fundedProposals: [
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
        createdProposals: [
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
