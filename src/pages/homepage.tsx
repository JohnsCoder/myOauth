import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import TodoEditor from "../components/editor";
import Header from "../components/header";
import TodoList from "../components/todoList";
import { EditorContext } from "../contexts/components/editor.context";
import { HomepageContext } from "../contexts/homepageContext";
import styles from "../styles/pages/homepage.module.css";
import skeleton from "../styles/components/skeleton.module.css";

function Homepage() {
  const { nick, logout } = useContext(HomepageContext);
  const { checkFocus } = useContext(EditorContext);

  document.onclick = (event) => checkFocus(event);
  return (
    <>
      <Header />
      <header className={styles.todo_header}>
        {(nick && <h1>Hello, {nick}.</h1>) || (
          <div
            className={`${skeleton["skeleton"]} ${skeleton["skeleton-text"]}`}
          ></div>
        )}
        <div className={styles.logout} onClick={logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </div>
      </header>
      <TodoEditor type="create" />
      <TodoList />
      <TodoEditor type="edit" />
    </>
  );
}

export default Homepage;
