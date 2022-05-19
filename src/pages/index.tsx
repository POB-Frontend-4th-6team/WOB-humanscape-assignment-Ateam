import Header from './components/header'
import styles from './Pages.module.scss'
import SearchPage from './SearchPage'
import Footer from './components/footer'

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
