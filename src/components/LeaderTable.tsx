import styles from '../styles/components/Profile.module.css';
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
      <table>
        <tr>
            <td>Posição</td>
            <td>Usuário</td>
            <td>Desafios</td>
            <td>Experiência</td>
        </tr>

        {users && users.map( (user, index) =>(
          <tr>
              <td>{index +1 }</td>
              <td>{user.name}</td>
              <td>{user.challenges}</td>
              <td>{user.experience}</td>
            </tr>
        ))}
        
      </table>
        { !users && 
         <Loader /> 
        }
    </div>
  )
}