import { Flex, Text, Stack, Box } from "@chakra-ui/layout";
import { ConnectKitButton } from "connectkit";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export interface MainLayoutProps {
    children: ReactNode;
}

function Header() {
    const headerTextButtonStyle =
        "cursor-pointer hidden md:block text-[14px] font-semibold pt-1 text-linkDisabled underline-offset-4 hover:underline";
    const activeHeaderTextButtonStyle =
        "cursor-pointer hidden md:block text-[14px] font-semibold pt-1 underline-offset-4 text-primary underline";
    const router = useRouter();
    const [path, setPath] = useState("");

    // determines which path or sub element we are focused on
    useEffect(() => {
        const pathParts = router.asPath.split("#");
        if (pathParts.length >= 2) {
            const hash = pathParts.slice(-1)[0];
            setPath(hash);
        } else {
            setPath(router.asPath);
        }
    }, [router.asPath]);

    return (
        <div className="w-full flex flex-row justify-between items-center p-4 bg-secondaryBg fixed top-0">
            <div className="flex flex-row space-x-8">
                <Text>LOGO</Text>
                <div className="flex flex-row justify-start items-center space-x-8">
                    {/* <Link href="/">
                        <p className={path === "/" ? activeHeaderTextButtonStyle : headerTextButtonStyle}>Home</p>
                    </Link> */}
                    <Link href="/proposal/create">
                        <p
                            className={
                                path === "/proposal/create" ? activeHeaderTextButtonStyle : headerTextButtonStyle
                            }
                        >
                            Create a Proposal
                        </p>
                    </Link>
                    <Link href="/explore">
                        <p className={path === "/explore" ? activeHeaderTextButtonStyle : headerTextButtonStyle}>
                            Explore
                        </p>
                    </Link>
                    <Link href="/proposal">
                        <p className={path === "/proposal" ? activeHeaderTextButtonStyle : headerTextButtonStyle}>
                            My Proposals
                        </p>
                    </Link>
                </div>
            </div>
            <div>
                <ConnectKitButton showBalance={true} />
            </div>
        </div>
    );
}

function Footer() {
    return (
        <Flex as="footer" width="100%" justifyContent="space-between" className="bg-secondaryBg" p={4}>
            FOOTER
        </Flex>
    );
}

function Body({ children }: MainLayoutProps) {
    return (
        <Flex height="1000px" p={4} className="bg-white mt-[130px]">
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
