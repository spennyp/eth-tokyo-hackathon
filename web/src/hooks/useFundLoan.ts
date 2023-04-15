import { useMemo } from "react";
import { BigNumber, Contract } from "ethers";
import { Address, useAccount } from "wagmi";

import PeerToPeerLoansAbi from "../../abis/PeerToPeerLoans.json";
import { PEER_TO_PEER_LOAN_ADDRESS } from "../common/constants";
import useSendTransaction, { SendTransactionResponse } from "./useSendTransaction";

interface UseFundLoanConfig {
    loanId?: BigNumber;
}

export default function useFundLoan({ loanId }: UseFundLoanConfig): SendTransactionResponse {
    const { address } = useAccount();

    const [transactionRequest, enableEagerFetch] = useMemo(() => {
        const contract = new Contract(PEER_TO_PEER_LOAN_ADDRESS, PeerToPeerLoansAbi);

        console.log("DEBUG: ", contract.address, address, loanId);
        return [
            {
                to: contract.address,
                from: address,
                data: contract.interface.encodeFunctionData("fundLoan", [loanId]),
                gasLimit: BigNumber.from("500000"),
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
