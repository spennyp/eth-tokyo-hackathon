import { Flex, Text, Stack, Box } from "@chakra-ui/layout";
import { ConnectKitButton } from "connectkit";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export interface MainLayoutProps {
    children: ReactNode;
}

function Header() {
    const headerTextButtonStyle =
        "cursor-pointer hidden md:block text-[18px] font-semibold pt-1 text-linkDisabled underline-offset-4 hover:underline";
    const activeHeaderTextButtonStyle =
        "cursor-pointer hidden md:block text-[18px] font-semibold pt-1 underline-offset-4 text-primary underline";
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
        <div className="w-full flex flex-row justify-between items-center p-4 bg-white fixed top-0 md:px-[112px]">
            <Link href="/" className="flex flex-row items-center justify-start space-x-2">
                <Image alt="splend logo" width={50} height={50} src="/icon.svg" />
                {/* <Text className="text-[24px] font-bold">Splend</Text> */}
                <p className="text-[30px] font-medium tracking-[1px]">Splend</p>
            </Link>
            <div className="flex flex-row justify-start items-center space-x-8">
                {/* <Link href="/">
                        <p className={path === "/" ? activeHeaderTextButtonStyle : headerTextButtonStyle}>Home</p>
                    </Link> */}
                <Link href="/proposal/create">
                    <p className={path === "/proposal/create" ? activeHeaderTextButtonStyle : headerTextButtonStyle}>
                        Create a Proposal
                    </p>
                </Link>
                <Link href="/explore">
                    <p className={path === "/explore" ? activeHeaderTextButtonStyle : headerTextButtonStyle}>Explore</p>
                </Link>
                <Link href="/proposal">
                    <p className={path === "/proposal" ? activeHeaderTextButtonStyle : headerTextButtonStyle}>
                        My Proposals
                    </p>
                </Link>
            </div>
            <div>
                <ConnectKitButton
                    customTheme={{
                        "--ck-overlay-background": "rgba(255, 0, 0, 0.5)",
                        "--ck-connectbutton-background": "rgba(72, 187, 120, 1)",
                    }}
                    showBalance={true}
                />
            </div>
        </div>
    );
}

function Footer() {
    const footerTextButtonStyle = "font-medium text-[#4B5563] underline-offset-4 hover:underline cursor-pointer";
    return (
        <footer className=" flex w-full flex-col px-[20px] pb-[30px] md:px-[112px] lg:pb-[80px]">
            <hr />
            <div className="my-[24px] mx-[14px] flex flex-col items-center justify-between space-y-[15px] lg:flex-row lg:space-y-0">
                <Link href="">
                    <div className="flex w-[130px] cursor-pointer flex-row items-center">
                        {/* <Image width={40} height={40} src={"/icon.svg"} className="mr-[8px]" alt="3vent logo icon" /> */}
                        <Image alt="splend logo" width={50} height={50} src="/icon.svg" />
                        <p className="text-[30px] font-medium tracking-[1px]">Splend</p>
                    </div>
                </Link>
                <div className="grid content-center justify-center gap-y-[10px] gap-x-[32px] text-center lg:grid-cols-5 lg:gap-y-0">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="mailto:contact@splend.xyz"
                        className={` ${footerTextButtonStyle}`}
                    >
                        Contact
                    </a>
                    <Link href="/tos">
                        <p className={`${footerTextButtonStyle}`}>Terms</p>
                    </Link>
                    <Link href="/privacy">
                        <p className={`${footerTextButtonStyle}`}>Privacy</p>
                    </Link>
                </div>
                <div className="flex w-[130px] flex-row justify-center lg:justify-end">
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        {/* <img src={"/assets/twitter.svg"} className="h-[27px] w-[27px]" alt="twitter logo icon" /> */}
                    </a>
                </div>
            </div>
            <p className="mx-auto text-[12px] font-medium text-secondary">© 2023 splend. All Rights Reserved.</p>
        </footer>
    );
}

function Body({ children }: MainLayoutProps) {
    return <div className="bg-[#FFFCF5] min-h-[1000px] p-4 pt-[130px]">{children}</div>;
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
