import { useQuery } from 'react-query'
import { getRegExp } from 'korean-regexp'

import { useAppDispatch, useAppSelector, useEffect, useState } from 'hooks'
import { getSearchText, getSplitSearchText, getDiseaseItems, setDiseaseItems } from 'states/disease'
import { getSearchData } from 'services/search'
import { IDiseaseItem } from 'types/disease.d'

import styles from './Result.module.scss'
import Contents from './Contents'

const Result = () => {
  const [count, setCount] = useState(0)

  const dispatch = useAppDispatch()
  const searchText = useAppSelector(getSearchText)
  const splitSearchText = useAppSelector(getSplitSearchText)
  const diseaseItems = useAppSelector(getDiseaseItems)

  const fuzzySearchRegex = getRegExp(splitSearchText.join(''), {
    fuzzy: true,
    ignoreCase: false,
    ignoreSpace: true,
    global: true,
  })

  const { data, isLoading } = useQuery(
    ['getDieaseApi', splitSearchText],
    () =>
      getSearchData(splitSearchText, setCount).then((res) => {
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
      enabled: splitSearchText.length > 0,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      cacheTime: 5 * 10 * 1000,
      staleTime: 5 * 10 * 1000,
      onSuccess: () => {
        // eslint-disable-next-line no-console
        console.log('총 api 호출 횟수: ', count)
      },
    }
  )

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

  if (searchText) {
    return (
      <section className={styles.resultContainer}>
        <Contents searchText={searchText} isLoading={isLoading} diseaseItems={diseaseItems} />
      </section>
    )
  }

  return <div />
}

export default Result
