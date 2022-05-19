import Input from './main/input'
import Result from './main/result'
import styles from './SearchPage.module.scss'

const SearchPage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.section1}>
        <h2 className={styles.title}>
          국내 모든 임상시험 검색하고
          <br />
          온라인으로 참여하기
        </h2>
      </section>
      <Input />
      <Result />
    </div>
  )
}

export default SearchPage
