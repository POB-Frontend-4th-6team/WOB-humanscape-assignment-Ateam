import { SerachIcon } from 'assets/svgs'
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { getSerachData } from 'services/serach'
import { SerachResultState, SerachState } from 'states/state'
import Result from '../result'
import styles from './input.module.scss'

const Input = () => {
  const [serachState, setSerachState] = useRecoilState(SerachState)
  const [serachResultState, SetSerachResultState] = useRecoilState(SerachResultState)

  const [moveNum, setMoveNum] = useState<number>(0)

  const targetItem = serachResultState

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setSerachState(value)
  }

  // onChange에 getSerachData로직을 넣어야함 지금은 너무 느려서 일단 submit에 넣어둠
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    SetSerachResultState([{ sickCd: '123', sickNm: serachState }])
    getSerachData({ serachText: serachState, pageNo: 1 }).then((result) => {
      try {
        if (!serachResultState) return
        SetSerachResultState((prev) => [...prev, ...result.data.response.body.items.item])
      } catch (err) {
        throw new Error()
      }
    })
  }

  const moveCells = (direction: string) => {
    if (!targetItem) return // 이거 안쓰면 조건문 에러
    if (direction === 'up' && moveNum) setMoveNum((prev) => prev - 1)
    else if (direction === 'down' && moveNum < Number(targetItem?.length) - 1) setMoveNum((prev) => prev + 1)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!serachResultState) return
    if (e.key === 'ArrowUp') moveCells('up')
    else if (e.key === 'ArrowDown') moveCells('down')
  }

  useEffect(() => {
    if (!targetItem) return
    setSerachState(targetItem[moveNum].sickNm)
  }, [moveNum, targetItem, setSerachState])

  return (
    <>
      <form className={styles.inputBox} onSubmit={onSubmit}>
        <div className={styles.iconBox}>
          <SerachIcon width='20px' height='20px' />
        </div>
        <input
          placeholder='질환명을 입력해 주세요.'
          type='text'
          className={styles.input}
          value={serachState}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <button type='button' className={styles.btn}>
          검색
        </button>
      </form>
      {serachState && <div className={styles.resultBox}>{serachResultState && <Result />}</div>}
    </>
  )
}

export default Input
