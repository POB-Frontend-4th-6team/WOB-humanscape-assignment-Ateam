export interface IDiseaseParams {
  splitSearchText: string[]
}

export interface IDiseaseItem {
  sickCd: string
  sickNm: string
}

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
