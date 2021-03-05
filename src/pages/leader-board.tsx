import { SideBar } from "../components/Sidebar";
import styles from '../styles/pages/Home.module.css';
import { LeaderTable } from "../components/LeaderTable";

function LeaderBoard() {
  return (
    <div className={styles.overlay}>
        <SideBar
        home = {false}
        award = {true}
        />
        <h1>LeaderBoard</h1>

        <LeaderTable />
    </div>
  )
}

export default LeaderBoard;