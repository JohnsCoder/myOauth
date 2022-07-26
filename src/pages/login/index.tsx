import { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import { LoginContext } from "../../contexts/loginContexts";
import styles from "../../styles/pages/login.module.css";
function Login() {
  const { handleData, login } = useContext(LoginContext);
  return (
    <>
      <Header />
      <div className={styles.login}>
        <form className={styles.formLogin}>
          <h1>Login</h1>
          <div>
            <label htmlFor="email">Email:</label>
            <input onChange={(e) => handleData(e)} type="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              onChange={(e) => handleData(e)}
              type="password"
              name="password"
            />
          </div>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            >
              Logar
            </button>
            <div>
              <Link to="/register">registrar</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
