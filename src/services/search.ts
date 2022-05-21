import axios from 'axios'

const URL = `${process.env.REACT_APP_BASE_URL}`

export const getSerachData = (splitSearchText: string[]) => {
  const requests = splitSearchText.map((word: string) => {
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

// export const getSerachData = (params: IDiseaseParams) => {
//   return axios.get<IDiseaseResponse>(URL, {
//     params: {
//       ...params,
//       ServiceKey: process.env.REACT_APP_API_KEY,
//       pageNo: 1,
//       numOfRows: 10,
//       sickType: 1,
//       medTp: 2,
//       diseaseType: 'SICK_NM',
//       _type: 'json',
//     },
//   })
// }
