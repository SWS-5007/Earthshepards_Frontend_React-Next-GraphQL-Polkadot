import styles from './TextBlock.module.scss'

export interface Props {
  title: string | number | undefined
  paragraph: string
  color?: "Green"
  type?: "FirstType" | "SecondType"

}

const TextBlock = ({ title, paragraph, type }: Props) => {
  let BlockType
  switch (type) {
    case 'FirstType':
      BlockType = `${styles.FirstTypeTextBlock}`
      break
    case 'SecondType':
      BlockType = `${styles.SecondTypeTextBlock}`
      break
    default:
      BlockType = `${styles.FirstTypeTextBlock}`
      break
  }




  return (
    <div className={BlockType}>
      <div className={styles.Text}>
        <h2>{title}</h2>
        <p>{paragraph}</p>
      </div>
    </div>
  )
}

export default TextBlock
