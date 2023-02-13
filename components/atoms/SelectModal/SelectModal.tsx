import styles from './SelectModal.module.scss'
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import Container from '../../molecules/Container/Container'

export interface Props {
  accounts: InjectedAccountWithMeta[]
  setActualAccount: any
  setHasMultipleAccounts: any
}

const SelectModal = ({ setHasMultipleAccounts, setActualAccount, accounts }: Props) => {

  return (
    <>
      <div className={styles.backgroundModal}></div>
      <div className={styles.modalSelect}>
        {accounts.map((account) => (
          <div
            key={accounts.indexOf(account)}
            onClick={() => {
              setActualAccount(accounts[accounts.indexOf(account)])
              setHasMultipleAccounts(false)
            }}
          >
            <p>{account.address.replace(account.address.substring(6, 42), '...')}</p>
            {account.meta.name && <p>[{account.meta.name}]</p>}
          </div>
        ))}
      </div>
    </>
  )
}

export default SelectModal
