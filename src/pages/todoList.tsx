import styles from "../styles/pages/todoList.module.css";
import Header from "../components/header";
import Cards from "../components/cards";
import { useContext, useEffect } from "react";
import { TodosContext } from "../contexts/todosContexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function TodoList() {
  const { handleData, nick, todoList, postTodo, values, logout } =
    useContext(TodosContext);
  useEffect;

  return (
    <>
      <Header />
      <div className={styles.logout} onClick={logout}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </div>
      <div className={styles.toDo}>
        <h1>Hello, {nick}.</h1>
        <div className={styles.inputToDo}>
          <input
            type="text"
            placeholder="What do?..."
            onChange={handleData}
            onKeyDown={postTodo}
            value={values}
          />
        </div>

        <hr />
        {todoList.length === 0 ? (
          <div>
            <h1>No notes found...</h1>
          </div>
        ) : (
          todoList.map((e, y) => (
            <Cards key={y} content={e as { idTodos: number; todos: string }} />
          ))
        )}
      </div>
    </>
  );
}

export default TodoList;
