import styles from './SearchPage.module.scss'
import Input from './Input'
import Result from './Result'

const SearchPage = () => {
  return (
    <div className={styles.container}>
      <h2>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h2>
      <Input />
      <Result />
    </div>
  )
}

export default SearchPage
