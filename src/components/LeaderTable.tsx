import styles from '../styles/components/LeaderTable.module.css';
import { IUser } from '../types/User';
import { get } from '../utils/api';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';

export function LeaderTable() {
  async function find() {
    const user: IUser[] = await get('/api/find')
      .then(res => res.data)
      .catch(error => error)
    setUsers(user)
  }
  useEffect(() => {
    find()
  },[])
  const [users, setUsers] = useState<IUser[]>()
  return (
    <div className={styles.container}>
      <h1>LeaderBoard</h1>
      <table>
        <tr>
            <th>Posição</th>
            <th>Usuário</th>
            <th>Desafios</th>
            <th>Experiência</th>
        </tr>

        {users && users.map( (user, index) =>(
          <tr>
              <td>{index +1 }</td>
              <td>
                <div className={styles.user}>
                    <div>
                      <img src={user.image} alt={user.name}/>

                    </div>
                    <div>
                      <h4>{user.name}</h4>
                      <div>
                        <img src="/icons/level.svg" alt="level"/>
                        Level {user.level}
                      </div>
                    </div>
                </div>
              </td>
              <td><span>{user.challenges}</span> completados </td>
              <td><span>{user.experience}</span> xp </td>
            </tr>
        ))}
        
      </table>
        { !users && 
         <Loader /> 
        }
    </div>
  )
}