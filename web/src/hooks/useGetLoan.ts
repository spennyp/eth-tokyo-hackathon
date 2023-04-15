import { Address, useAccount, useContractRead } from "wagmi";
import { BigNumber, Contract } from "ethers";

import PeerToPeerLoansAbi from "../../abis/PeerToPeerLoans.json";
import { PEER_TO_PEER_LOAN_ADDRESS } from "../common/constants";
import { useMemo } from "react";

interface UseGetLoanConfig {
    loanId?: BigNumber;
}

export interface Loan {
    borrower: Address;
    token: Address;
    principal: BigNumber;
    interest: BigNumber;
    lengthDays: BigNumber;
    lender: Address;
    fundDay: BigNumber;
    repaid: boolean;
    refetch: () => void;
}

export default function useGetLoan({ loanId }: UseGetLoanConfig): Loan | undefined {
    const { data, refetch } = useContractRead({
        address: PEER_TO_PEER_LOAN_ADDRESS,
        abi: PeerToPeerLoansAbi,
        functionName: "getLoan",
        args: [loanId],
        enabled: loanId != undefined,
    });

    const loan: Loan | undefined = useMemo(() => {
        if (!data || loanId == undefined || !Array.isArray(data) || !refetch) {
            return undefined;
        }

        return {
            borrower: data[0],
            token: data[1],
            principal: data[2],
            interest: data[3],
            lengthDays: data[4],
            lender: data[5],
            fundDay: data[6],
            repaid: data[7],
            refetch: refetch,
        } as Loan;
    }, [data, refetch, loanId]);

    return loan;
}
