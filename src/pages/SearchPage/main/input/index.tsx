import { SearchIcon } from 'assets/svgs'
import { ChangeEvent, FormEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { useAppDispatch, useAppSelector } from 'hooks'
import { getDiseaseItems, setSearchText } from 'states/disease'

import styles from './input.module.scss'
import { getMoveNum, setDecrease, setIncrease, setReset } from 'states/move'

const Input = () => {
  const diseaseItems = useAppSelector(getDiseaseItems)
  const moveNum = useAppSelector(getMoveNum)

  const [disease, setDisease] = useState<string | undefined>('')
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
