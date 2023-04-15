import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GRAPH_API_URL } from "./constants";
import { Loan } from "./types";

const loansQueryById = `
    query loansQuery($id: Int) {
        loans(where: { id: $id }) {
            id
            borrower
            token
            principal
            interest
            lengthDays
            lender
            fundDay
            repayDay
            state
        }
    }
`;

const loansQueryAll = `
    query loansQuery {
        loans {
            id
            borrower
            token
            principal
            interest
            lengthDays
            lender
            fundDay
            repayDay
            state
        }
    }
`;

export async function getLoansFromSubgraph(): Promise<Loan[] | undefined> {
    const client = new ApolloClient({
        uri: GRAPH_API_URL,
        cache: new InMemoryCache(),
    });

    const res = await client.query({ query: gql(loansQueryAll) });
    let loans = res?.data?.loans as Loan[] | undefined;
    loans = loans?.map((loan) => {
        // Temp hack....
        return { ...loan, principal: loan.principal / 10 ** 6 };
    });

    return loans;
}

export async function getLoanFromSubgraph(loanId?: number): Promise<Loan | undefined> {
    const client = new ApolloClient({
        uri: GRAPH_API_URL,
        cache: new InMemoryCache(),
    });

    const res = await client.query({ query: gql(loansQueryById), variables: { id: loanId } });
    const loan = res?.data?.loans[0] as Loan | undefined;

    return loan;
}
