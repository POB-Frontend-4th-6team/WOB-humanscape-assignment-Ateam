import { IDiseaseResponse, IDiseaseParams } from 'types/disease.d'
import axios from 'axios'

export const getSerachData = (params: IDiseaseParams) => {
  const FIRST_URL = `${process.env.REACT_APP_BASE_URL}?ServiceKey=${process.env.REACT_APP_API_KEY}&pageNo=1&numOfRows=200&searchText=`
  const LAST_URL = '&diseaseType=SICK_NM&sickType=1'

  const searchValueArray: any = params
  const requests = searchValueArray.map((word: string) => {
    return axios.get(FIRST_URL + word + LAST_URL)
  })

  return axios.all<IDiseaseResponse>(requests).then(
    axios.spread((...responses) => {
      return responses
    })
  )
}
