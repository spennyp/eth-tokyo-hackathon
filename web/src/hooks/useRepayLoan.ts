import { useMemo } from "react";
import { BigNumber, Contract } from "ethers";
import { useAccount } from "wagmi";

import PeerToPeerLoansAbi from "../../abis/PeerToPeerLoans.json";
import { PEER_TO_PEER_LOAN_ADDRESS } from "../common/constants";
import useSendTransaction, { SendTransactionResponse } from "./useSendTransaction";

interface UseRepayLoanConfig {
    loanId?: BigNumber;
}

export default function useRepayLoan({ loanId }: UseRepayLoanConfig): SendTransactionResponse {
    const { address } = useAccount();

    const [transactionRequest, enableEagerFetch] = useMemo(() => {
        const contract = new Contract(PEER_TO_PEER_LOAN_ADDRESS, PeerToPeerLoansAbi);
        return [
            {
                to: contract.address,
                from: address,
                data: contract.interface.encodeFunctionData("repayLoan", [loanId]),
            },
            loanId != undefined,
        ];
    }, [address, loanId]);

    const response = useSendTransaction({
        transactionRequest,
        enableEagerFetch,
    });

    return response;
}
