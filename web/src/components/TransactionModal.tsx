import { SendTransactionResponse } from "@/hooks/useSendTransaction";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Spinner,
    Flex,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useModal } from "connectkit";
import { useCallback, useMemo } from "react";
import { useAccount, useNetwork } from "wagmi";
import { openLink } from "@/common/utils";

interface TransactionModalProps {
    isOpen: boolean;
    title: string;
    sendTransactionResponse?: SendTransactionResponse;
    completeText?: string;
    closeCallback: () => void;
    completeCallback?: () => void;
}

export default function TransactionModal({
    isOpen,
    title,
    sendTransactionResponse,
    completeText,
    closeCallback,
    completeCallback,
}: TransactionModalProps) {
    const { address } = useAccount();
    const { setOpen: setConnectKitModalOpen } = useModal();

    const { chain } = useNetwork();

    const explorerLink = chain?.blockExplorers?.default.url + "/tx/" + sendTransactionResponse?.hash;

    console.log(sendTransactionResponse);

    const close = useCallback(() => {
        sendTransactionResponse?.reset();
        closeCallback();
    }, [closeCallback, sendTransactionResponse]);

    const complete = useCallback(() => {
        sendTransactionResponse?.reset();
        completeCallback ? completeCallback() : closeCallback();
    }, [sendTransactionResponse, completeCallback, closeCallback]);

    // Hacky...
    const [buttonText, message, buttonCallback, icon] = useMemo(() => {
        if (!address) {
            return [
                "Connect wallet",
                "Connect your wallet to perform the transaction",
                () => setConnectKitModalOpen(true),
                undefined,
            ];
        } else if (sendTransactionResponse?.pendingWalletSignature) {
            return [
                "Check wallet app",
                "Confirm transaction in your wallet",
                undefined,
                <Spinner size="xl" speed="0.8s" key={1} />,
            ];
        } else if (sendTransactionResponse?.hash == undefined) {
            return [
                "Send Transaction",
                `Submit transaction to ${title.toLowerCase()}`,
                () => sendTransactionResponse?.send && sendTransactionResponse?.send(),
                undefined,
            ];
        } else if (sendTransactionResponse?.hash && sendTransactionResponse?.receipt == undefined) {
            return ["Transaction submitted", "Please wait...", undefined, <Spinner size="xl" speed="0.8s" key={1} />];
        } else {
            return [
                completeText ?? "Close",
                "Transaction successful!",
                complete,
                <CheckIcon boxSize={10} color="green" key={1} />,
            ];
        }
    }, [address, sendTransactionResponse, title, complete, setConnectKitModalOpen]);

    return (
        <Modal isOpen={isOpen} onClose={() => console.log("CLOSE")}>
            <ModalOverlay />
            <ModalContent width="400px" height="400px" top="15%">
                <ModalHeader textAlign="center">{title}</ModalHeader>
                <ModalCloseButton onClick={close} />
                <ModalBody>
                    <Flex
                        direction="column"
                        textAlign="center"
                        alignItems="center"
                        gap={4}
                        justifyContent="center"
                        height="100%"
                    >
                        {icon}
                        {message}
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Flex direction="column" width="100%" gap={2}>
                        {sendTransactionResponse?.hash && (
                            <Button
                                colorScheme="green"
                                onClick={() => openLink(explorerLink, true)}
                                width="100%"
                                variant="outline"
                            >
                                View on explorer
                            </Button>
                        )}
                        <Button
                            colorScheme="green"
                            onClick={() => buttonCallback && buttonCallback()}
                            width="100%"
                            isDisabled={buttonCallback == undefined}
                        >
                            {buttonText}
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
