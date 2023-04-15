import { useMemo } from "react";
import { BigNumber, Contract } from "ethers";
import { Address, useAccount } from "wagmi";

import PeerToPeerLoansAbi from "../../abis/PeerToPeerLoans.json";
import { PEER_TO_PEER_LOAN_ADDRESS } from "../../common/constants";
import useSendTransaction, { SendTransactionResponse } from "./useSendTransaction";

interface UseCreateLoanProps {
    token?: Address;
    principal?: BigNumber;
    interest?: BigNumber;
    lengthDays?: BigNumber;
}

export default function useCreateLoan({
    token,
    principal,
    interest,
    lengthDays,
}: UseCreateLoanProps): SendTransactionResponse {
    const { address } = useAccount();

    const [transactionRequest, enableEagerFetch] = useMemo(() => {
        const contract = new Contract(PEER_TO_PEER_LOAN_ADDRESS, PeerToPeerLoansAbi);
        return [
            {
                to: contract.address,
                from: address,
                data: contract.interface.encodeFunctionData("createLoan", [token, principal, interest, lengthDays]),
            },
            token != undefined && principal != undefined && interest != undefined && lengthDays != undefined,
        ];
    }, [address, token, principal, interest, lengthDays]);

    const response = useSendTransaction({
        transactionRequest,
        enableEagerFetch,
    });

    return response;
}
