"use client";
import { useState, useEffect } from "react";
import "@polkadot/api-augment";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
// import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp'

import Container from "../../molecules/Container/Container";
import Grid from "../../molecules/Grid/Grid";
import WalletMenu from "../../molecules/WalletMenu/WalletMenu";
import TransactionsTable from "../../molecules/TransactionTable/TransactionTable";
import SelectModal from "../../atoms/SelectModal/SelectModal";
import WalletToken from "../../molecules/WalletToken/WalletToken";
import TransactionStatus from "../../atoms/TransactionStatus/TransactionStatus";
import ReceiveModal from "../../atoms/ReceiveModal/ReceiveModal";
import SendModal from "../../atoms/SendModal/SendModal";

const wsProvider = new WsProvider("wss://www.sheartoken.com/");

const client = new ApolloClient({
  uri: "https://api.shearscan.com/graphql/",
  cache: new InMemoryCache(),
});

interface BalanceType {
  feeFrozen?: string;
  free?: string;
  miscFrozen?: string;
  reserved?: string;
}

interface localStorageWalletType {
  address?: string;
  meta?: {
    genesisHash?: string;
    name?: string;
    source?: string;
  }
  type?: string;
}

const Wallet = () => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [hasPolkExtension, setHasPolkExtension] = useState<boolean>(true);
  const [actualAccount, setActualAccount] = useState<InjectedAccountWithMeta>();
  const [hasMultipleAccounts, setHasMultipleAccounts] = useState<boolean>(
    false
  );
  const [hasNoAccount, setHasNoAccount] = useState<boolean>(false);
  const [
    closeTransactionStatusModal,
    setCloseTransactionStatusModal,
  ] = useState<boolean>(false);
  const [handlerReceiveModal, setHandlerReceiveModal] = useState<boolean>(
    false
  );
  const [handlerSendModal, setHandlerSendModal] = useState<boolean>(false);
  const [accountId, setAccount] = useState<string>("");
  const [transactions, setTransactionDatas] = useState<any[]>([]);
  const [freeBalance, setBalance] = useState<BalanceType>({});
  const [freeBalanceValue, setBalanceValue] = useState<number>(0);
  const [connectedWalletAddress, setConnectedWalletAddress] = useState<string>("");

  useEffect(() => {
    const localStorage_Wallet = JSON.parse(localStorage?.getItem('wallet_account') || "{}")
    console.log('localStorage_Wallet', localStorage_Wallet)
    if (localStorage_Wallet && localStorage_Wallet[0]) {
      const wallet_address: string = localStorage_Wallet[0].address;
      setActualAccount(localStorage_Wallet[0]);
      setConnectedWalletAddress(wallet_address);

      getBalance(wallet_address);

      handleFetchTransaction(wallet_address);
    }
  }, []);

  const handleFetchTransaction = async (wallet_address: string) => {
    //Get Transaction History
    const query = `
      query {
        getExtrinsics(filters: { 
          callModule: "Balances", 
          or: [
            { callName: "transfer" },
            { callName: "transfer_keep_alive" },
            { callName: "transfer_all" },
          ],
          multiAddressAccountId: "${wallet_address}"
        }, pageSize: 10)
        {
          objects {
            blockNumber, extrinsicIdx, hash, callModule, callName, signed, blockHash, blockDatetime, multiAddressAccountId, callArguments
          }, pageInfo { pageSize, pageNext, pagePrev }
        }
      }
      `;
    const allTransactionQuery = client.query({
      query: gql(query),
    });

    allTransactionQuery.then((res) => {
      console.log("ConnectedWallet_Transaction_History", res.data.getExtrinsics.objects)
      setTransactionDatas(res.data.getExtrinsics.objects);
    });
  }

  const getBalance = async (wallet_address: string) => {
    //Get Balance and Nonce of Wallet
    const api = await ApiPromise.create({ provider: wsProvider });

    // const walletAddress = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";

    const { nonce, data: balance } = await api.query.system.account(
      wallet_address
    );

    console.log(
      "Wallet_Balance",
      balance.free.toString(),
      balance.toJSON(),
      balance.toHuman()
    );

    setBalance(balance.toHuman());
    let balanceHuman: any = balance.toHuman().free;
    let floatBalance: number =
      parseFloat(balanceHuman.replace(/,/g, "")) / 1e12;

    setBalanceValue(Math.floor(floatBalance));
  }

  const extensionSetup = async () => {
    const { web3Accounts, web3Enable, web3FromAddress } = await import(
      "@polkadot/extension-dapp"
    );
    const extensions = await web3Enable("Polk4NET");
    if (extensions.length === 0) {
      setHasPolkExtension(false);
      return;
    }

    const account = await web3Accounts();
    if (Number(account.length) > 1) {
      setHasMultipleAccounts(true);
    } else if (Number(account.length) === 0) {
      setHasNoAccount(true);
    }
    setAccounts(account);
    setActualAccount(account[0]);
    console.log("Account: ", account);

    //Saving the accounts on localstorage.
    if (account) {
      localStorage.setItem("wallet_account", JSON.stringify(account));
      // localStorage.setItem("wallet_account_id", JSON.stringify(account[0].address));
    }



    // //Get Balance and Nonce of Wallet
    // const api = await ApiPromise.create({ provider: wsProvider });

    // // const walletAddress = account[0].address;

    // const walletAddress = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";

    // const { nonce, data: balance } = await api.query.system.account(
    //   walletAddress
    // );

    // console.log(
    //   "!!!!!!!!!!!",
    //   balance.free.toString(),
    //   balance.toJSON(),
    //   balance.toHuman()
    // );

    // setBalance(balance.toHuman());
    // let balanceHuman: any = balance.toHuman().free;
    // let floatBalance: number =
    //   parseFloat(balanceHuman.replace(/,/g, "")) / 1e12;

    // setBalanceValue(Math.floor(floatBalance));

    getBalance(account[0].address);
    // getBalance(walletAddress);


    //Get Transaction History

    // const query = `
    //   query {
    //     getExtrinsics(filters: { 
    //       callModule: "Balances", 
    //       or: [
    //         { callName: "transfer" },
    //         { callName: "transfer_keep_alive" },
    //         { callName: "transfer_all" },
    //       ],
    //       multiAddressAccountId: "${walletAddress}"
    //     }, pageSize: 10)
    //     {
    //       objects {
    //         blockNumber, extrinsicIdx, hash, callModule, callName, signed, blockHash, blockDatetime, multiAddressAccountId, callArguments
    //       }, pageInfo { pageSize, pageNext, pagePrev }
    //     }
    //   }
    // `;
    // const allTransactionQuery = client.query({
    //   query: gql(query),
    // });

    // allTransactionQuery.then((res) => {
    //   setTransactionDatas(res.data.getExtrinsics.objects);
    // });
  };

  const sendTransfer = async (toAccount: string, ammount: number) => {
    try {
      const { web3Accounts, web3Enable, web3FromAddress } = await import(
        "@polkadot/extension-dapp"
      );
      const extensions = await web3Enable("Polk4NET");

      const api = await ApiPromise.create({ provider: wsProvider });
      console.log('@@@@SendedTokenAmount', actualAccount?.address, actualAccount, toAccount, ammount)

      if (actualAccount?.address !== "" && actualAccount) {
        const SENDER = actualAccount.address;
        console.log('SENDER', SENDER, typeof SENDER)
        const injector = await web3FromAddress(SENDER);
        console.log('sendTransfer_injector', injector)

        api.tx.balances
          .transfer(toAccount, ammount)
          .signAndSend(SENDER, { signer: injector.signer }, (status) => {
            console.log('SendToken_Status', status)
          });

        handleFetchTransaction(SENDER);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="wallet" style={{ width: "100%" }}>
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
          {hasPolkExtension &&
            actualAccount &&
            hasMultipleAccounts === true && (
              <SelectModal
                setHasMultipleAccounts={setHasMultipleAccounts}
                setActualAccount={setActualAccount}
                accounts={accounts}
              ></SelectModal>
            )}
          <WalletToken
            actualAccount={actualAccount}
            freeBalanceValue={freeBalanceValue}
            setCloseTransactionStatusModal={setCloseTransactionStatusModal}
            setHandlerReceiveModal={setHandlerReceiveModal}
            setHandlerSendModal={setHandlerSendModal}
          />
          {closeTransactionStatusModal && (
            <TransactionStatus
              title={"Connect Wallet"}
              ftext={"Please connect wallet in order to make any transactions!"}
              setCloseTransactionStatusModal={setCloseTransactionStatusModal}
            ></TransactionStatus>
          )}

          {handlerReceiveModal !== false && (
            <ReceiveModal
              setHandlerReceiveModal={setHandlerReceiveModal}
              accountId={accountId}
            />
          )}

          {handlerSendModal !== false && (
            <SendModal
              sendTransfer={sendTransfer}
              setHandlerSendModal={setHandlerSendModal}
            />
          )}

          <TransactionsTable transactions={transactions} />
        </Grid>
      </Container>
    </section>
  );
};

export default Wallet;
