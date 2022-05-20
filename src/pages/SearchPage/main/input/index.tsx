import { SearchIcon } from 'assets/svgs'
import { ChangeEvent, FormEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { useAppDispatch, useAppSelector } from 'hooks'
import { getDiseaseItems, setSearchText } from 'states/disease'

import styles from './input.module.scss'

const Input = () => {
  const diseaseItems = useAppSelector(getDiseaseItems)

  const [disease, setDisease] = useState<string | undefined>('')
  const [moveNum, setMoveNum] = useState(0)
  const [isMoveOn, setIsMoveOn] = useState(false)

  const dispatch = useAppDispatch()

  const debounceFunc = debounce((value) => {
    dispatch(setSearchText(value))
  }, 500)

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDisease(e.currentTarget.value)
      if (isMoveOn) return
      debounceFunc(e.currentTarget.value)
      setMoveNum(0)
    },
    [debounceFunc, setDisease, isMoveOn]
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    setIsMoveOn(false) // 위 아래 이벤트 발생하지 않고 다른 keydown이벤트 발생시 IsMoveOn변경시켜 다시 api통신
    if (diseaseItems.length === 0) return
    if (e.key === 'ArrowUp' && moveNum) {
      setMoveNum((prev) => prev - 1)
      setIsMoveOn(true)
    } else if (e.key === 'ArrowDown' && moveNum < Number(diseaseItems.length) - 1) {
      setMoveNum((prev) => prev + 1)
      setIsMoveOn(true)
    }
  }

  useEffect(() => {
    if (diseaseItems.length === 0) return
    if (isMoveOn) setDisease(diseaseItems[moveNum].sickNm)
  }, [moveNum, diseaseItems, isMoveOn])

  return (
    <section className={styles.section2}>
      <form className={styles.inputBox} onSubmit={handleSubmit}>
        <div className={styles.iconBox}>
          <SearchIcon width='20px' height='20px' />
        </div>
        <input
          placeholder='질환명을 입력해 주세요.'
          type='text'
          className={styles.input}
          onChange={handleSearch}
          onKeyDown={onKeyDown}
          value={disease}
        />
        <button type='button' className={styles.btn}>
          검색
        </button>
      </form>
    </section>
  )
}

export default Input
