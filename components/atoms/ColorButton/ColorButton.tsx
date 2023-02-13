import styles from './ColorButton.module.scss'

export interface Prop {
  ButtonText: string
  Color?: string
  TextColor?: string
  MarginTop?: string
  connect?: boolean
}

const ColorButton = ({ ButtonText, Color, TextColor, MarginTop, connect }: Prop) => {
  return (
    <div className={`${styles.button} ${connect ? styles.connect : ''}`} style={{ backgroundColor: Color, marginTop: MarginTop }}>
      <h1 style={{color: TextColor}}>{ButtonText}</h1>
    </div>
  )
}

export default ColorButton
