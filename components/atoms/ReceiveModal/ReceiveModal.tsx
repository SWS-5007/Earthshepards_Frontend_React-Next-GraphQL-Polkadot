'use client'
import styles from './ReceiveModal.module.scss'
import { useState } from 'react'

export interface Props {
  accountId: string
  setHandlerReceiveModal: any
}

const ReceiveModal = ({ setHandlerReceiveModal, accountId }: any) => {
  const localStorage_Wallet = JSON.parse(localStorage?.getItem('wallet_account') || "{}")
  const connectedWalletAddress = localStorage_Wallet[0].address;
  console.log('ReceiveModal_connectedWalletAddress', connectedWalletAddress)

  return (
    <div className={`${styles.modalContainer}`}>
      {accountId === '' && connectedWalletAddress === '' ? (
        <h3 className={styles.modalText}>Woops...something went wrong !</h3>
      ) : (
        <h3 className={styles.modalText}>Here is your account ID! Send it to the person you want to receive tokens.</h3>
      )}
      {accountId === '' && connectedWalletAddress === '' ? (
        <p>You need to create a wallet !</p>
      ) : (
        (accountId === '' ? <p className={styles.accountId}>Account ID: {connectedWalletAddress}</p> : <p className={styles.accountId}>Account ID: {accountId}</p>)
        // < p className={styles.accountId}>Account ID: {accountId}</p>
      )
      }

      {
        accountId === '' && connectedWalletAddress === '' ? (
          <div
            className={styles.closeButton}
            onClick={() => {
              setHandlerReceiveModal(false)
            }}
          >
            <p className={styles.modalButton}>Understood !</p>
          </div>
        ) : (
          <div
            className={styles.closeButton}
            onClick={() => {
              setHandlerReceiveModal(false)
            }}
          >
            <p className={styles.modalButton}>I have copied my account ID !</p>
          </div>
        )
      }
    </div >
  )
}

export default ReceiveModal
