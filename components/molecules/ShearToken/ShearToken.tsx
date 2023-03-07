"use client";
import { useState, useEffect } from "react";
import "@polkadot/api-augment";
import { ApiPromise, WsProvider } from "@polkadot/api";
import type { Balance as Balance2 } from '@polkadot/types/interfaces';

import TokenBox from '../../atoms/TokenBox/TokenBox'
import Container from '../Container/Container'
import Grid from '../Grid/Grid'
import styles from './ShearToken.module.scss'
import Image from 'next/image'

import PluseIcon from './../../../public/plus.svg'

const wsProvider = new WsProvider("wss://www.sheartoken.com/");

const ShearToken = () => {
  const [shearToken_Balance, setShearTokenBalance] = useState<number>(0);

  const boxData = [
    {
      imagePath: 'null',
      title: 'Balance',
      subtitle: '345,890 SHE',
      rate: null,
    },
    // {
    //   imagePath: null,
    //   title: 'SHE - DOT',
    //   subtitle: null,
    //   rate: 2,
    // },
    // {
    //   imagePath: null,
    //   title: 'SHE - AVAX',
    //   subtitle: null,
    //   rate: -1.76,
    // },
    // {
    //   imagePath: null,
    //   title: 'SHE - USDT',
    //   subtitle: null,
    //   rate: 0.38,
    // },
  ]

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
  }

  useEffect(() => {
    // const localStorage_Wallet = JSON.parse(localStorage?.getItem('wallet_account') || "{}")
    // const wallet_address = localStorage_Wallet[0].address;

    const fetchData = async () => {
      const api = await ApiPromise.create({ provider: wsProvider });

      const totalIssuance = await api.query.balances.totalIssuance<Balance2>();
      let totalIssuance_Human: any = totalIssuance.toHuman();
      let shearToken_Balance: number =
        parseFloat(totalIssuance_Human.replace(/,/g, "")) / 1e12;
      console.log('shearToken_Balance', Math.floor(shearToken_Balance))
      setShearTokenBalance(Math.floor(shearToken_Balance));
    }

    fetchData()
      .catch(console.error);
  }, []);

  return (
    <section className={styles.ShearToken}>
      <Container>
        <Grid>
          <h1 className={styles.title}>Shear Token</h1>
          <div className={styles.boxContainer}>
            {boxData.map((box) => (
              <TokenBox
                imagePath={box.imagePath}
                title={box.title}
                subtitle={shearToken_Balance}
                rate={box.rate}
                key={Number(boxData.indexOf(box))}
              ></TokenBox>
            ))}
            <div className={`${styles.box} ${styles.add}`}>
              <div className="icon">
                <Image src={PluseIcon} alt="add-icon"></Image>
              </div>
            </div>
          </div>
        </Grid>
      </Container>
    </section>
  )
}

export default ShearToken
