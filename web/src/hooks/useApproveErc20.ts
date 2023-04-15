import { useMemo } from "react";
import { BigNumber, Contract } from "ethers";
import { Address, useAccount, useContract, useContractRead } from "wagmi";
import { MaxUint256 } from "@ethersproject/constants";

import Erc20Abi from "../../abis/Erc20.json";
import { PEER_TO_PEER_LOAN_ADDRESS } from "../../common/constants";
import useSendTransaction, { SendTransactionResponse } from "./useSendTransaction";

interface UseApproveErc20Props {
    token?: Address;
    minAmount?: BigNumber;
}

export default function useApproveErc20({
    token,
    minAmount,
}: UseApproveErc20Props): SendTransactionResponse & { requiresApproval: boolean } {
    const { address } = useAccount();

    const { data: allowance, refetch } = useContractRead({
        address: token,
        abi: Erc20Abi,
        functionName: "allowance",
        args: [address, PEER_TO_PEER_LOAN_ADDRESS],
        enabled: token != undefined && address != undefined,
    });

    const [transactionRequest, enableEagerFetch, requiresApproval] = useMemo(() => {
        let request = undefined;
        if (token) {
            const contract = new Contract(token, Erc20Abi);
            request = {
                to: contract.address,
                from: address,
                data: contract.interface.encodeFunctionData("approve", [PEER_TO_PEER_LOAN_ADDRESS, MaxUint256]),
            };
        }

        const requiresApproval = minAmount == undefined || !(allowance instanceof BigNumber) || allowance.lt(minAmount);

        return [request, token != undefined && address != undefined, requiresApproval];
    }, [address, token, allowance, minAmount]);

    const response = useSendTransaction({
        transactionRequest,
        enableEagerFetch,
    });

    return { ...response, requiresApproval };
}
