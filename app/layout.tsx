import './general.scss'
import LeftMenu from '../components/organisms/LeftMenu/LeftMenu'
import styles from './layout.module.scss'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Earth Shepards Dashboard</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <main>
          <LeftMenu />
          <div className={styles.mainLayout}>{children}</div>
        </main>
      </body>
    </html>
  )
}
