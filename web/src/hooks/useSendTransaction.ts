import { TransactionRequest, TransactionReceipt } from "@ethersproject/providers";
import { useCallback, useState } from "react";
import { usePrepareSendTransaction, useSendTransaction as useSendTransactionWagmi } from "wagmi";

interface SendTransactionConfig {
    transactionRequest?: TransactionRequest & { to: string };
    enableEagerFetch: boolean;
}

export interface SendTransactionResponse {
    pendingWalletSignature?: boolean;
    hash?: string;
    receipt?: TransactionReceipt;
    send?: () => void;
    reset: () => void;
}

export default function useSendTransaction({
    transactionRequest,
    enableEagerFetch,
}: SendTransactionConfig): SendTransactionResponse {
    const [receipt, setReceipt] = useState<TransactionReceipt | undefined>(undefined);

    usePrepareSendTransaction;
    const { config: prepareConfig } = usePrepareSendTransaction({
        request: transactionRequest,
        enabled: enableEagerFetch,
    });

    const { data, isLoading, sendTransactionAsync, reset: txReset } = useSendTransactionWagmi(prepareConfig);

    const send = useCallback(async () => {
        setReceipt(undefined);
        console.log("SEND");
        if (sendTransactionAsync) {
            try {
                const txResponse = await sendTransactionAsync();
                const txReceipt = await txResponse.wait();
                setReceipt(txReceipt);
            } catch (error) {
                console.log("ERROR, LIKELY USER REJECT", error);
                txReset();
            }
        }
    }, [sendTransactionAsync, txReset]);

    const reset = useCallback(() => {
        setReceipt(undefined);
        txReset();
    }, [setReceipt, txReset]);

    return { pendingWalletSignature: isLoading, hash: data?.hash, receipt, send, reset };
}
