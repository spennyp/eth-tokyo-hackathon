import { useRouter } from "next/router";
import { ProposalType } from "../../../../common/types";
import { proposal } from "../../../../common/mock";
import { useState } from "react";
import { Progress } from "@chakra-ui/react";

export default function ProposalPage(props: ProposalType) {
    const router = useRouter();
    const { borrowerAddress, proposalId } = router.query;
    const [status, setStatus] = useState(0);

    return (
        <div className="flex w-screen flex-col justify-center px-[20px] pt-[35px] pb-[70px] sm:px-[210px] md:flex-row md:pb-[106px] md:pt-[35px] lg:space-x-[80px] xl:space-x-[291px]">
            <div className="flex flex-col justify-start max-w-[400px] w-[400px] self-center space-y-4">
                <p className="text-[40px] font-bold">{props.title}</p>
                <p className="">{props.description}</p>
                <p>Created by: {props.borrower}</p>
                <p>Loan Amount: ${props.principal}</p>
                <p>Loan Period: {props.lengthDays} days</p>
                <p>Interest Rate: {props.interest}%</p>
                <p>Payment in: USDC</p>
                <p>Views: 1k</p>
                <Progress hasStripe value={64} />
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    // const res = await fetch(`https://.../data`);

    return {
        props: proposal,
    };
}

// borrower: string;
// token: string;
// principal: number;
// interest: number;
// lengthDays: number;
// lender: string;
// fundDay: number;
// repayDay: number;
// title: string;
// description: string;
// state: LoanState;
