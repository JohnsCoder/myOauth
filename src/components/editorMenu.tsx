import { Editor, FloatingMenu } from "@tiptap/react";
import styles from "../styles/components/floatingMenu.module.css";

type props = {
  editor: Editor;
  appendTo: string;
};

export default ({ editor, appendTo }: props) => (
  <FloatingMenu
    tippyOptions={{
      appendTo: document.querySelector(appendTo)!,
    }}
    editor={editor}
    className={styles["editor-menu"]}
  >
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
    >
      Título 2
    </button>
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
    >
      Título 3
    </button>
    <button
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      className={editor.isActive("bulletList") ? "is-active" : ""}
    >
      Lista Pontuada
    </button>
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={editor.isActive("bold") ? "is-active" : ""}
    >
      Negrito
    </button>
  </FloatingMenu>
);
