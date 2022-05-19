export interface ParamsType {
  serachText: string | undefined
  pageNo: number
}

export interface ResponseItemTpye {
  sickCd: string
  sickNm: string | undefined
}

export interface ResponseItemsType {
  item: ResponseItemTpye[]
}

export interface ResponseBodyType {
  items: ResponseItemsTpye
  numOfRows: number
  pageNo: number
  totalCount: number
}

export interface ResponseHeaderType {
  resultCode: number
  resultMsg: string
}

export interface ResponseTpye {
  response: {
    body: ResponseBodyType
    header: ResponseHeaderType
  }
}
