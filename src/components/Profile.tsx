import styles from '../styles/components/Profile.module.css';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

export function Profile() {
  const { level, image, name} = useContext(ChallengesContext)
  return (
    <div className={styles.profileContainer}>
      <img src={image} alt="Victor" />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}