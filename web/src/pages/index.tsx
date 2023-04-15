import { useAccount, useBalance, useChainId } from "wagmi";

export default function Home() {
    const { address } = useAccount();
    const { data } = useBalance({ address: address });
    // const { chain } = useChainId();

    return (
        <>
            MAIN APP - {address} - {data?.formatted}
        </>
    );
}
