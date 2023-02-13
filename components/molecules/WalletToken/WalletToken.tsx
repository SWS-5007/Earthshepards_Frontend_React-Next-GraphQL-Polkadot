'use Client'
import Image from 'next/image'
import styles from './WalletToken.module.scss'
import DownArrowImage from '../../../public/down-arrow.png'
import UpArrowImage from '../../../public/up-arrow.png'

export interface Props {
  setHandlerReceiveModal: any
  setHandlerSendModal: any
  actualAccount: any
  setCloseTransactionStatusModal: any
}

const WalletToken = ({
  setHandlerReceiveModal,
  setHandlerSendModal,
  actualAccount,
  setCloseTransactionStatusModal,
}: Props) => {
  return (
    <div className={styles.shearToken}>
      <h1 className={styles.title}>Shear Token</h1>
      <div className={styles.values}>
        <h2>12445 SHE</h2>
        <h2 className={styles.usd}>123.23 USD</h2>
      </div>
      <div className={styles.buttons}>
        <div
          className={styles.receive}
          onClick={() => {
            setHandlerReceiveModal(true)
          }}
        >
          <Image src={DownArrowImage} alt="down arrow"></Image>
          RECEIVE
        </div>

        <div
          className={styles.send}
          onClick={() => {
            if (actualAccount && actualAccount.address !== '') {
              setHandlerSendModal(true)
            } else {
              setCloseTransactionStatusModal(true)
            }
          }}
        >
          <Image src={UpArrowImage} alt="down arrow"></Image>
          SEND
        </div>
      </div>
    </div>
  )
}
export default WalletToken
