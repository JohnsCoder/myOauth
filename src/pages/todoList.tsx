import styles from "../styles/pages/todoList.module.css";
import Header from "../components/header";
import Cards from "../components/cards";
import { useContext, useEffect } from "react";
import { TodosContext } from "../contexts/todosContexts";
import AuthWindow from "../components/authWindow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function TodoList() {
  const { handleData, nick, todoList, postTodo, values, isAuthed, logout } =
    useContext(TodosContext);
  useEffect;
  return (
    <>
      <Header />
      <div className={styles.logout} onClick={logout}>
        <FontAwesomeIcon  icon={faArrowRightFromBracket} />
      </div>
      <div className={styles.toDo}>
        <h1>Hello, {nick}.</h1>
        <div className={styles.inputToDo}>
          <input
            type="text"
            placeholder="What do?..."
            onChange={(e) => handleData(e)}
            onKeyDown={postTodo}
            value={values}
          />
        </div>

        <hr />
        {todoList.map((e, y) => (
          <Cards key={y} content={e as { idTodos: number; todos: string }} />
        ))}
      </div>

      <AuthWindow display={isAuthed} />
    </>
  );
}

export default TodoList;
