import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export namespace LoanState {
    export const UNFUNDED = "UNFUNDED";
    export const ACTIVE = "ACTIVE";
    export const REPAID = "REPAID";
}

export const PEER_TO_PEER_LOANS_CONTRACT_ADDRESS = Address.fromString("0x9AD99854cB4d757a5C684d3951ebCB9edbdA7906");

export const SEC_PER_DAY = BigInt.fromString("86400");

export const INTEREST_SCALER = BigDecimal.fromString("10000");
