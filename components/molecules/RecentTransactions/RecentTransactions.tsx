import Container from '../Container/Container'
import Grid from '../Grid/Grid'
import styles from './RecentTransactions.module.scss'

export interface Props {
  TableHeader: string[]
  Data: {
    HASH: string
    BLOCK: number
    AGE: number
    TYPE: string
    FROM: string
    TO: string
    NAME: string
    VALUES: number
    TIMESTAMP: string
  }[]
}

const RecentTransactions = () => {
  const TableData = {
    TableHeader: ['HASH', 'BLOCK', 'AGE', 'TYPE', 'FROM', 'TO', 'NAME', 'Amount', 'TIMESTAMP'],
    Data: [
      {
        HASH: '2316cgf6a',
        BLOCK: 1981,
        AGE: 2,
        TYPE: 'Transaction',
        FROM: '23b45',
        TO: '77ab3...6',
        NAME: 'SHE',
        VALUE: 356,
        TIMESTAMP: 'WED 6 AUG 2022 23:38 pm',
      },
      {
        HASH: '2316cgf6a',
        BLOCK: 1981,
        AGE: 2,
        TYPE: 'Transaction',
        FROM: '23b45',
        TO: '77ab3...6',
        NAME: 'SHE',
        VALUE: 356,
        TIMESTAMP: 'WED 6 AUG 2022 23:38 pm',
      },
      {
        HASH: '2316cgf6a',
        BLOCK: 1981,
        AGE: 2,
        TYPE: 'Transaction',
        FROM: '23b45',
        TO: '77ab3...6',
        NAME: 'SHE',
        VALUE: 356,
        TIMESTAMP: 'WED 6 AUG 2022 23:38 pm',
      },
      {
        HASH: '2316cgf6a',
        BLOCK: 1981,
        AGE: 2,
        TYPE: 'Transaction',
        FROM: '23b45',
        TO: '77ab3...6',
        NAME: 'SHE',
        VALUE: 356,
        TIMESTAMP: 'WED 6 AUG 2022 23:38 pm',
      },
      {
        HASH: '2316cgf6a',
        BLOCK: 1981,
        AGE: 2,
        TYPE: 'Transaction',
        FROM: '23b45',
        TO: '77ab3...6',
        NAME: 'SHE',
        VALUE: 356,
        TIMESTAMP: 'WED 6 AUG 2022 23:38 pm',
      },
      {
        HASH: '2316cgf6a',
        BLOCK: 1981,
        AGE: 2,
        TYPE: 'Transaction',
        FROM: '23b45',
        TO: '77ab3...6',
        NAME: 'SHE',
        VALUE: 356,
        TIMESTAMP: 'WED 6 AUG 2022 23:38 pm',
      },
      {
        HASH: '2316cgf6a',
        BLOCK: 1981,
        AGE: 2,
        TYPE: 'Transaction',
        FROM: '23b45',
        TO: '77ab3...6',
        NAME: 'SHE',
        VALUE: 356,
        TIMESTAMP: 'WED 6 AUG 2022 23:38 pm',
      },
      {
        HASH: '2316cgf6a',
        BLOCK: 1981,
        AGE: 2,
        TYPE: 'Transaction',
        FROM: '23b45',
        TO: '77ab3...6',
        NAME: 'SHE',
        VALUE: 356,
        TIMESTAMP: 'WED 6 AUG 2022 23:38 pm',
      },
      {
        HASH: '2316cgf6a',
        BLOCK: 1981,
        AGE: 2,
        TYPE: 'Transaction',
        FROM: '23b45',
        TO: '77ab3...6',
        NAME: 'SHE',
        VALUE: 356,
        TIMESTAMP: 'WED 6 AUG 2022 23:38 pm',
      },
      {
        HASH: '2316cgf6a',
        BLOCK: 1981,
        AGE: 2,
        TYPE: 'Transaction',
        FROM: '23b45',
        TO: '77ab3...6',
        NAME: 'SHE',
        VALUE: 356,
        TIMESTAMP: 'WED 6 AUG 2022 23:38 pm',
      },
      {
        HASH: '2316cgf6a',
        BLOCK: 1981,
        AGE: 2,
        TYPE: 'Transaction',
        FROM: '23b45',
        TO: '77ab3...6',
        NAME: 'SHE',
        VALUE: 356,
        TIMESTAMP: 'WED 6 AUG 2022 23:38 pm',
      },
    ],
  }

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
              {TableData.Data.map((element) => (
                <div  className={styles.RecentTransaction} key={TableData.Data.indexOf(element)}>
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
              ))}
            </div>
          </div>
        </Grid>
      </Container>
    </section>
  )
}

export default RecentTransactions
