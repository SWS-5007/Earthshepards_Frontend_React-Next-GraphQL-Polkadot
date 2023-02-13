import styles from './TransactionsTableHeads.module.scss'
import { useState } from 'react'

const TransactionsTableHeads = () => {
  const [enabledTransactions, setEnabledTransactions] = useState<boolean>(true)
  const [enabledPrice, setEnabledPrice] = useState<boolean>(false)


  const menuDisabling = () => {
    if (enabledTransactions === true) {
      setEnabledTransactions(false)
      setEnabledPrice(true)
    } else {
      setEnabledPrice(false)
      setEnabledTransactions(true)
    }
  }

  return (
    <div className={styles.transactionTableHeads}>
      <div className={styles.header}>
        <div className={`${styles.transactions} ${enabledTransactions ? styles.tableActive : ''}`} onClick={menuDisabling}>
          <h2>TRANSACTIONS</h2>
        </div>
        <div className={`${styles.priceChart} ${enabledPrice ? styles.tableActive : ''}`} onClick={menuDisabling}>
          <h2>PRICE CHART</h2>
        </div>
      </div>
      <div className={styles.table}></div>
    </div>
  )
}

export default TransactionsTableHeads
