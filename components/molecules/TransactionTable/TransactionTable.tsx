import styles from "./TransactionsTable.module.scss";
import Image from "next/image";
import TokenImage from "../../../public/logo.png";
import TransactionsTableHeads from "../../atoms/TransactionTableHeads/TransactionsTableHeads";

export interface Props {
  transactions?: any[];
  TableHeader?: string[];
  Data?: {
    IMAGE: string;
    AMOUNT: string;
    TO: string;
    TIME: string;
  }[];
}

const TransactionsTable = ({ transactions }: Props) => {
  const TransactionsTableData = {
    TableHeader: [
      "AMOUNT",
      "SPACE1",
      "TO",
      "SPACE2",
      "SPACE3",
      "SPACE4",
      "SPACE5",
      "TIME",
    ],
    Data: [
      {
        AMOUNT: "- 345.34 SHE",
        TO: "345walletaddressLOREM45whd",
        TIME: "2022/09/26   19:07",
      },
    ],
  };

  return (
    <>
      <TransactionsTableHeads />
      <div className={styles.transactionTable}>
        <div className="content">
          <table>
            <thead>
              <tr>
                {TransactionsTableData.TableHeader.map((colTable) => (
                  <th
                    scope="col"
                    key={TransactionsTableData.TableHeader.indexOf(colTable)}
                  >
                    {colTable}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions?.length === 0 ? (
                <tr>
                  <td colSpan={8}>No transaction yet</td>
                </tr>
              ) : (
                transactions?.map((element) => (
                  <tr key={transactions?.indexOf(element)}>
                    <td data-label="IMAGE">
                      <Image src={TokenImage} alt="Token Image"></Image>
                    </td>
                    <td data-label="AMOUNT">
                      {eval("(" + element.callArguments + ")")[1].value}
                    </td>
                    <td data-label="TO">
                      {eval("(" + element.callArguments + ")")[0].value.slice(
                        55
                      )}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td data-label="TIME">{element.blockDatetime}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className={styles.mobileTable}>
            {transactions?.length === 0 ? (
              <div className={styles.mobileTableElement}>
                No transaction yet
              </div>
            ) : (
              transactions?.map((mobileElement) => (
                <div
                  className={styles.mobileTableElement}
                  key={transactions?.indexOf(mobileElement)}
                >
                  <div className={styles.mobileTableFirst}>
                    <Image src={TokenImage} alt="Token Image"></Image>
                    <p>
                      {eval("(" + mobileElement.callArguments + ")")[1].value}
                    </p>

                    <p>{mobileElement.blockDatetime}</p>
                  </div>
                  <div className={styles.mobileTableSecond}>
                    <p>
                      {eval(
                        "(" + mobileElement.callArguments + ")"
                      )[0].value.slice(55)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionsTable;
