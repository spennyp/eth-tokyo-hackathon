import Link from "next/link";
import { Loan } from "../common/types";
import Image from "next/image";

interface IProps {
    proposal: Loan;
}

export default function ProposalCard({ proposal }: IProps) {
    return (
        <Link href={{ pathname: `/proposal/${proposal.id}` }}>
            <div className="border border-1 group flex max-w-[450px] py-[10px] w-full h-[120px] space-x-4 flex-row justify-start items-center hover:bg-white hover:cursor-pointer hover:border-green transition duration-150 rounded-md">
                <div className="w-[100px] h-[100px] p-[10px] flex">
                    <Image
                        src={proposal.image || "/images/1.jpeg"}
                        alt="Picture of business deal"
                        width={100}
                        height={80}
                        className="rounded-[10px] overflow-hidden"
                    />
                </div>
                <div className="flex flex-col h-full w-fit justify-start items-start space-y-0 pr-[20px]">
                    <p className="text-[18px] font-[500]">{proposal.title || "Laundry Service in Bangladesh"}</p>
                    <p className="max-w-[300px] truncate ... overflow-hidden">
                        {proposal.description || "Support me in my journey to create a laundry service in Bangladesh"}
                    </p>
                    <div className="flex grow" />
                    <div className="flex flex-row justify-between items-center w-full">
                        <p className="text-[12px]">{proposal.principal > 10000 ? 10000 : proposal.principal} USDC</p>
                        <p className="text-[12px] text-gray-400">1k views</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
