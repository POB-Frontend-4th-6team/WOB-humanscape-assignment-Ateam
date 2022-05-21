import { HeaderIcon } from 'assets/svgs'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <HeaderIcon />
        </div>
        <nav className={styles.right}>
          <ul>
            <li>소식받기</li>
            <li>제휴/문의</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
