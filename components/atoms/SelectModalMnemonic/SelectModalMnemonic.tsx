import styles from './SelectModalMnemonic.module.scss'



const SelectModalMnemonic = () => {

  return (
    <>
      <div className={styles.backgroundModal}></div>
      <div className={styles.modalSelect}>
          <h3 className={styles.connectPolkadotMnemonic}>How to you want to connect?</h3>
          <div className={styles.connectOptions}>
            <p>Polkadot Extention</p>
            <p>Our services</p>
          </div>
      </div>
    </>
  )
}

export default SelectModalMnemonic
