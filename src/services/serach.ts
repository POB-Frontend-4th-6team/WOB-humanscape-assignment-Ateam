import { ResponseTpye, ParamsType } from '../types/project.d'
import axios from 'axios'

export const getSerachData = (params: ParamsType) => {
  return axios.get<ResponseTpye>(`${process.env.REACT_APP_BASE_URL}?ServiceKey=${process.env.REACT_APP_API_KEY}`, {
    params: {
      pageNo: params.pageNo,
      numOfRows: 10,
      sickType: 1,
      medTp: 2,
      diseaseType: 'SICK_NM',
      searchText: params.serachText,
    },
  })
}
