import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient, useIsMounted } from "connectkit";
import { polygon, localhost, gnosis, scrollTestnet } from "wagmi/chains";
import "../globals.css";

export const linea = {
    id: 59140,
    name: "Linea",
    network: "Linea",
    nativeCurrency: {
        decimals: 18,
        name: "LineaETH",
        symbol: "LineaETH",
    },
    rpcUrls: {
        public: { http: ["https://rpc.goerli.linea.build"] },
        default: { http: ["https://rpc.goerli.linea.build"] },
    },
    blockExplorers: {
        default: { name: "Linea", url: "https://explorer.goerli.linea.build/" },
    },
} as const;

import MainLayout from "@/layouts/MainLayout";
import Chain from "connectkit/build/components/Common/Chain";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const chains = [polygon, localhost, gnosis, scrollTestnet, linea];

const client = createClient(
    getDefaultClient({
        appName: "Your App Name",
        alchemyId,
        chains,
    })
);

export default function App({ Component, pageProps }: AppProps) {
    const mounted = useIsMounted();

    // Return null if not mounted to avoid wagmi issues with SSR and auto-connect
    if (!mounted) {
        return null;
    }

    return (
        <WagmiConfig client={client}>
            <ChakraProvider>
                <ConnectKitProvider options={{ initialChainId: 0 }}>
                    <MainLayout>
                        <Component {...pageProps} />
                    </MainLayout>
                </ConnectKitProvider>
            </ChakraProvider>
        </WagmiConfig>
    );
}
