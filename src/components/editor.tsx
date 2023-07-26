import { EditorContent } from "@tiptap/react";
import { useContext } from "react";
import { EditorContext } from "../contexts/components/editor.context";
import styles from "../styles/pages/editor.module.css";
import EditorMenu from "./editorMenu";

type props = {
  type: "create" | "edit";
};

export default function TodoEditor({ type }: props) {
  const {
    openEditor,
    tipTapCreateStyle,
    tipTapEditStyle,
    closeEditor,
    handleCreateTiptap,
    handleEditTipTap,
    createTipTap,
    editTipTap,
    tiptapCreateInputContent,
    tiptapEditInputContent,
  } = useContext(EditorContext);

  if (type === "create") {
    return (
      <>
        {createTipTap && (
          <EditorMenu
            editor={createTipTap}
            appendTo={"#tiptap-create-wrapper"}
          />
        )}
        <div
          className={styles["tiptap-create-window"]}
          id="tiptap-create-window"
          onClickCapture={() => {
            openEditor();
          }}
        >
          <input
            type="text"
            className={styles["tiptap-create-header"]}
            placeholder={tipTapCreateStyle.inputPlaceHolder}
            value={tiptapCreateInputContent}
            onChange={(event) => handleCreateTiptap(event.target.value)}
          />

          <EditorContent
            editor={createTipTap}
            className={styles["tiptap-create-wrapper"]}
            id="tiptap-create-wrapper"
            style={{
              display: tipTapCreateStyle.editorDisplay,
            }}
          >
            <button
              className={styles.close}
              onClick={() => {
                closeEditor("create");
              }}
            >
              Close
            </button>
          </EditorContent>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className={styles["transparent-wall"]}
          style={{
            display: tipTapEditStyle.editorDisplay,
          }}
          onClick={() => {
            closeEditor("edit");
          }}
        ></div>
        {editTipTap && (
          <EditorMenu editor={editTipTap} appendTo={"#tiptap-edit-wrapper"} />
        )}
        <div
          className={styles["tiptap-edit-window"]}
          id="tiptap-edit-window"
          style={{
            display: tipTapEditStyle.editorDisplay,
          }}
          onClickCapture={() => {
            openEditor();
          }}
        >
          <input
            type="text"
            className={styles["tiptap-edit-header"]}
            placeholder="Title..."
            value={tiptapEditInputContent}
            onChange={(event) => handleEditTipTap(event.target.value)}
          />

          <EditorContent
            editor={editTipTap}
            className={styles["tiptap-edit-wrapper"]}
            id="tiptap-edit-wrapper"
          >
            <button
              className={styles.close}
              onClick={() => {
                closeEditor("edit");
              }}
            >
              Close
            </button>
          </EditorContent>
        </div>
      </>
    );
  }
}
