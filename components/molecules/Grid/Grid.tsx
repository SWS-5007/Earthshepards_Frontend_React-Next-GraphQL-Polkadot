import styles from './Grid.module.scss'

interface Props {
  children: React.ReactNode
  centered?: boolean
  className?: string
}

const Grid = ({ children, centered, className }: Props) => {
  const classes = className ?? ''
  const centeredClass = centered ? styles.centered : ''
  return <div className={`${styles.grid} ${classes} ${centeredClass}`}>{children}</div>
}

export default Grid
