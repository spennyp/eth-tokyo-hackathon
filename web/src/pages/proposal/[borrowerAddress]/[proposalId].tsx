import { useRouter } from "next/router";

export default function Proposal() {
    const router = useRouter();
    const { borrowerAddress, proposalId } = router.query;

    return (
        <div>
            <p>{proposalId}</p>
            <p>{borrowerAddress}</p>
        </div>
    );
}
