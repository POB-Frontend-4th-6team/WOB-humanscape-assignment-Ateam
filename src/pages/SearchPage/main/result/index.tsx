import { useQuery } from 'react-query'
import { getRegExp } from 'korean-regexp'

import { useAppDispatch, useAppSelector, useEffect } from 'hooks'
import { getSearchText, getSplitSearchText, getDiseaseItems, setDiseaseItems } from 'states/disease'
import { getSerachData } from 'services/search'
import { IDiseaseItem } from 'types/disease.d'

import { SearchIcon } from 'assets/svgs'
import styles from './result.module.scss'
import { getMoveNum } from 'states/move'
import { cx } from 'styles'

const Result = () => {
  const dispatch = useAppDispatch()
  const searchText = useAppSelector(getSearchText)
  const splitSearchText = useAppSelector(getSplitSearchText)
  const diseaseItems = useAppSelector(getDiseaseItems)
  const moveNum = useAppSelector(getMoveNum)

  const { data, isLoading } = useQuery(
    ['getDieaseApi', splitSearchText],
    () =>
      getSerachData(splitSearchText).then((res: any[]) => {
        const everyDataArray = []

        for (let i = 0; i < res.length; i += 1) {
          if (res[i].data.response.body.items.item) {
            everyDataArray.push(...res[i].data.response.body.items.item)
          }
        }

        if (everyDataArray) {
          const noDuplicateArray = everyDataArray.filter(
            (element, index, self) => index === self.findIndex((ele) => ele.sickCd === element.sickCd)
          )

          const regexFilteredArray = noDuplicateArray.filter((disease) => disease.sickNm.match(fuzzySearchRegex))

          return regexFilteredArray.slice(0, 10)
        }

        return []
      }),
    {
      enabled: !!splitSearchText,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      cacheTime: 5 * 10 * 1000,
      staleTime: 5 * 10 * 1000,
      onSuccess: () => {
        console.log(splitSearchText, '검색어로 api 호출')
      },
    }
  )

  const fuzzySearchRegex = getRegExp(splitSearchText.join(''), {
    fuzzy: true,
    ignoreCase: false,
    ignoreSpace: true,
    global: true,
  })

  useEffect(() => {
    let result: IDiseaseItem[]
    if (data?.length === 0 || data === undefined) {
      result = []
    } else {
      if (!searchText) return
      result = !Array.isArray(data) ? [data] : data
      result = [{ sickCd: 'first', sickNm: searchText }, ...result]
    }

    dispatch(setDiseaseItems(result))
  }, [data, dispatch, searchText])

  if (isLoading)
    return (
      <div className={styles.section3}>
        <span className={styles.loading}>검색중..</span>
      </div>
    )

  if (diseaseItems.length === 0 && searchText)
    return (
      <div className={styles.section3}>
        <span className={styles.noResult}>검색어 없음</span>
      </div>
    )

  if (!searchText) return <div />

  return (
    <section className={styles.section3}>
      <h2>추천 검색어</h2>
      <ul className={styles.resultBox}>
        {diseaseItems.map((li: IDiseaseItem, i) => (
          <li className={cx(styles.item, { [styles.selectedMoveNum]: moveNum === i })} key={`sickcd-key-${li.sickCd}`}>
            <div className={styles.iconBox}>
              <SearchIcon width='20px' height='20px' />
            </div>
            <p className={styles.t1itle}>{li.sickNm} </p>
            {diseaseItems[0] === li && <p className={styles.nowSearch}> - 현재 검색어</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Result
