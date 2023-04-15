import { useRef } from "react";
import { useAccount, useBalance } from "wagmi";
import Spline from "@splinetool/react-spline";

export default function Home() {
    const { address } = useAccount();

    return (
        <div className="flex flex-grow flex-col">
            {/* <Spline scene="https://my.spline.design/molang3dcopy-71de584d6114952a214b47bfd65cd712/" onLoad={onLoad} /> */}
            <HeroSection />
        </div>
    );
}

function HeroSection() {
    return (
        <div className="flex flex-col items-center justify-center px-[20px] py-[80px] text-center bg-[url('/images/background.svg')]">
            <p className="text-[65px] font-semibold w-full md:max-w-[600px]">Funding for projects you care about</p>
            <p className="p1 mt-[16px] w-full sm:max-w-[450px]">
                A peer to peer, microfinance lending protocol that supercharges borrowing efficiency in
                capital-constrained markets.
            </p>
            <div className="mt-[48px] flex flex-col items-center space-y-[26px]">
                <button className="h-fit w-fit items-center justify-center rounded-[50px] px-[130px] py-[18px] text-[20px] font-[700] leading-[] cursor-pointer bg-gradient-to-r from-[#48BB78] to-[#1D6EB9] transition duration-1000 hover:to-[#48BB78] ease-in-out delay-200 text-white">
                    Create
                </button>
                <button className="h-fit w-fit items-center justify-center border-[5px] border-[#48BB78] hover:bg-[#48BB78] hover:text-white text-[#48BB78] rounded-[50px] px-[120px] py-[13px] text-[20px] font-[700] leading-[] cursor-pointer">
                    Explore
                </button>
            </div>
        </div>
    );
}
