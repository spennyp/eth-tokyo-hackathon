import { TransactionRequest, TransactionReceipt } from "@ethersproject/providers";
import { useCallback, useState } from "react";
import { usePrepareSendTransaction, useSendTransaction as useSendTransactionWagmi } from "wagmi";

interface SendTransactionProps {
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
}: SendTransactionProps): SendTransactionResponse {
    const [receipt, setReceipt] = useState<TransactionReceipt | undefined>(undefined);

    usePrepareSendTransaction;
    const { config } = usePrepareSendTransaction({
        request: transactionRequest,
        enabled: enableEagerFetch,
    });

    const { data, isLoading, sendTransactionAsync, reset: txReset } = useSendTransactionWagmi(config);

    const send = useCallback(async () => {
        setReceipt(undefined);
        if (sendTransactionAsync) {
            const txResponse = await sendTransactionAsync();
            const txReceipt = await txResponse.wait();
            setReceipt(txReceipt);
        }
    }, [sendTransactionAsync]);

    const reset = useCallback(() => {
        setReceipt(undefined);
        txReset();
    }, [setReceipt, txReset]);

    return { pendingWalletSignature: isLoading, hash: data?.hash, receipt, send, reset };
}
