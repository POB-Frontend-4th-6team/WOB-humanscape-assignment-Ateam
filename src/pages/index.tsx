import styles from './Pages.module.scss'
import Header from './components/Header'
import SearchPage from './SearchPage'
import Footer from './components/Footer'

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
