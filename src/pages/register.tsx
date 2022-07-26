import Header from "../components/header";
import styles from "../styles/pages/register.module.css";
import { RegisterContext } from "../contexts/registerContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Register() {
  const { handleData, register } = useContext(RegisterContext);
  return (
    <>
      <Header />
      <Link to="/login">
        <button>{"<==="}</button>
      </Link>
      <div className={styles.register}>
        <form className={styles.formRegister}>
          <h1>Register</h1>
          <div>
            <label htmlFor="nickname">Nickname:</label>
            <input
              onChange={(e) => handleData(e)}
              type="nickname"
              name="nickname"
            />
          </div>
          <div>
            <label htmlFor="phonenumber">Phone Number:</label>
            <input
              onChange={(e) => handleData(e)}
              type="phonenumber"
              name="phonenumber"
            />
          </div>
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
                register();
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Register;
