'use client'

import TextBlock from '../../atoms/TextBlock/TextBlock'
import Container from '../Container/Container'
import Grid from '../Grid/Grid'
import styles from './ShearBlockChain.module.scss'
import { useState, useEffect } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'

const ShearBlockChain = () => {
  const [currentBlock, setCurrentBlock] = useState<number | undefined>()

  const setup = async () => {
    const wsProvider = new WsProvider('wss://www.sheartoken.com/')
    const api = await ApiPromise.create({ provider: wsProvider })
    await api.rpc.chain.subscribeNewHeads((lastHeader) => {
      setCurrentBlock(lastHeader.number.toNumber())
      // setLastBlockHash(lastHeader.hash.toString());
    })
  }


  useEffect(() => {
    setup()
  }, [])

  return (
    <section className={styles.Shearblockchain}>
      <Container>
        <Grid>
          <p className={styles.Title}>Shear Blockchain</p>
          <div className={styles.Content}>
            <TextBlock title="Substrate Node" paragraph="Development" type="FirstType"></TextBlock>

            <TextBlock title="Metadata" paragraph="v14" type="FirstType"></TextBlock>

            <TextBlock
              title={currentBlock ? currentBlock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : currentBlock}
              paragraph="CURRENT BLOCK"
              type="SecondType"
            ></TextBlock>

            <TextBlock
              title={currentBlock ? currentBlock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : currentBlock}
              paragraph="FINALIZED BLOCK"
              type="SecondType"
            ></TextBlock>
          </div>
        </Grid>
      </Container>
    </section>
  )
}

export default ShearBlockChain
