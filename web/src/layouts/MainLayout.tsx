import { Flex, Text, Stack, Box } from "@chakra-ui/layout";
import { ConnectKitButton } from "connectkit";
import { ReactNode } from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export interface MainLayoutProps {
    children: ReactNode;
}

function Header() {
    return (
        <div className="w-full flex flex-row justify-between items-center p-4 bg-blue">
            <div className="flex flex-row space-x-8">
                <Text>LOGO</Text>
                <Stack spacing={4} direction="row" align="center">
                    <Link as={NextLink} href="/">
                        Home
                    </Link>
                    <Link as={NextLink} href="/explore">
                        Explore
                    </Link>
                    <Link as={NextLink} href="/proposal/create">
                        Create
                    </Link>
                </Stack>
            </div>
            <div>
                <ConnectKitButton showBalance={true} />
            </div>
        </div>
    );
}

function Footer() {
    return (
        <Flex as="footer" width="100%" justifyContent="space-between" backgroundColor="blue" p={4}>
            FOOTER
        </Flex>
    );
}

function Body({ children }: MainLayoutProps) {
    return (
        <Flex height="1000px" p={4} backgroundColor="green">
            {children}
        </Flex>
    );
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Header />
            <Body>{children}</Body>
            <Footer />
        </>
    );
}
