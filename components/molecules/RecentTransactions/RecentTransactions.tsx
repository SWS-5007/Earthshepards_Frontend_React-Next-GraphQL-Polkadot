import Container from "../Container/Container";
import Grid from "../Grid/Grid";
import styles from "./RecentTransactions.module.scss";
import { useState, useEffect } from "react";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

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
      // const callArguments = eval(
      //   "(" + res.data.getExtrinsics.objects[0].callArguments + ")"
      // );
    });
  }, [allTransactionQuery]);

  console.log("RecentTransactions", allTransaction);

  return (
    <section className={styles.RecentTransactions}>
      <Container>
        <Grid>
          <p className={styles.title}>Recent transactions</p>
          <div className={styles.content}>
            <div className={styles.RecentTransactionsHeader}>
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
                    <div className={styles.Hash}>{element.hash.slice(55)}</div>
                    <div className={styles.Block}>
                      {element.blockHash.slice(55)}
                    </div>
                    <div className={styles.Age}>{element.blockNumber}</div>
                    <div className={styles.From}>
                      {eval("(" + element.callArguments + ")")[0].value.slice(
                        55
                      )}
                    </div>
                    <div className={styles.From}>
                      {eval("(" + element.callArguments + ")")[0].value.slice(
                        55
                      )}
                    </div>
                    <div className={styles.Name}>SHE</div>
                    <div className={styles.Value}>
                      {eval("(" + element.callArguments + ")")[1].value &&
                        eval("(" + element.callArguments + ")")[1].value / 1e12}
                    </div>
                    <div className={styles.Timestamp}>
                      {element.blockDatetime}
                    </div>
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
