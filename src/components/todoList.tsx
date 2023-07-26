import { Trash } from "lucide-react";
import { useContext } from "react";
import { TodoContext } from "../contexts/components/todo.context";
import styles from "../styles/components/todo.module.css";
import { EditorContext } from "../contexts/components/editor.context";

interface props {
  content: string;
  id: string;
}

function TodoList() {
  const { deleteTodo, toRenderTodos, editTodo } = useContext(TodoContext);
  const { openEditor } = useContext(EditorContext);
  const Todo = ({ content, id }: props) => (
    <div
      className={styles.card}
      id={styles.card}
      itemID={id}
      onClick={() => openEditor(id)}
    >
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <div className={styles.menu}>
        <button
          id={styles.close}
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(id);
          }}
        >
          <Trash />
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.todo}>
      {toRenderTodos?.map((columnList, idx1) => (
        <div className={styles.column} key={idx1}>
          {columnList.map((card, idx2) => (
            <Todo content={card.content} key={card.id} id={card.id} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default TodoList;
