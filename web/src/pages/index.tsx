import { useAccount, useBalance, useChainId } from "wagmi";

export default function Home() {
    const { address } = useAccount();
    const { data } = useBalance(address);
    // const { chain } = useChainId();

    console.log(data);
    return (
        <>
            MAIN APP - {address} - {data?.formatted}
        </>
    );
}
