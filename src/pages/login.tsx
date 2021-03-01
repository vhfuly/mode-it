import styles from '../styles/pages/Login.module.css';

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
            <input type="text" placeholder="Digite seu username"/>
            <button> -> </button>
        </div>
      </div>
    </div>
  )
}

export default Login;