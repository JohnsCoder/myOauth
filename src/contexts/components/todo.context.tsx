import { AxiosRequestConfig } from "axios";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import api from "../../services/api";
import cookies from "../../services/cookies";
import { EditorContext } from "./editor.context";

interface TodoInterface {
  postTodo: (editorContent: string) => void;
  deleteTodo: (e: any) => void;
  editTodo: (id: string, content: string) => void;
  todoList: Todo[];
  todo: string;
  toRenderTodos?: Todo[][];
  columns?: Todo[][];
  todoHeader: string;
  todoRepository?: Todo[];
}

type Todo = {
  id: string;
  content: string;
};

export const TodoContext = createContext({} as TodoInterface);

function TodoProvider({ children }: { children: ReactNode }) {
  const [todo, setTodo] = useState<string>("");
  const [todoRepository, setTodoRepository] = useState<Todo[]>();
  const [toRenderTodos, settoRenderTodos] = useState<Todo[][]>();
  const [todoHeader, setTodoHeader] = useState<string>("");

  const todoColumns: Todo[][] = [];
  const [columns, setColumns] = useState<Todo[][]>([[], [], [], [], []]);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const {} = useContext(EditorContext);

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: "Bearer " + cookies.get("tokenId"),
    },
  };

  function splitColumns(todoList: Todo[]) {
    const columnsLength = Math.ceil(todoList.length / 5);
    const columns: Todo[][] = [];
    for (let i = 0; i < columnsLength; i++) {
      const start = i * 5;
      const end = start + 5;
      const nums = todoList.slice(start, end);
      columns.push(nums);
    }
    return columns;
  }

  function verticalizeColumns(rows: Todo[][]) {
    const verticalColumns: Todo[][] = [[], [], [], [], []];
    rows.forEach((row) => {
      row.forEach((todo, idx) => verticalColumns[idx].push(todo));
    });
    return verticalColumns;
  }

  function renderTodos(todos: Todo[]) {
    settoRenderTodos(verticalizeColumns(splitColumns(todos)));
  }

  async function getTodo() {
    const updatedRepository: Todo[] = (await api.get("/todo", config)).data
      .payload;
    setTodoRepository(updatedRepository);

    renderTodos(updatedRepository);
  }

  async function postTodo(editorContent: string) {
    const todoContent = {
      id: "",
      content: editorContent,
    };

    const updatedRepository = [todoContent, ...todoRepository!];
    renderTodos(updatedRepository);

    todoContent.id = (
      await api.post("/todo", { content: todoContent.content }, config)
    ).data.payload.id;

    setTodoRepository((todoRepository) => [todoContent, ...todoRepository!]);
  }

  async function editTodo(id: string, content: string) {
    const todoIndex = todoRepository?.findIndex((e) => e.id === id);
    const updatedRepository = todoRepository!.map((e) =>
      e.id === id ? { id, content } : e
    );

    renderTodos(updatedRepository);

    setTodoRepository(updatedRepository);
    await api.put(`/todo/${id}`, { content }, config);
  }

  async function deleteTodo(id: string) {
    const updatedRepository = todoRepository!.filter((y) => y.id !== id);

    renderTodos(updatedRepository);
    setTodoRepository(updatedRepository);
    await api.delete(`/todo/${id}`, config);

  }

  useMemo(async () => {
    await getTodo();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todoList,
        todo,
        postTodo,
        deleteTodo,
        toRenderTodos,
        columns,
        todoHeader,
        editTodo,
        todoRepository,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
