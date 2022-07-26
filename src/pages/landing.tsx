import { Link } from "react-router-dom";
import Header from "../components/header";
import styles from '../styles/pages/landing.module.css'
function Landing() {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <Link to="/login">
          <button>To Login</button>
        </Link>
      </div>
    </>
  );
}
export default Landing;
