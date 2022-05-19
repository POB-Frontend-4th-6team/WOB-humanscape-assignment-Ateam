import { atom } from 'recoil'
import { ResponseItemTpye } from 'types/project'

export const SerachState = atom<string | undefined>({
  key: 'serachState',
  default: '',
})

export const SerachResultState = atom<ResponseItemTpye[]>({
  key: 'serachResultState',
  default: [{ sickCd: '123', sickNm: 'serachState' }],
})
