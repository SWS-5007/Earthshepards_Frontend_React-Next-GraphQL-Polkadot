"use client";
import styles from './Dashboard.module.scss'
import SearchBar from '../../atoms/SearchBar/SearchBar'
import ShearBlockChain from '../../molecules/ShearBockChain/ShearBlockChain'
import ShearToken from '../../molecules/ShearToken/ShearToken'
import RecentTransactions from '../../molecules/RecentTransactions/RecentTransactions'
import RightBlock from '../../molecules/RightBlock/RightBlock'
import RightIcon from '../../atoms/RightIcon/RightIcon'
import LeftMenu from '../LeftMenu/LeftMenu'
import WebSocketDemo from './WebSocketDemo.js'

const Dashboard = () => {
  return (
    <section style={{ width: '100%', display: 'flex', marginTop: 0 }}>
      <div className={styles.main}>
        <WebSocketDemo />
        {/* <SearchBar />
        <ShearBlockChain />
        <ShearToken />
        <RecentTransactions /> */}
      </div>
      <RightIcon />
      <RightBlock /> 
    </section>
  )
}

export default Dashboard
