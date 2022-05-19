import styles from './Pages.module.scss'
import SearchPage from './SearchPage'

const Main = () => {
  return (
    <div className={styles.app}>
      <SearchPage />
    </div>
  )
}

export default Main
