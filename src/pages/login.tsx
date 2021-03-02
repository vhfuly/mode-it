import styles from '../styles/pages/Login.module.css';
import axios from 'axios';
import Link from 'next/link';


function Login() {
 const client = process.env.REACT_CLIENT_ID
 console.log(client)
  return (
    <div className={styles.container}>
      <div>
        <img src="/icons/symbol.svg" alt="symbol"/>
      </div>
      <div>
        <img src="/icons/logo.svg" alt="logo"/>
        <h1>Bem-vindo</h1>
        <div>
          <img src="/icons/github.svg" alt="github"/>
          <p>Faça login com seu Github para começar</p>
        </div>
        <div className={styles.inputs}>
            <input type="text" placeholder="Digite seu username"/>
            <Link href={`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`}>
            <button> -> </button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Login;