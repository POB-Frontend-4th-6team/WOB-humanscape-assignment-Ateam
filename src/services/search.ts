import { IDiseaseResponse } from 'types/disease.d'
import axios from 'axios'

const URL = `${process.env.REACT_APP_BASE_URL}`

export const getSerachData = (params: any) => {
  const requests = params.map((word: string) => {
    return axios.get(URL, {
      params: {
        ServiceKey: process.env.REACT_APP_API_KEY,
        searchText: word,
        pageNo: 1,
        numofRows: 150,
        sickType: 1,
        medTp: 2,
      },
    })
  })

  return axios.all<IDiseaseResponse>(requests).then(
    axios.spread((...responses) => {
      return responses
    })
  )
}
