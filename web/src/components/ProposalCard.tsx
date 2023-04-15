import Link from "next/link";
import { Loan } from "../common/types";
import Image from "next/image";

interface IProps {
    proposal: Loan;
}

export default function ProposalCard({ proposal }: IProps) {
    return (
        <Link href={`/proposal/${proposal.borrower}/${proposal.id}`}>
            <div className="border border-1 group flex max-w-[450px] py-[10px] w-full h-[120px] space-x-4 flex-row justify-start items-center hover:bg-[#FFFCF5] hover:cursor-pointer hover:border-green transition duration-150 rounded-md">
                <div className="w-[100px] h-[100px] p-[10px] flex">
                    <Image
                        src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Picture of business deal"
                        width={100}
                        height={80}
                        className="rounded-[10px] overflow-hidden"
                    />
                </div>
                <div className="flex flex-col h-full w-fit justify-start items-start space-y-0 pr-[20px]">
                    <p className="text-[18px] font-[500]">Business Name</p>
                    <p className="max-w-[300px] truncate ... overflow-hidden">
                        Setting up energy asdfasdf asdfasdf aasdfasdf asdfasdf
                    </p>
                    <div className="flex grow" />
                    <div className="flex flex-row justify-between items-center w-full">
                        <p className="text-[12px]">{proposal.principal} USDC</p>
                        <p className="text-[12px] text-gray-400">1k views</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
