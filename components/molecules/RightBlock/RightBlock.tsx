import styles from './RightBlock.module.scss'
import Container from '../Container/Container'
import ColorButton from '../../atoms/ColorButton/ColorButton'

const RightBlock = () => {
  return (
    <>
      {/* <div className={`${styles.backgroundBlock}`}></div> */}
      <section className={styles.rightBlock}>
        <Container newStyle={styles.container}>
          <div className={styles.image}></div>
          <div className={styles.details}>
            <h2>Earth Shepards Collection</h2>
            <p>Traits: Magical Fire,</p>
            <p>Traits: Owns, 13,8% of total land</p>
          </div>
          {/* <div className={styles.nftAssets}>
          <h2 className="title">NFT Assets</h2>
          <ColorButton ButtonText="Planted Trees" Color="#E7F4F9" TextColor="#00275C"></ColorButton>
          <ColorButton ButtonText="Climate actions" Color="#E7F4F9" TextColor="#00275C"></ColorButton>
          <ColorButton ButtonText="Items" Color="#E7F4F9" TextColor="#00275C"></ColorButton>
        </div>
          <ColorButton ButtonText="Connect to Singular" connect={true} MarginTop="40px"></ColorButton> */}
        </Container>
      </section>
    </>
  )
}

export default RightBlock
