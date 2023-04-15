import { useAccount, useBalance } from "wagmi";

export default function Home() {
    const { address } = useAccount();

    return (
        <div className="flex flex-grow flex-col">
            <HeroSection />
        </div>
    );
}

function HeroSection() {
    return (
        <div className="flex flex-col items-center justify-center px-[20px] py-[80px] text-center">
            <h1 className="w-full md:max-w-[600px]">Micro Finance Lending</h1>
            <p className="p1 mt-[16px] w-full sm:max-w-[450px]">
                A peer to peer, microfinance lending protocol that supercharges borrowing efficiency in
                capital-constrained markets
            </p>
            <div className="mt-[48px] flex flex-row items-center space-x-[36px]">
                <button className="h-[40px] w-fit items-center justify-center rounded-[6px]  px-[20px] py-[10px] text-[14px] font-semibold leading-[] cursor-pointer bg-black text-white">
                    Launch App
                </button>
                <a href="#features" className="font-semibold text-primary hover:underline">
                    Features
                </a>
            </div>
        </div>
    );
}
