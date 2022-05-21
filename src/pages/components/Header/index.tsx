import { HeaderIcon } from 'assets/svgs'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <HeaderIcon />
        </div>
        <div className={styles.rghit}>
          <p>소식받기</p>
          <p>제휴/문의</p>
        </div>
      </div>
    </header>
  )
}

export default Header
