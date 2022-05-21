import Header from './components/Headers'
import SearchPage from './SearchPage'
import Footer from './components/Footers'
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
