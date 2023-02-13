import { ApiPromise, WsProvider } from '@polkadot/api'
import { Keyring } from '@polkadot/api'
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto'

// export const sendTransfer = async (fromAccount: string, toAccount: string, amount: number) => {
//   const wsProvider = new WsProvider('wss://www.sheartoken.com/')
//   const api = await ApiPromise.create({ provider: wsProvider })
//   const txHash = await api.tx.balances.transfer(fromAccount, amount).signAndSend(toAccount)

//   console.log(`Submitted with hash ${txHash}`)
// }

export const addAccount = async (setAccount: any, setMnemonic: any) => {
  const keyring = new Keyring({ type: 'sr25519' })
  const mnemonic = mnemonicGenerate()

  await cryptoWaitReady()

  // create an sr25519 pair from the mnemonic (keyring defaults)
  const sp = keyring.createFromUri(mnemonic, { name: 'Create' })

  setAccount(sp.address)
  setMnemonic(mnemonic)
}

export const connectAccount = (mnemonic: string, nameOfWallet?: string) => {
  const keyring = new Keyring({ type: 'sr25519' })
  const pair = keyring.addFromUri(mnemonic, { name: nameOfWallet ? nameOfWallet : 'Test' }, 'sr25519')

  // console.log(keyring.pairs.length, 'pairs available')
  // console.log(pair.meta.name, 'has address', pair.address)
  // console.log('mnemonic', mnemonic)
}
