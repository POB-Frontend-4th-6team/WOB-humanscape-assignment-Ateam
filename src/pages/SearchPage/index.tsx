import Input from './main/input'
import styles from './SearchPage.module.scss'

const SearchPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerBox}>
        <div className={styles.title}>
          <p>국내 모든 임상시험 검색하고</p>
          <p>온라인으로 참여하기</p>
        </div>
        <Input />
      </div>
    </div>
  )
}

export default SearchPage
