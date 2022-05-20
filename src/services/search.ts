import { IDiseaseResponse, IDiseaseParams } from 'types/disease.d'
import axios from 'axios'

export const getSerachData = (params: IDiseaseParams) => {
  return axios.get<IDiseaseResponse>(`${process.env.REACT_APP_BASE_URL}`, {
    params: {
      ...params,
      ServiceKey: process.env.REACT_APP_API_KEY,
      pageNo: 1,
      numOfRows: 10,
      sickType: 1,
      medTp: 2,
      diseaseType: 'SICK_NM',
      _type: 'json',
    },
  })
}
