import styles from './TransactionsTable.module.scss'
import Image from 'next/image'
import TokenImage from '../../../public/logo.png'
import TransactionsTableHeads from '../../atoms/TransactionTableHeads/TransactionsTableHeads'

export interface Props {
  TableHeader: string[]
  Data: {
    IMAGE: string
    AMOUNT: string
    TO: string
    TIME: string
  }[]
}

const TransactionsTable = () => {
  const TransactionsTableData = {
    TableHeader: ['AMOUNT', 'SPACE1', 'TO', 'SPACE2', 'SPACE3', 'SPACE4', 'SPACE5', 'TIME'],
    Data: [
      {
        AMOUNT: '- 345.34 SHE',
        TO: '345walletaddressLOREM45whd',
        TIME: '2022/09/26   19:07',
      },
      {
        AMOUNT: '- 345.34 SHE',
        TO: '345walletaddressLOREM45whd',
        TIME: '2022/09/26   19:07',
      },
      {
        AMOUNT: '- 345.34 SHE',
        TO: '345walletaddressLOREM45whd',
        TIME: '2022/09/26   19:07',
      },
      {
        AMOUNT: '- 345.34 SHE',
        TO: '345walletaddressLOREM45whd',
        TIME: '2022/09/26   19:07',
      },
      {
        AMOUNT: '- 345.34 SHE',
        TO: '345walletaddressLOREM45whd',
        TIME: '2022/09/26   19:07',
      },
      {
        AMOUNT: '- 345.34 SHE',
        TO: '345walletaddressLOREM45whd',
        TIME: '2022/09/26   19:07',
      },
      {
        AMOUNT: '- 345.34 SHE',
        TO: '345walletaddressLOREM45whd',
        TIME: '2022/09/26   19:07',
      },
    ],
  }

  return (
    <>
      <TransactionsTableHeads />
      <div className={styles.transactionTable}>
        <div className="content">
          <table>
            <thead>
              <tr>
                {TransactionsTableData.TableHeader.map((colTable) => (
                  <th scope="col" key={TransactionsTableData.TableHeader.indexOf(colTable)}>
                    {colTable}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TransactionsTableData.Data.map((element) => (
                <tr key={TransactionsTableData.Data.indexOf(element)}>
                  <td data-label="IMAGE">
                    <Image src={TokenImage} alt="Token Image"></Image>
                  </td>
                  <td data-label="AMOUNT">{element.AMOUNT}</td>
                  <td data-label="TO">{element.TO}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td data-label="TIME">{element.TIME}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.mobileTable}>
            {TransactionsTableData.Data.map((mobileElement) => (
              <div className={styles.mobileTableElement} key={TransactionsTableData.Data.indexOf(mobileElement)}>
                <div className={styles.mobileTableFirst}>
                  <Image src={TokenImage} alt="Token Image"></Image>
                  <p>{mobileElement.AMOUNT}</p>

                  <p>{mobileElement.TIME}</p>
                </div>
                <div className={styles.mobileTableSecond}>
                  <p>{mobileElement.TO}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default TransactionsTable
