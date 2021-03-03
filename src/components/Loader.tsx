import styles from '../styles/components/Loader.module.css';

export function Loader() {
  return (
    <div className={styles.container}>

    <div className={styles.loader}></div>
    </div>
  )
}