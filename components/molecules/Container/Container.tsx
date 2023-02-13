import { ReactNode } from 'react'

import styles from './Container.module.scss'

const Container = ({ children, newStyle }: { children: ReactNode, newStyle?: any}) => {
  return <div className={`${styles.container} ${newStyle}`}>{children}</div>
}

export default Container
