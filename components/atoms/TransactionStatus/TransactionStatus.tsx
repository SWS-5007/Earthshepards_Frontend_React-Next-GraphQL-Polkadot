'use client'
import styles from './TransactionStatus.module.scss'
import Image from 'next/image'
import CloseMnemonicIcon from '../../../public/close-mnemonic.png'
import { useState } from 'react'

export interface Props {
  title: string
  ftext: string
  stext?: string
  setCloseTransactionStatusModal: any
}

const TransactionStatus = ({ title, ftext, stext, setCloseTransactionStatusModal }: Props) => {
  const [isClickable, setIsClickable] = useState(false)
  setTimeout(() => {
    setIsClickable(true)
  }, 5000)

  return (
    <>
      <div className={styles.backgroundModal}></div>
      <div className={styles.modalSelect}>
        <div
          className={styles.closeIcon}
          onClick={() => {
            if (isClickable === true) setCloseTransactionStatusModal(false)
          }}
        >
          <Image src={CloseMnemonicIcon} alt={'close Transaction Status Image'}></Image>
        </div>
        <h3 className={styles.copyText}>{title}</h3>
        <p>{ftext}</p>
        <p>{stext}</p>
        <div
          className={styles.closeButtonContainer}
          onClick={() => {
            if (isClickable === true) setCloseTransactionStatusModal(false)
          }}
        >
          <p className={styles.closeButton}>Close</p>
        </div>
      </div>
    </>
  )
}

export default TransactionStatus
