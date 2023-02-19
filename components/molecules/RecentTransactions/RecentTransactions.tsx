import Container from "../Container/Container";
import Grid from "../Grid/Grid";
import styles from "./RecentTransactions.module.scss";

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// const httpLink = createHttpLink({
//   uri: "https://api.shearscan.com/graphql/",
// });

// const authLink = new ApolloLink((operation, forward) => {
//   const token = localStorage.getItem('auth_token');

//   operation.setContext({
//     headers: {
//       authorization: token ? `Bearer ${token}` : ''
//     }
//   });

//   return forward(operation);
// });

// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       authorization: "",
//       // authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

export interface Props {
  TableHeader: string[];
  Data: {
    HASH: string;
    BLOCK: number;
    AGE: number;
    TYPE: string;
    FROM: string;
    TO: string;
    NAME: string;
    VALUES: number;
    TIMESTAMP: string;
  }[];
  // testData: object;
}

// const client = new ApolloClient({
//   uri: "https://api.shearscan.com/graphql/",
//   cache: new InMemoryCache(),
//   credentials: 'include'
// });

const RecentTransactions = () => {
  const TableData = {
    TableHeader: [
      "HASH",
      "BLOCK",
      "AGE",
      "TYPE",
      "FROM",
      "TO",
      "NAME",
      "VALUE",
      "TIMESTAMP",
    ],
    Data: [
      {
        HASH: "2316cgf6a",
        BLOCK: 1981,
        AGE: 2,
        TYPE: "Transaction",
        FROM: "23b45",
        TO: "77ab3...6",
        NAME: "SHE",
        VALUE: 356,
        TIMESTAMP: "WED 6 AUG 2022 23:38 pm",
      },
    ],
  };

  // const testData = client.query({
  //   query: gql`
  //     query {
  //       getExtrinsics(filters: {}, pageSize: 100) {
  //         objects {
  //           blockNumber
  //           extrinsicIdx
  //           hash
  //           callModule
  //           callName
  //           signed
  //           blockHash
  //           blockDatetime
  //           multiAddressAccountId
  //           callArguments
  //         }
  //         pageInfo {
  //           pageSize
  //           pageNext
  //           pagePrev
  //         }
  //       }
  //     }
  //   `,
  // });

  // console.log("#############", testData);

  return (
    <section className={styles.RecentTransactions}>
      <Container>
        <Grid>
          <p className={styles.title}>Recent transactions</p>
          <div className={styles.content}>
            <div className={styles.RecentTransactionsHeader}>
              {TableData.TableHeader.map((colText) => (
                <div key={TableData.TableHeader.indexOf(colText)}>
                  {colText}
                </div>
              ))}
            </div>
            <div className={styles.RecentTransactionsBody}>
              {TableData.Data.length == 1 ? (
                <div className={styles.NoTransactionBody}>
                  No transaction yet
                </div>
              ) : (
                TableData.Data.map((element) => (
                  <div
                    className={styles.RecentTransaction}
                    key={TableData.Data.indexOf(element)}
                  >
                    <div className={styles.Hash}>{element.HASH}</div>
                    <div className={styles.Block}>{element.BLOCK}</div>
                    <div className={styles.Age}>{element.AGE}</div>
                    <div className={styles.Type}>{element.TYPE}</div>
                    <div className={styles.From}>{element.FROM}</div>
                    <div className={styles.To}>{element.TO}</div>
                    <div className={styles.Name}>{element.NAME}</div>
                    <div className={styles.Value}>{element.VALUE}</div>
                    <div className={styles.Timestamp}>{element.TIMESTAMP}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Grid>
      </Container>
    </section>
  );
};

export default RecentTransactions;
