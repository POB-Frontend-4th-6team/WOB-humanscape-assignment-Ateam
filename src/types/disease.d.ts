export interface IDiseaseParams {
  searchText: any
}

export interface IDiseaseItem {
  sickCd: string
  sickNm: string | undefined
}

// 원래 주석
export interface IDiseaseItems {
  item: IDiseaseItem[]
}

export interface IBody {
  items: { item: IDiseaseItem[] }
  numOfRows: number
  pageNo: number
  totalCount: number
}

export interface IHeader {
  resultCode: number
  resultMsg: string
}

export interface IDiseaseResponse {
  response: {
    body: IBody
    header: IHeader
  }
}
