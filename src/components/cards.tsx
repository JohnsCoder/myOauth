import styles from "../styles/components/cards.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContexts";


interface props {
  content: {
    todos: string;
    idTodos: number;
  };
}
function Cards(props: props) {
  const { deleteTodo } = useContext(TodosContext);
  return (
    <div className={styles.cards}>
      <span>{props.content.todos}</span>
      <FontAwesomeIcon icon={faXmark} onClick={() => deleteTodo(props.content.idTodos)} />
    </div>
  );
}

export default Cards;
