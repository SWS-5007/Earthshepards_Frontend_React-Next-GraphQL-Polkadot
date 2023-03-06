'use client'

import styles from './LeftMenu.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../public/logo.png'
import DashboardImage from '../../../public/dashboard.png'
import WalletImage from '../../../public/wallet.png'
import VoteImage from '../../../public/vote.png'
import StakeImage from '../../../public/stake.png'
import MintShearImage from '../../../public/mint-shear.png'
import MarketplaceImage from '../../../public/marketplace.png'
import LendingImage from '../../../public/lending.png'
import LaunchpadImage from '../../../public/launchpad.png'
import RunANodeImage from '../../../public/run-a-node.png'
import DevelopersImage from '../../../public/developers.png'
import HelpImage from '../../../public/help.png'
import CogImage from '../../../public/cog.png'
import DisconnectImage from '../../../public/disconnect.png'
import { useState } from 'react'

const LeftMenu = () => {
  const [disabled, setDisabled] = useState<boolean>(true)

  const firstElement = [
    {
      absoluteName: 'Dashboard',
      imagePath: DashboardImage,
      absoluteLink: '/',
    },
    {
      absoluteName: 'Wallet',
      imagePath: WalletImage,
      absoluteLink: '/wallet',
    },
    {
      absoluteName: 'Vote',
      imagePath: VoteImage,
      absoluteLink: '',
    },
    {
      absoluteName: 'Stake',
      imagePath: StakeImage,
      absoluteLink: '',
    },
  ]

  const secondElement = [
    {
      absoluteName: 'Mint Shear',
      imagePath: MintShearImage,
      absoluteLink: '',
    },
    {
      absoluteName: 'Marketplace',
      imagePath: MarketplaceImage,
      absoluteLink: '',
    },
    {
      absoluteName: 'Lending',
      imagePath: LendingImage,
      absoluteLink: '',
    },
    {
      absoluteName: 'Launchpad',
      imagePath: LaunchpadImage,
      absoluteLink: '',
    },
  ]

  const thirdElement = [
    {
      absoluteName: 'Run a Node',
      imagePath: RunANodeImage,
      absoluteLink: '',
    },
    {
      absoluteName: 'Developers',
      imagePath: DevelopersImage,
      absoluteLink: '',
    },
  ]

  const fourthElement = [
    {
      absoluteName: 'Help',
      imagePath: HelpImage,
      absoluteLink: '',
    },
    {
      absoluteName: 'Settings',
      imagePath: CogImage,
      absoluteLink: '',
    },
    {
      absoluteName: 'Disconnect',
      imagePath: DisconnectImage,
      absoluteLink: '',
    },
  ]

  const menuDisabling = () => {
    // document.querySelector('#menu-disabling-runner').classList.toggle('menu-disabled')
    if (disabled === true) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  return (
    <section
      className={`${styles.LeftMenu} ${disabled ? styles.menuDisabled : ''}`}
      id={'menu-disabling-runner'}
      style={{ marginTop: 0 }}
    >
      <div
        className={styles.CloseMenuMobile}
        onClick={() => {
          menuDisabling()
        }}
      ></div>

      <div
        className={`${styles.OpenMenu} ${disabled ? styles.CloseMenu : ''}`}
        onClick={() => {
          menuDisabling()
        }}
      >
        <div className={styles.hamburgerLine}></div>
      </div>

      <div className={styles.BackgroundLogo}>
        <div className={styles.Logo}>
          <Image src={Logo} alt="alt-image"></Image>
        </div>
      </div>

      <div className={styles.Content}>
        <div className={styles.Elements} style={{ marginTop: '0' }}>
          {firstElement.map((fe) => (
            <div
              className={`${styles.Element}`}
              key={fe.absoluteName}
            >
              <Image src={fe.imagePath} alt="alt-image"></Image>
              {fe.absoluteName == "Dashboard" || fe.absoluteName == "Wallet" ? <Link
                href={fe.absoluteLink}
                style={{ color: `var(--polar)` }}
              >
                {fe.absoluteName}
              </Link> : <Link
                href={fe.absoluteLink}
                onClick={() => {
                  // closeMenu()
                }}
              >
                {fe.absoluteName}
              </Link>}
              {/* <Link
                href={fe.absoluteLink}
                onClick={() => {
                  // closeMenu()
                }}
              >
                {fe.absoluteName}
              </Link> */}
            </div>
          ))}
        </div>

        <div className={styles.Elements}>
          {secondElement.map((se) => (
            <div className={styles.Element} key={se.absoluteName}>
              <Image src={se.imagePath} alt="alt-image"></Image>
              <Link
                href={se.absoluteLink}
                onClick={() => {
                  // closeMenu()
                }}
              >
                {se.absoluteName}
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.Elements}>
          {thirdElement.map((te) => (
            <div className={styles.Element} key={te.absoluteName}>
              <Image src={te.imagePath} alt="alt-image"></Image>
              <Link
                href={te.absoluteLink}
                onClick={() => {
                  // closeMenu()
                }}
              >
                {te.absoluteName}
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.Elements}>
          {fourthElement.map((fe) => (
            <div className={styles.Element} key={fe.absoluteName}>
              <Image src={fe.imagePath} alt="alt-image"></Image>
              {fe.absoluteName == "Disconnect" ? <Link
                href={fe.absoluteLink}
                style={{ color: `var(--polar)` }}
              >
                {fe.absoluteName}
              </Link> : <Link
                href={fe.absoluteLink}
                onClick={() => {
                  // closeMenu()
                }}
              >
                {fe.absoluteName}
              </Link>}
            </div>
          ))}
        </div>
      </div>
    </section >
  )
}

export default LeftMenu
