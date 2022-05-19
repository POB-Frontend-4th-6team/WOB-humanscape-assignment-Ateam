import { SerachIcon } from 'assets/svgs'
import { useRecoilValue } from 'recoil'
import { SerachResultState } from 'states/state'
import styles from './result.module.scss'

const Result = () => {
  const serachResultState = useRecoilValue(SerachResultState)

  return (
    <ul className={styles.cotainer}>
      {serachResultState?.map((data) => {
        return (
          <li className={styles.item} key={`sickcd-key-${data.sickCd}`}>
            <div className={styles.iconBox}>
              <SerachIcon width='20px' height='20px' />
            </div>
            <p className={styles.t1itle}>{data.sickNm} </p>
          </li>
        )
      })}
    </ul>
  )
}

export default Result
