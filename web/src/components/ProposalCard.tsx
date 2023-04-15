import Link from "next/link";
import { ProposalType } from "../../common/types";
import Image from "next/image";

interface IProps {
    proposal: ProposalType;
}

export default function ProposalCard({ proposal }: IProps) {
    return (
        <Link href={`/proposal/${proposal.borrower}/${proposal.id}`}>
            <div className="border border-1 group flex max-w-[450px] py-[10px] w-full h-[120px] space-x-4 flex-row justify-start hover:bg-slate-400 hover:cursor-pointer transition duration-150 rounded-md">
                <Image
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Picture of business deal"
                    width={100}
                    height={80}
                    className="p-[10px]"
                />
                <div className="flex flex-col h-full w-fit justify-start items-start space-y-0">
                    <p className="text-[18px] font-bold">Business Name</p>
                    <p className="max-w-[300px] truncate ... overflow-hidden">
                        Setting up energy asdfasdf asdfasdf aasdfasdf asdfasdf
                    </p>
                    <div className="flex grow" />
                    <p className="text-[px]">
                        {proposal.principal} USDC,{" "}
                        <span className="text-gray-400 group-hover:text-white">1k views</span>
                    </p>
                </div>
            </div>
        </Link>
    );
}
