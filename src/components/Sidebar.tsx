import styles from '../styles/components/SideBar.module.css';

export function SideBar() {
  return (
    <div className={styles.container}>
      <div>
        <img src="icons/icon-side.svg" alt="icon"/>
      </div>
      <div>
      <img src="icons/home.svg" alt="home"/>
      <img src="icons/award.svg" alt="award"/>
      </div>
    </div>
  )
}