import { useAccount, useBalance } from "wagmi";

export default function Home() {
    const { address } = useAccount();
    const { data } = useBalance(address);

    console.log(data);
    return (
        <>
            Landing Page MAIN APP - {address} - {data?.formatted}
        </>
    );
}
