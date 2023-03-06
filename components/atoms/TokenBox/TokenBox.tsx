import styles from './TokenBox.module.scss'
import Image from 'next/image'

import ServerImage from './../../../public/server.svg'

export interface Props {
  imagePath?: string | null
  title: string
  subtitle: number | null
  rate: null | number
}

const TokenBox = ({ imagePath, title, subtitle, rate }: Props) => {
  return (
    <div className={styles.box}>
      {imagePath == 'server' && (
        <div className={styles.boxImage}>
          <Image src={ServerImage} alt={'box-icon'}></Image>
        </div>
      )}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {rate && (
        <p style={{ color: rate >= 0 ? 'green' : 'red' }}>
          {rate >= 0 ? '+' : ''}
          {rate} %
        </p>
      )}
    </div>
  )
}

export default TokenBox
