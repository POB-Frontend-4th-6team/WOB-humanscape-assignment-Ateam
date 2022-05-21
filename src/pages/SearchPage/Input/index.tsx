import { ChangeEvent, FormEvent, KeyboardEvent, useMemo } from 'react'
import { debounce } from 'lodash'

import { useAppDispatch, useAppSelector, useCallback, useEffect, useState } from 'hooks'
import { getDiseaseItems, setSearchText, setSplitSearchText } from 'states/disease'
import { getMoveNum, setDecrease, setIncrease, setReset } from 'states/move'

import styles from './Input.module.scss'
import { SearchIcon } from 'assets/svgs'

const Input = () => {
  const [disease, setDisease] = useState<string | undefined>('')
  const [isMoveOn, setIsMoveOn] = useState(false)

  const diseaseItems = useAppSelector(getDiseaseItems)
  const moveNum = useAppSelector(getMoveNum)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (diseaseItems.length === 0) return
    if (isMoveOn) setDisease(diseaseItems[moveNum].sickNm)
  }, [moveNum, diseaseItems, isMoveOn])

  const changeTextToArray = (text: string) => text.split('').filter((word: string) => word !== ' ')

  const debounceFunc = useMemo(
    () =>
      debounce((value) => {
        const textArray = changeTextToArray(value)
        dispatch(setSearchText(value))
        dispatch(setSplitSearchText(textArray))
      }, 700),
    [dispatch]
  )

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDisease(e.currentTarget.value)
      if (isMoveOn) return
      debounceFunc(e.currentTarget.value)
      dispatch(setReset())
    },
    [debounceFunc, setDisease, isMoveOn, dispatch]
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    setIsMoveOn(false)
    if (diseaseItems.length === 0 || e.nativeEvent.isComposing) return
    if (e.key === 'ArrowUp' && moveNum) {
      dispatch(setDecrease())
      setIsMoveOn(true)
    } else if (e.key === 'ArrowDown' && moveNum < Number(diseaseItems.length) - 1) {
      dispatch(setIncrease())
      setIsMoveOn(true)
    }
  }

  return (
    <section>
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
