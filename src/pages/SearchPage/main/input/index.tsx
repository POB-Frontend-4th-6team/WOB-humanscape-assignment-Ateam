import { SearchIcon } from 'assets/svgs'
import { ChangeEvent, FormEvent, KeyboardEvent, useCallback } from 'react'
import { debounce } from 'lodash'
import { useAppDispatch } from 'hooks'
import { setSearchText } from 'states/disease'

import styles from './input.module.scss'

const Input = () => {
  // const [moveNum, setMoveNum] = useState(0)

  const dispatch = useAppDispatch()

  const debounceFunc = debounce((value) => {
    const searchTextToArray = value.split('')
    const arrayWithNoEmptyString = searchTextToArray.filter((word: string) => word != ' ')
    dispatch(setSearchText(arrayWithNoEmptyString))
  }, 1000)

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      debounceFunc(e.currentTarget.value)
    },
    [debounceFunc]
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {}
  // e.preventDefault()
  // 키보드로 검색어 이동
  // const moveCells = (direction: string) => {
  //   if (!targetItem) return // 이거 안쓰면 조건문 에러
  //   if (direction === 'up' && moveNum) setMoveNum((prev) => prev - 1)
  //   else if (direction === 'down' && moveNum < Number(targetItem?.length) - 1) setMoveNum((prev) => prev + 1)
  // }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // if (!serachResultState) return
    // if (e.key === 'ArrowUp') moveCells('up')
    // else if (e.key === 'ArrowDown') moveCells('down')
  }

  // useEffect(() => {
  //   if (!targetItem) return
  //   setSerachState(targetItem[moveNum].sickNm)
  // }, [moveNum, setSerachState, targetItem])

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
        />
        <button type='button' className={styles.btn}>
          검색
        </button>
      </form>
      {/* {serachState && <div className={styles.resultBox}>{serachResultState && <Result />}</div>} */}
    </section>
  )
}

export default Input
