import { useRef } from "react";
import { useAccount, useBalance } from "wagmi";
import Spline from "@splinetool/react-spline";
import ProposalCard from "@/components/ProposalCard";
import { exploreProposals } from "@/common/mock";
import { Loan } from "@/common/types";
import Link from "next/link";
import Image from "next/image";

interface IProposals {
    proposals: Loan[];
}

export default function Home(props: IProposals) {
    const { address } = useAccount();

    return (
        <div className="flex flex-grow flex-col bg-[url('/images/background.svg')] bg-cover">
            {/* <div className="flex flex-col items-center justify-center px-[20px] py-[80px] text-center bg-[url('/images/background.svg')]"> */}
            <div className="flex flex-col items-center justify-center px-[20px] py-[80px] text-center">
                <p className="text-[65px] font-semibold leading-[80px] w-full md:max-w-[600px]">
                    Funding for
                    <br />
                    projects that matter
                </p>
                <p className="p1 mt-[16px] w-full sm:max-w-[650px] leading-[30px]">
                    A decentralized P2P, microfinance lending protocol
                    <br />
                    that empowers borrowing efficiency in capital-constrained markets.
                </p>
                <div className="mt-[48px] flex flex-col items-center space-y-[26px]">
                    <Link
                        href="/proposal/create"
                        className="h-fit w-fit items-center justify-center rounded-[50px] px-[130px] py-[18px] text-[20px] font-[700] leading-[] cursor-pointer bg-gradient-to-r from-[#48BB78] to-[#1D6EB9] transition duration-1000 hover:to-[#48BB78] ease-in-out delay-200 text-white"
                    >
                        Create
                    </Link>
                    <Link
                        href="/explore"
                        className="h-fit w-fit items-center justify-center border-[5px] border-[#48BB78] hover:bg-[#48BB78] hover:text-white text-[#48BB78] rounded-[50px] px-[120px] py-[13px] text-[20px] font-[700] leading-[] cursor-pointer"
                    >
                        Explore
                    </Link>
                </div>
            </div>
            <div className="flex flex-row mx-auto justify-center space-x-[100px] items-start">
                <div className="grid grid-cols-1 w-full h-fit gap-8 justify-items-center max-w-[500px]">
                    <p className="text-[20px] font-bold text-center mb-4">Top Projects</p>
                    {props.proposals.map((element, id) => {
                        if (id > 2) {
                            return;
                        }
                        return <ProposalCard key={id} proposal={element} />;
                    })}
                </div>
                <div className="flex flex-col justifty-center items-center max-w-[500px] gap-8">
                    <p className="text-[20px] font-bold text-center mb-4">Entrepreneur Highlight</p>
                    <video autoPlay loop muted className="rounded-[15px] overflow-hidden w-[300px]">
                        <source src="/images/video.mp4" className="rounded-[15px] overflow-hidden" />
                    </video>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mx-auto space-x-8 mt-32 mb-16">
                <p className="text-[45px] font-bold text-center mb-4">How it works</p>
                <div className="flex flex-row justify-center items-start mx-auto space-x-32">
                    <div className="flex flex-col justify-center items-center">
                        <Image src="/images/how/howitworks1.jpeg" width={100} height={100} alt="how it works" />
                        <p className="text-[20px] font-semibold mb-2">Solve</p>
                        <p className="w-[250px] text-center">
                            Discover passionate entrepreneurs capital-constrained markets and vet their business
                            proposals.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Image src="/images/how/howitworks2.jpeg" width={100} height={100} alt="how it works" />
                        <p className="text-[20px] font-semibold mb-2">Fund</p>
                        <p className="w-[250px] text-center">
                            Fund a microloan onchain - the contract manages the principal, intereset, and loan repayment
                            for you.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Image src="/images/how/howitworks3.jpeg" width={100} height={100} alt="how it works" />
                        <p className="text-[20px] font-semibold mb-2">Fulfill</p>
                        <p className="w-[250px] text-center">
                            Our micropreneurs repay their loans through the protocol. Successful lenders accrue protocol
                            points.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Image src="/images/how/howitworks4.jpeg" width={100} height={100} alt="how it works" />
                        <p className="text-[20px] font-semibold mb-2">Regenerate</p>
                        <p className="w-[250px] text-center">
                            Interest is divided between our insurance and social impact funds that you govern via our
                            protocol points (coming soon).
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mx-auto space-y-4 my-16">
                <p className="text-[45px] font-bold text-center mb-4">Trusted by</p>
                <div className="flex flex-row justify-center space-x-[200px] items-center">
                    <Image src="/images/proof/logo.png" width={100} height={100} alt="social proof" />
                    <Image src="/images/proof/logo2.png" width={100} height={100} alt="social proof" />
                    <Image src="/images/proof/logo3.png" width={100} height={100} alt="social proof" />
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    return {
        props: { proposals: exploreProposals },
    };
}
