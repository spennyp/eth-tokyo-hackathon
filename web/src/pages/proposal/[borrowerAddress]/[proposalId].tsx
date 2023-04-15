import { useRouter } from "next/router";
import { ProposalType } from "../../../../common/types";
import { proposal } from "../../../../common/mock";

export default function ProposalPage(props: ProposalType) {
    const router = useRouter();
    const { borrowerAddress, proposalId } = router.query;

    return (
        <div>
            <p> gss prop{props.id}</p>
            <p> gss prop {props.borrower}</p>
            <p> router prop {borrowerAddress}</p>
            <p> router prop {proposalId}</p>
        </div>
    );
}

export async function getServerSideProps() {
    // const res = await fetch(`https://.../data`);

    return {
        props: proposal,
    };
}
