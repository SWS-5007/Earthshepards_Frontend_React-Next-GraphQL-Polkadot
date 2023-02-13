import Container from '../../molecules/Container/Container'
import Grid from '../../molecules/Grid/Grid'
import Image from 'next/image'
import styles from './SearchBar.module.scss'

import SearchImage from '../../../public/searchIcon.png'

const SearchBar = () => {
  return (
    <section className={styles.searchbar}>
      <Container>
        <Grid>
          <form>
            <Image className={styles.searchImage} src={SearchImage} alt={'search image'}></Image>
            <input type="text" placeholder="Search"></input>
          </form>
        </Grid>
      </Container>
    </section>
  )
}

export default SearchBar
