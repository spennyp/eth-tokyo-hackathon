import { useRouter } from "next/router";
import { Loan } from "../../../common/types";
import { proposal } from "../../../common/mock";
import { useState } from "react";
import { Progress } from "@chakra-ui/react";
import Image from "next/image";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { getLoanFromSubgraph } from "@/common/subgraphQuery";

export default function ProposalPage(props: Loan) {
    console.log(props);
    const router = useRouter();
    const { borrowerAddress, proposalId } = router.query;
    const [status, setStatus] = useState(0);

    return (
        <div className="flex w-[800px] mx-auto flex-col justify-start items-center space-y-4 px-[20px]">
            <div className="flex flex-row items-start w-full justify-between">
                <div className="flex flex-col max-w-[400px] w-full">
                    <p className="text-[40px] font-bold">{props.title}</p>
                    <Badge status={"Funded"} />
                    <p className="text-[15px] text-slate-400 mb-12">Created by: {props.borrower}</p>
                    <p className="">{props.description}</p>
                </div>
                <div className="flex flex-col">
                    <Image
                        src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
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
                                    <Td>{props.principal}</Td>
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
            <button className="self-start h-[45px] w-fit items-center justify-center rounded-[15px]  px-[20px] py-[10px] text-[14px] font-semibold leading-[] cursor-pointer bg-[#48BB78] text-white">
                Pay Loan
            </button>
            <button className="self-start h-[45px] w-fit items-center justify-center rounded-[15px]  px-[20px] py-[10px] text-[14px] font-semibold leading-[] cursor-pointer bg-[#48BB78] text-white">
                Fund Proposal
            </button>
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
                    <p>{start}</p>
                </div>
                <div className="flex flex-col">
                    <p>Funded</p>
                    <p>{duration}</p>
                </div>
                <div className="flex flex-col">
                    <p>Expiry</p>
                    <p>{end}</p>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    // const res = await fetch(`https://.../data`);
    const { proposalId } = context.query;
    const loan = await getLoanFromSubgraph(parseInt(proposalId));

    const loanOrSeed = loan ?? proposal;

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
