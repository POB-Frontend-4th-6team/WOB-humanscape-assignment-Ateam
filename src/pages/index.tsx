import Header from './components/header'
import SearchPage from './SearchPage'
import Footer from './components/Footer'
import styles from './Pages.module.scss'

const Main = () => {
  return (
    <div className={styles.app}>
      <Header />
      <SearchPage />
      <Footer />
    </div>
  )
}

export default Main
