import { IDiseaseItem } from 'types/disease'

import styles from './result.module.scss'
import List from './List'

interface IProps {
  searchText: string
  isLoading: boolean
  diseaseItems: IDiseaseItem[]
}

const Contents = ({ searchText, isLoading, diseaseItems }: IProps) => {
  if (isLoading) return <span className={styles.loading}>검색중..</span>
  if (diseaseItems.length === 0 && searchText) return <span className={styles.noResult}>검색어 없음</span>

  return (
    <>
      <h2>추천 검색어</h2>
      <ul className={styles.resultBox}>
        <List searchText={searchText} diseaseItems={diseaseItems} />
      </ul>
    </>
  )
}

export default Contents
