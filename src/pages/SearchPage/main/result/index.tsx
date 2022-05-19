import { useQuery } from 'react-query'

import { useAppSelector, useEffect } from 'hooks'
import { getSearchValue } from 'states/diease'
import { getSerachData } from 'services/search'
import { ResponseItemTpye } from 'types/project'

import { SearchIcon } from 'assets/svgs'
import styles from './result.module.scss'

const Result = () => {
  const searchValue = useAppSelector(getSearchValue) // 검색어

  // 데이터 불러오는  부분입니다. 지훈님 여기 수정해주시면 됩니다.
  const { isLoading, data } = useQuery(
    ['getDieaseApi', searchValue],
    () => getSerachData({ searchText: searchValue }).then((res) => res.data.response.body.items.item),
    {
      enabled: !!searchValue,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      staleTime: 6 * 10 * 1000,
      onSuccess: () => {
        console.log(searchValue, '검색어로 api 호출')
      },
    }
  )

  if (isLoading)
    return (
      // 컴포넌트화 시키기
      <div className={styles.section3}>
        <span className={styles.loading}>검색중..</span>
      </div>
    )

  if (!data && searchValue)
    return (
      // 컴포넌트화 시키기
      <div className={styles.section3}>
        <span className={styles.noResult}>검색어 없음</span>
      </div>
    )

  if (!data) return <div />

  return (
    <section className={styles.section3}>
      {data && (
        <>
          <h2>추천 검색어</h2>
          <ul className={styles.resultBox}>
            {data?.map((li: ResponseItemTpye) => (
              <li className={styles.item} key={`sickcd-key-${li.sickCd}`}>
                <div className={styles.iconBox}>
                  <SearchIcon width='20px' height='20px' />
                </div>
                <p className={styles.t1itle}>{li.sickNm} </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default Result
