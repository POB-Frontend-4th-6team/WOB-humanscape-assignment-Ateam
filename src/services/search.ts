import { ResponseTpye, ParamsType } from '../types/project.d'
import axios from 'axios'

export const getSerachData = (params: ParamsType) => {
  return axios.get<ResponseTpye>(`${process.env.REACT_APP_BASE_URL}`, {
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
