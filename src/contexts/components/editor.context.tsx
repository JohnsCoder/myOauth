import Placeholder from "@tiptap/extension-placeholder";
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { ReactNode, createContext, useContext, useState } from "react";
import styles from "../../styles/pages/editor.module.css";
import { TodoContext } from "./todo.context";

interface EditorInterface {
  handleCreateTiptap: (e: string) => void;
  handleEditTipTap: (e: string) => void;
  tipTapEditStyle: TipTapStyle;
  tipTapCreateStyle: TipTapStyle;
  openEditor: (id: string | void) => void;
  checkFocus: (event: Event) => void;
  closeEditor: (type: "edit" | "create") => void;
  createTipTap: Editor | null;
  editTipTap: Editor | null;
  tiptapCreateInputContent: string;
  tiptapEditInputContent: string;
}

type TipTapStyle = {
  editorDisplay: React.CSSProperties["display"];
  inputPlaceHolder?: "Título..." | "Escrever nota...";
};

type TipTapProps = {
  default: TipTapStyle;
  open: TipTapStyle;
};

type Todo = {
  id: string;
  content: string;
};

export const EditorContext = createContext({} as EditorInterface);

function EditorProvider({ children }: { children: ReactNode }) {
  const tipTapCreateProps: TipTapProps = {
    default: {
      editorDisplay: "none",
      inputPlaceHolder: "Escrever nota...",
    },
    open: {
      editorDisplay: "flex",
      inputPlaceHolder: "Título...",
    },
  };

  const tipTapEditProps: TipTapProps = {
    default: {
      editorDisplay: "none",
    },
    open: {
      editorDisplay: "block",
    },
  };

  const { postTodo, todoRepository, editTodo } = useContext(TodoContext);

  const [editorHTMLContent, setHTMLEditorContent] = useState<string>("");
  const [editorTextContent, setTextEditorContent] = useState<string>("");
  const [tiptapCreateInputContent, setTiptapCreateInputContent] =
    useState<string>("");
  const [tiptapEditInputContent, setTiptapEditInputContent] =
    useState<string>("");

  const [test, setTest] = useState<string>();
  const [tipTapCreateStyle, setTipTapCreateStyle] = useState<TipTapStyle>(
    tipTapCreateProps.default
  );
  const [tipTapEditStyle, setTipTapEditStyle] = useState<TipTapStyle>(
    tipTapEditProps.default
  );

  const createTipTap = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({
        showOnlyWhenEditable: false,
        emptyEditorClass: styles["is-editor-empty"],
        placeholder: "Escrever nota...",
      }),
    ],
    onBlur(props) {
      setTextEditorContent(props.editor.getText());
      setHTMLEditorContent(props.editor.getHTML());
    },

    editorProps: {
      attributes: {
        class: styles.ProseMirror,
      },
    },
  });

  const editTipTap = useEditor({
    content: test,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({
        showOnlyWhenEditable: false,
        emptyEditorClass: styles["is-editor-empty"],
        placeholder: "Escrever nota...",
      }),
    ],
    onBlur(props) {
      setTextEditorContent(props.editor.getText());
      setHTMLEditorContent(props.editor.getHTML());
    },

    editorProps: {
      attributes: {
        class: styles.ProseMirror,
      },
    },
  });

  function handleCreateTiptap(e: string) {
    setTiptapCreateInputContent(e);
  }
  function handleEditTipTap(e: string) {
    setTiptapEditInputContent(e);
  }

  const [idTodo, setIdTodo] = useState<string>();
  function openEditor(id: string | void) {
    if (id) {
      setIdTodo(id);
      setTipTapEditStyle(tipTapEditProps.open);
      const fields = todoRepository
        ?.filter((e) => e.id === id)[0]
        .content.split("<h1/>");
      const header = fields![0].split("<h1>")[1];
      const content = fields![1];

      setTiptapEditInputContent(header);
      editTipTap?.commands.setContent(content);
      return;
    }
    setTipTapCreateStyle(tipTapCreateProps.open);
  }

  function closeEditor(type: string) {
    if (type === "edit") {
      setTipTapEditStyle(tipTapEditProps.default);
      if (tiptapEditInputContent || editorTextContent.trim()) {
        editTodo(
          idTodo!,
          `<h1>${tiptapEditInputContent}<h1/>${editTipTap?.getHTML()}`
        );
      }
      editTipTap?.commands.clearContent();
      setTextEditorContent("");
      setHTMLEditorContent("");
      setTiptapCreateInputContent("");
      return;
    }
    if (!(tipTapCreateStyle.editorDisplay === "none")) {
      setTipTapCreateStyle(tipTapCreateProps.default);
      if (tiptapCreateInputContent || editorTextContent.trim()) {
        postTodo(`<h1>${tiptapCreateInputContent}<h1/>${editorHTMLContent}`);
      }
      createTipTap?.commands.clearContent();
      setTextEditorContent("");
      setHTMLEditorContent("");
      setTiptapCreateInputContent("");
    }
  }

  function checkFocus(event: Event) {
    let element = event.target as Element;
    while (
      element?.id !== ("tiptap-create-window" as string) &&
      element?.id !== ("root" as string)
    ) {
      if (!element.parentElement) {
        return;
      }
      element = element.parentElement!;
    }
    if (element.id === "root") {
      closeEditor("create");
      return;
    }
  }

  return (
    <EditorContext.Provider
      value={{
        handleCreateTiptap,
        openEditor,
        closeEditor,
        checkFocus,
        tipTapCreateStyle,
        tipTapEditStyle,
        createTipTap,
        editTipTap,
        tiptapCreateInputContent,
        tiptapEditInputContent,
        handleEditTipTap
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export default EditorProvider;
