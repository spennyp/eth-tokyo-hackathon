import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient, useIsMounted } from "connectkit";
import { mainnet, polygon, optimism, arbitrum, localhost } from "wagmi/chains";
import "../globals.css";

import MainLayout from "@/layouts/MainLayout";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const chains = [mainnet, polygon, optimism, arbitrum, localhost];

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
                <ConnectKitProvider>
                    <MainLayout>
                        <Component {...pageProps} />
                    </MainLayout>
                </ConnectKitProvider>
            </ChakraProvider>
        </WagmiConfig>
    );
}
