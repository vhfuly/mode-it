import { SideBar } from "../components/Sidebar";
import styles from '../styles/pages/Home.module.css';

function LeaderBoard() {
  return (
    <div className={styles.overlay}>
        <SideBar
        home = {false}
        award = {true}
        />
        <h1>LeaderBoard</h1>
      </div>
  )
}

export default LeaderBoard;