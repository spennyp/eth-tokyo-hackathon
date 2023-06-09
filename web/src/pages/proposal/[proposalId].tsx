import { useRouter } from "next/router";
import { Loan } from "../../common/types";
import { exploreProposals } from "../../common/mock";
import { useState } from "react";
import { Progress } from "@chakra-ui/react";
import Image from "next/image";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { getLoanFromSubgraph } from "@/common/subgraphQuery";
import useFundLoan from "@/hooks/useFundLoan";
import { BigNumber } from "ethers";
import TransactionModal from "@/components/TransactionModal";
import useRepayLoan from "@/hooks/useRepayLoan";

export default function ProposalPage(props: Loan) {
    const router = useRouter();
    const { proposalId } = router.query;
    const [fundLoanTransactionModalOpen, setFundLoanTransactionModalOpen] = useState<boolean>(false);
    const [repayLoanTransactionModalOpen, setRepayLoanTransactionModalOpen] = useState<boolean>(false);

    const fundLoanResponse = useFundLoan({
        loanId: BigNumber.from(Math.abs(parseInt(proposalId as string)).toString()),
    });

    const repayLoanResponse = useRepayLoan({
        loanId: BigNumber.from(Math.abs(parseInt(proposalId as string)).toString()),
    });

    return (
        <div className="flex w-[800px] mx-auto flex-col justify-start items-center space-y-4 px-[20px]">
            <div className="flex flex-row items-start w-full justify-between">
                <div className="flex flex-col max-w-[400px] w-full">
                    <p className="text-[40px] font-bold">{props.title ?? "Fresh and Fab Laundry"}</p>
                    <Badge status={props.state.charAt(0) + props.state.slice(1).toLowerCase()} />
                    <p className="text-[15px] text-slate-400 mb-12">Created by: {props.borrower}</p>
                    <p className="">
                        {props.description ??
                            "Introducing Fresh and Fab Laundry, a female-driven venture providing superior, eco-friendly laundry services for busy urbanites. We're seeking a $0.1 business loan at a 1.5% interest rate to revolutionize the laundry experience with innovative cleaning technology and exceptional customer care. Our projected earnings estimate is $8,000 in the first year, with a promising 25% annual growth rate. Loan repayments will be made in convenient monthly installments, addressing both principal and interest, ensuring a transparent and trustworthy collaboration. Invest in Fresh and Fab Laundry and support a thriving business that delivers cleanliness, convenience, and female entrepreneurship in one dynamic package."}
                    </p>
                </div>
                <div className="flex flex-col">
                    <Image
                        src={props.image || "/images/1.jpeg"}
                        alt="Picture of business deal"
                        width={300}
                        height={300}
                        className="p-[10px]"
                    />
                    <TableContainer>
                        <Table size="sm" variant="striped" colorScheme="#48BB78">
                            <Tbody>
                                <Tr>
                                    <Td>Loan Amount:</Td>
                                    <Td>{props.principal > 100000 ? 10000 : props.principal}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Loan Period:</Td>
                                    <Td>{props.lengthDays} days</Td>
                                </Tr>
                                <Tr>
                                    <Td>Interest Rate:</Td>
                                    <Td>{props.interest}%</Td>
                                </Tr>
                                <Tr>
                                    <Td>Payment in:</Td>
                                    <Td>USDC</Td>
                                </Tr>
                                <Tr>
                                    <Td>Views:</Td>
                                    <Td>1k</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <ProgressComponent start={props.fundDay} duration={props.lengthDays} end={props.repayDay} />
            <div className="flex flex-row justify-start items-center self-start space-x-4">
                <button
                    onClick={() => setFundLoanTransactionModalOpen(true)}
                    className="self-start h-[45px] w-fit items-center justify-center rounded-[15px]  px-[20px] py-[10px] text-[14px] font-semibold leading-[] cursor-pointer bg-green text-white"
                >
                    Fund Loan
                </button>
                <button
                    onClick={() => setRepayLoanTransactionModalOpen(true)}
                    className="self-start h-[45px] w-fit items-center justify-center rounded-[15px]  px-[20px] py-[10px] text-[14px] font-semibold leading-[] cursor-pointer bg-green text-white"
                >
                    Repay Loan
                </button>
            </div>

            <TransactionModal
                isOpen={fundLoanTransactionModalOpen}
                title="Fund loan"
                sendTransactionResponse={fundLoanResponse}
                closeCallback={() => setFundLoanTransactionModalOpen(false)}
            />

            <TransactionModal
                isOpen={repayLoanTransactionModalOpen}
                title="Repay loan"
                sendTransactionResponse={repayLoanResponse}
                closeCallback={() => setRepayLoanTransactionModalOpen(false)}
            />
        </div>
    );
}

function Badge({ status }: { status: string }) {
    return (
        <div className="flex flex-row h-[40px] mb-[10px] font-bold rounded-[8px] w-[200px] justify-center items-center p-2 bg-[#E2E8F0]">
            Status: {status}
        </div>
    );
}

function ProgressComponent({ start, duration, end }: { start: number; duration: number; end: number }) {
    return (
        <div className="pt-[40px] flex flex-col w-full h-fit">
            <Progress value={64} colorScheme="green" />
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p>Created</p>
                    <p>04/15/2023</p>
                </div>
                <div className="flex flex-col">
                    <p>Funded</p>
                    <p>04/16/2023</p>
                </div>
                <div className="flex flex-col">
                    <p>Expiry</p>
                    <p>10/12/2023</p>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    // const res = await fetch(`https://.../data`);
    const { proposalId } = context.query;
    let loan = undefined;
    if (proposalId >= 0) {
        loan = await getLoanFromSubgraph(parseInt(proposalId));
    }

    let loanOrSeed = loan ?? exploreProposals[(-1 * parseInt(proposalId) - 1) % exploreProposals.length];
    // let loanOrSeed = exploreProposals[parseInt(proposalId) - 1];

    return {
        props: loanOrSeed,
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
