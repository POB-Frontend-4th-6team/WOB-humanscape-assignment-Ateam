import { useAppSelector } from 'hooks'
import { getMoveNum } from 'states/move'
import { IDiseaseItem } from 'types/disease'

import styles from './result.module.scss'
import { SearchIcon } from 'assets/svgs'
import { cx } from 'styles'

interface Props {
  diseaseItems: IDiseaseItem[]
  searchText: string
}

const List = ({ diseaseItems, searchText }: Props) => {
  const moveNum = useAppSelector(getMoveNum)

  const diseaseItem = (list: IDiseaseItem) => {
    let nowIndex = 0
    return (
      <p className={styles.title}>
        {list.sickNm.split('').map((w) => {
          if (nowIndex < searchText.length && w === searchText[nowIndex]) {
            nowIndex += 1
            return <mark key={`bold-key-${nowIndex}`}>{w}</mark>
          }
          return w
        })}
      </p>
    )
  }

  return (
    <>
      {diseaseItems.map((li: IDiseaseItem, i) => (
        <li className={cx(styles.item, { [styles.selectedMoveNum]: moveNum === i })} key={`sickcd-key-${li.sickCd}`}>
          <div className={styles.iconBox}>
            <SearchIcon width='20px' height='20px' />
          </div>
          {diseaseItem(li)}
          {diseaseItems[0] === li && <p className={styles.nowSearch}> - 현재 검색어</p>}
        </li>
      ))}
    </>
  )
}

export default List