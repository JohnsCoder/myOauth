import { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/components/authWindow.css";

function AuthWindow({display}: {display: string}) {
  return (
    <div className="authWindow" style={{ display: display }}>
      <div>
        <span>
          It's apper that your credentials isn't authed, please login again!
        </span>
        <Link to="/login">
          <button>login</button>
        </Link>
      </div>
    </div>
  );
}

export default AuthWindow;
