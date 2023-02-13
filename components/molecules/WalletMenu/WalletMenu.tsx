'use client'
import Link from 'next/link'
import MnemonicBox from '../../atoms/MnemonicBox/MnemonicBox'
import styles from './WalletMenu.module.scss'
import { addAccount } from '../../templates/WalletTemplate/Utils/PolkaDot'
import { useState } from 'react'
import ShearWalletIcon from '../../../public/cryptowallet.png'
import Image from 'next/image'

import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'

export interface Props {
  hasNoAccount: boolean
  hasMultipleAccounts: boolean
  actualAccount: InjectedAccountWithMeta | undefined
  extensionSetup: any
  hasPolkExtension: boolean
  accountId: string
  setAccount: any
}

const WalletMenu = ({
  accountId,
  setAccount,
  hasNoAccount,
  hasMultipleAccounts,
  actualAccount,
  extensionSetup,
  hasPolkExtension,
}: Props) => {
  const [mnemonic, setMnemonic] = useState<string>('')
  const [closeMnemonicModal, setCloseMnemonicModal] = useState(false)

  return (
    <>
      <div className={styles.walletMenu}>
        <div
          className={styles.createWallet}
          onClick={() => {
            addAccount(setAccount, setMnemonic)
            setCloseMnemonicModal(false)
          }}
        >
          <Image src={ShearWalletIcon} alt={'shear wallet'}></Image>
          <h2>Create Wallet</h2>
        </div>
        {hasPolkExtension && actualAccount && hasMultipleAccounts === false ? (
          // <h2>{actualAccount.meta.name ? actualAccount.meta.name : actualAccount.address.replace(actualAccount.address.substring(6,42), "...")}</h2>
          <div className={styles.connectWallet}>
            <h2>{actualAccount.address.replace(actualAccount.address.substring(6, 42), '...')}</h2>
          </div>
        ) : hasPolkExtension && actualAccount && hasMultipleAccounts === true ? (
          <div className={styles.connectWallet}>
            <h2> Choose Wallet</h2>
          </div>
        ) : hasNoAccount && hasMultipleAccounts === false ? (
          <div className={styles.connectWallet}>
            <h2>Please create wallet</h2>
          </div>
        ) : hasPolkExtension ? (
          <div className={styles.connectWallet} onClick={extensionSetup}>
            <h2>Connect Wallet</h2>
          </div>
        ) : (
          <div className={styles.connectWallet}>
            <Link href={'https://polkadot.js.org/extension/'}>Get PolkaDot Extension</Link>
          </div>
        )}
      </div>
      {accountId !== '' && mnemonic !== '' && closeMnemonicModal !== true && (
        <MnemonicBox setCloseMnemonicModal={setCloseMnemonicModal} accountId={accountId} mnemonic={mnemonic} />
      )}
    </>
  )
}

export default WalletMenu
