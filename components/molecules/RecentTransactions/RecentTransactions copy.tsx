import Container from "../Container/Container";
import Grid from "../Grid/Grid";
import styles from "./RecentTransactions.module.scss";
import { useState, useEffect } from "react";

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

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

const client = new ApolloClient({
  uri: "https://api.shearscan.com/graphql/",
  cache: new InMemoryCache(),
  // credentials: 'include'
});

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
}

const RecentTransactions = () => {
  const [allTransaction, setAllTransactionDatas] = useState<any>([]);

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
        FROM: "23b45",
        TO: "77ab3...6",
        NAME: "SHE",
        VALUE: 356,
        TIMESTAMP: "WED 6 AUG 2022 23:38 pm",
      },
    ],
  };

  const allTransactionQuery = client.query({
    query: gql`
      query {
        getExtrinsics(
          filters: {
            callModule: "Balances"
            or: [
              { callName: "transfer" }
              { callName: "transfer_keep_alive" }
              { callName: "transfer_all" }
            ]
          }
          pageSize: 10
        ) {
          objects {
            blockNumber
            extrinsicIdx
            hash
            callModule
            callName
            signed
            blockHash
            blockDatetime
            multiAddressAccountId
            callArguments
          }
          pageInfo {
            pageSize
            pageNext
            pagePrev
          }
        }
      }
    `,
  });

  useEffect(() => {
    allTransactionQuery.then((res) => {
      setAllTransactionDatas(res.data.getExtrinsics.objects);
      const callArguments = eval(
        "(" + res.data.getExtrinsics.objects[0].callArguments + ")"
      );
      console.log("!!!!!!!!!!!", callArguments);
    });
  }, [allTransactionQuery]);

  console.log("$$$$$$$", allTransaction);
  return (
    <section>
      <Container>
        <Grid>
          <p className={styles.title}>Recent transactions</p>
          {/* <div className={styles.content}> */}
          <table className={styles.transactionTable}>
            <thead>
              <tr>
                <td>HASH</td>
                <td>BLOCK</td>
                <td>AGE</td>
                <td>FROM</td>
                <td>TO</td>
                <td>NAME</td>
                <td>VALUE</td>
                <td>TIMESTAMP</td>
              </tr>
            </thead>
            <tbody>
              {allTransaction.length == 0 ? (
                <tr className={styles.NoTransactionBody}>
                  <td colSpan={8}>No transaction yet</td>
                </tr>
              ) : (
                allTransaction.map((element: any) => (
                  <tr key={allTransaction.indexOf(element)}>
                    <td>{element.hash}</td>
                    <td>{element.blockHash}</td>
                    <td>{element.blockNumber}</td>
                    <td>{eval("(" + element.callArguments + ")")[0].value}</td>
                    <td>{eval("(" + element.callArguments + ")")[0].value}</td>
                    <td>SHE</td>
                    <td>{eval("(" + element.callArguments + ")")[1].value}</td>
                    <td>{element.blockDatetime}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* <div className={styles.RecentTransactionsHeader}>
              <div>HASH</div>
              <div>BLOCK</div>
              <div>AGE</div>
              <div>FROM</div>
              <div>TO</div>
              <div>NAME</div>
              <div>VALUE</div>
              <div>TIMESTAMP</div>
            </div>

            <div className={styles.RecentTransactionsBody}>
              {allTransaction.length == 0 ? (
                <div className={styles.NoTransactionBody}>
                  No transaction yet
                </div>
              ) : (
                allTransaction.map((element: any) => (
                  <div
                    className={styles.RecentTransaction}
                    key={allTransaction.indexOf(element)}
                  >
                    <div className={styles.Hash}>{element.hash}</div>
                    <div className={styles.Block}>{element.blockHash}</div>
                    <div className={styles.Age}>{element.blockNumber}</div>
                    <div className={styles.From}>
                      {eval("(" + element.callArguments + ")")[0].value}
                    </div>
                    <div className={styles.From}>
                      {eval("(" + element.callArguments + ")")[0].value}
                    </div>
                    <div className={styles.Name}>SHE</div>
                    <div className={styles.Value}>
                      {eval("(" + element.callArguments + ")")[1].value}
                    </div>
                    <div className={styles.Timestamp}>
                      {element.blockDatetime}
                    </div>
                  </div>
                ))
              )}
            </div> */}

          {/* </div> */}
        </Grid>
      </Container>
    </section>
  );
};

export default RecentTransactions;
