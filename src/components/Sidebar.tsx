import Link from 'next/link';
import styles from '../styles/components/SideBar.module.css';
import { useState } from 'react';

interface SideBarProps {
  home: boolean;
  award: boolean;
}

export function SideBar(props: SideBarProps) {
  const home = props.home ? styles.active : styles.inactive;
  const award = props.award  ? styles.active : styles.inactive;
   
  return (
    <div className={styles.container}>
      <div>
        <Link href="/"><img src="icons/icon-side.svg" alt="icon"/></Link>
      </div>
      <div>
      <Link href="/"><img src="icons/home.svg" alt="home" className={home} /></Link>
      <Link href="/leader-board"><img src="icons/award.svg" alt="award" className={award}/></Link>
      </div>
    </div>
  )
}