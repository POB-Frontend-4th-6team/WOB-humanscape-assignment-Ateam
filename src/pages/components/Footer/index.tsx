import { FooterIcon } from 'assets/svgs'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.subFooter}>
        <div className={styles.container}>
          <h2>새로운 임상시험 등록되면 문자로 알려드려요</h2>
          <button type='button'>임상시험 소식받기</button>
          <div className={styles.icon}>
            <FooterIcon />
          </div>
        </div>
      </div>
      <div className={styles.footerInfo}>
        <div className={styles.container}>
          <div className={styles.footerLeft}>
            <h2>(주)휴먼스케이프</h2>
            <address>
              <p>서울특별시 강남구 봉은사로86길 6, 레베쌍트빌딩 601호 | 대표자: 장민후</p>
              <p>© 2021 Humanscape, All rights reserved.</p>
            </address>
            <img
              src='https://clinicaltrialskorea.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkids.00b60645.png&w=256&q=75'
              alt='한국의학품안전관리원'
            />
          </div>
          <div className={styles.footerRight}>
            <span>개인정보처리방침</span>
            <p>Living healthier by connecting better</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
