import { createContext, useState, ReactNode, useEffect } from 'react';

import { get } from '../utils/api';
import challenges from '../../challenges.json';
import { LevelUPModal } from '../components/LevelUpModal';
import { IUser } from '../types/User';

interface ChallengesProviderProps {
  children: ReactNode;
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  image: string;
  name: string;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData)
 
export function ChallengesProvider({ 
  children,
  ...rest
}: ChallengesProviderProps) {

  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [experience, setExperience] = useState(rest.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false)
  const [image, setImage] = useState('')
  const [name, setName] = useState('')

  function levelUp() {
    setLevel(level + 1);
    setIsLevelModalOpen(true)
  }

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])
  
  async function getData() {
    const user: IUser = await get('/api/data')
    .then(res => res.data)
    .catch(error => error)
    setImage(user.image);
    setName(user.name);
    setLevel(user.level);
    setChallengesCompleted(user.challenges);
    setCurrentExperience(user.currentExperience);
    setExperience(user.experience);
  }

  useEffect(() => {
    getData()
  },[image, name, level, challengesCompleted, currentExperience, experience])

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio ⚡', {
        body: `Valendo ${challenge.amount}xp!`,
        icon: '/favicon.png'
      })
      
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function closeLevelUpModal() {
    setIsLevelModalOpen(false)
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      challengesCompleted,
      activeChallenge,
      experienceToNextLevel,
      image,
      name,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completeChallenge,
      closeLevelUpModal
    }}>
      {children}
      {isLevelModalOpen && <LevelUPModal />}
    </ChallengesContext.Provider>
  )
}