import { useQuery } from 'react-query'

import { useAppDispatch, useAppSelector, useEffect } from 'hooks'
import disease, { getSearchText, getDiseaseItems, setDiseaseItems } from 'states/disease'
import { getSerachData } from 'services/search'
import { IDiseaseItem, IDiseaseResponse } from 'types/disease.d'

import { SearchIcon } from 'assets/svgs'
import styles from './result.module.scss'

const Result = () => {
  const dispatch = useAppDispatch()
  const searchText = useAppSelector(getSearchText) // 검색어
  const diseaseItems = useAppSelector(getDiseaseItems)
  const { data, isLoading } = useQuery(
    ['getDieaseApi', searchText],
    () => getSerachData({ searchText }).then((res) => res.data.response.body.items.item),
    {
      enabled: !!searchText,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      staleTime: 6 * 10 * 1000,
      onSuccess: () => {
        console.log(searchText, '검색어로 api 호출')
      },
    }
  )
  useEffect(() => {
    let result: IDiseaseItem[]
    if (!data) {
      result = []
    } else if (!Array.isArray(data)) {
      result = [data]
    } else {
      result = data
    }
    dispatch(setDiseaseItems(result))
  }, [data, dispatch])

  if (isLoading)
    return (
      // 컴포넌트화 시키기
      <div className={styles.section3}>
        <span className={styles.loading}>검색중..</span>
      </div>
    )

  if (diseaseItems.length === 0 && searchText)
    return (
      // 컴포넌트화 시키기
      <div className={styles.section3}>
        <span className={styles.noResult}>검색어 없음</span>
      </div>
    )

  if (diseaseItems.length === 0) return <div />

  return (
    <section className={styles.section3}>
      <h2>추천 검색어</h2>
      <ul className={styles.resultBox}>
        {diseaseItems.map((li: IDiseaseItem) => (
          <li className={styles.item} key={`sickcd-key-${li.sickCd}`}>
            <div className={styles.iconBox}>
              <SearchIcon width='20px' height='20px' />
            </div>
            <p className={styles.t1itle}>{li.sickNm} </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Result
