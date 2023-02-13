'use client'
import styles from './MnemonicBox.module.scss'
import Image from 'next/image'
import CloseMnemonicIcon from '../../../public/close-mnemonic.png'
import { useState } from 'react'

export interface Props {
  accountId: string
  mnemonic: string
  setCloseMnemonicModal: any
}

const MnemonicBox = ({ accountId, mnemonic, setCloseMnemonicModal }: Props) => {
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
            if (isClickable === true) setCloseMnemonicModal(true)
          }}
        >
          <Image src={CloseMnemonicIcon} alt={'close mnemonic image'}></Image>
        </div>
        <h3 className={styles.copyText}>Here are the credentials of your account! Copy them before closing. </h3>
        <p>Account ID: {accountId}</p>
        <p>Mnemonic: {mnemonic}</p>
        <div
          className={styles.closeButtonContainer}
          onClick={() => {
            if (isClickable === true) setCloseMnemonicModal(true)
          }}
        >
          <p className={styles.closeButton}>I have copied my credentials.</p>
        </div>
      </div>
    </>
  )
}

export default MnemonicBox
