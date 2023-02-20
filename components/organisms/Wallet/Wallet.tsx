'use client'
import Container from '../../molecules/Container/Container'
import Grid from '../../molecules/Grid/Grid'
import WalletMenu from '../../molecules/WalletMenu/WalletMenu'
import TransactionsTable from '../../molecules/TransactionTable/TransactionTable'
import SelectModal from '../../atoms/SelectModal/SelectModal'
import WalletToken from '../../molecules/WalletToken/WalletToken'
import TransactionStatus from '../../atoms/TransactionStatus/TransactionStatus'
import ReceiveModal from '../../atoms/ReceiveModal/ReceiveModal'
import SendModal from '../../atoms/SendModal/SendModal'
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
// import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { useState } from 'react'

const Wallet = () => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([])
  const [hasPolkExtension, setHasPolkExtension] = useState<boolean>(true)
  const [actualAccount, setActualAccount] = useState<InjectedAccountWithMeta>()
  const [hasMultipleAccounts, setHasMultipleAccounts] = useState<boolean>(false)
  const [hasNoAccount, setHasNoAccount] = useState<boolean>(false)
  const [closeTransactionStatusModal, setCloseTransactionStatusModal] = useState<boolean>(false)
  const [handlerReceiveModal, setHandlerReceiveModal] = useState<boolean>(false)
  const [handlerSendModal, setHandlerSendModal] = useState<boolean>(false)
  const [accountId, setAccount] = useState<string>('')

  const extensionSetup = async () => {
    const { web3Accounts, web3Enable, web3FromAddress } = await import('@polkadot/extension-dapp')
    const extensions = await web3Enable('Polk4NET')
    if (extensions.length === 0) {
      setHasPolkExtension(false)
      return
    }
    const account = await web3Accounts()
    if (Number(account.length) > 1) {
      setHasMultipleAccounts(true)
    } else if (Number(account.length) === 0) {
      setHasNoAccount(true)
    }
    setAccounts(account)
    setActualAccount(account[0])
    console.log('Account: ', account)
    console.log('Account_Address: ', account[0].address)
  }

  const sendTransfer = async (toAccount: string, ammount: number) => {
    try {
      const { web3Accounts, web3Enable, web3FromAddress } = await import('@polkadot/extension-dapp')
      const wsProvider = new WsProvider('wss://www.sheartoken.com/')
      const api = await ApiPromise.create({ provider: wsProvider })
      if (actualAccount?.address !== '' && actualAccount) {
        const SENDER = actualAccount.address
        const injector = await web3FromAddress(SENDER)
        api.tx.balances.transfer(toAccount, ammount).signAndSend(SENDER, { signer: injector.signer }, (status) => {
          console.log('Transfer status: ', status)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="wallet" style={{ width: '100%' }}>
      <Container>
        <Grid>
          <WalletMenu
            setAccount={setAccount}
            accountId={accountId}
            hasNoAccount={hasNoAccount}
            hasMultipleAccounts={hasMultipleAccounts}
            actualAccount={actualAccount}
            hasPolkExtension={hasPolkExtension}
            extensionSetup={extensionSetup}
          />
          {hasPolkExtension && actualAccount && hasMultipleAccounts === true && (
            <SelectModal
              setHasMultipleAccounts={setHasMultipleAccounts}
              setActualAccount={setActualAccount}
              accounts={accounts}
            ></SelectModal>
          )}
          <WalletToken
            actualAccount={actualAccount}
            setCloseTransactionStatusModal={setCloseTransactionStatusModal}
            setHandlerReceiveModal={setHandlerReceiveModal}
            setHandlerSendModal={setHandlerSendModal}
          />
          {closeTransactionStatusModal && (
            <TransactionStatus
              title={'Connect Wallet'}
              ftext={'Please connect wallet in order to make any transactions!'}
              setCloseTransactionStatusModal={setCloseTransactionStatusModal}
            ></TransactionStatus>
          )}

          {handlerReceiveModal !== false && (
            <ReceiveModal setHandlerReceiveModal={setHandlerReceiveModal} accountId={accountId} />
          )}

          {handlerSendModal !== false && <SendModal sendTransfer={sendTransfer} setHandlerSendModal={setHandlerSendModal} />}
          <TransactionsTable />
        </Grid>
      </Container>
    </section>
  )
}

export default Wallet
