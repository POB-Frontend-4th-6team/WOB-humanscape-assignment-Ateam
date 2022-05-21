import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy'

const URL = `${PROXY}${process.env.REACT_APP_BASE_URL}`

export const getSearchData = (splitSearchText: string[], setCount: Dispatch<SetStateAction<number>>) => {
  const requests = splitSearchText.map((word: string) => {
    setCount((prev) => prev + 1)
    return axios.get(URL, {
      params: {
        ServiceKey: process.env.REACT_APP_API_KEY,
        searchText: word,
        pageNo: 1,
        numOfRows: 150,
        medTp: 2,
      },
    })
  })

  return axios.all(requests).then(
    axios.spread((...responses) => {
      return responses
    })
  )
}
