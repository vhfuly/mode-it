import styles from '../styles/components/Login.module.css';
import { signIn } from 'next-auth/client'

function Login() {
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
            <input type="text" placeholder="Login" disabled/>
            <button onClick={() => signIn('github')}> -&gt; </button>
        </div>
      </div>
    </div>
  )
}

export default Login;