import TokenBox from '../../atoms/TokenBox/TokenBox'
import Container from '../Container/Container'
import Grid from '../Grid/Grid'
import styles from './ShearToken.module.scss'
import Image from 'next/image'

import PluseIcon from './../../../public/plus.svg'

const ShearToken = () => {
  const boxData = [
    {
      imagePath: 'null',
      title: 'Balance',
      subtitle: '345,890 SHE',
      rate: null,
    },
    {
      imagePath: null,
      title: 'SHE - DOT',
      subtitle: null,
      rate: 2,
    },
    {
      imagePath: null,
      title: 'SHE - AVAX',
      subtitle: null,
      rate: -1.76,
    },
    {
      imagePath: null,
      title: 'SHE - USDT',
      subtitle: null,
      rate: 0.38,
    },
  ]

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
  }

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
                  subtitle={box.subtitle}
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
