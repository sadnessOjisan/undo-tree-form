import * as React from "react";
import ReactDOM from "react-dom";
import "./reset.css";

const TreeView = () => {
  return <div>tree</div>;
};

const INPUT_ACTION = "INPUT" as const;
const REDO = "REDO" as const;
const UNDO = "UNDO" as const;

type ActionType =
  | ReturnType<typeof inputAction>
  | ReturnType<typeof redoAction>
  | ReturnType<typeof uddoAction>;

const inputAction = (input: string) => {
  return {
    type: INPUT_ACTION,
    payload: input,
  };
};

const redoAction = (input: string) => {
  return {
    type: REDO,
  };
};

const uddoAction = (input: string) => {
  return {
    type: UNDO,
  };
};

type UndoRedoTreeType = {
  id: number;
  input: string;
  childrens: UndoRedoTreeType[];
  parentId?: number;
};

type UndoRedoTreeStateType = {
  currentId: number;
  tree: UndoRedoTreeType;
};

const undoRedoTree: UndoRedoTreeStateType = {
  currentId: 0,
  tree: { id: 0, input: "", childrens: [], parentId: undefined },
};

/**
 * 差し込まれる対象に対して探索を行い、差込Idと一致するNodeのchildrenにnodeを差し込む
 * @param tree 差込まれる対象
 * @param targetId 差込先Id
 * @param node 差し込むもの
 */
const insertNodeToTree = (
  tree: UndoRedoTreeType,
  targetId: number,
  node: UndoRedoTreeType
) => {};

function reducer(
  state: UndoRedoTreeStateType,
  action: ActionType
): UndoRedoTreeStateType {
  switch (action.type) {
    case "INPUT":
      // currentId の childrenに UndoRedoTree を差し込み、そのidをcurrentIdにセットする
      const newId = state.currentId + 1;
      const node: UndoRedoTreeType = {
        id: newId,
        input: action.payload,
        childrens: [],
        parentId: state.currentId,
      };
      const treeCopy = { ...state.tree };

      return { ...state, tree: [] };
    case "REDO":
      return { count: state.count - 1 };
    case "UNDO":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const App = () => {
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {};

  React.useEffect(() => {
    // キーイベントの監視を登録
    // ctrl + z => undo
    // ctrl + shift + z = redo
  }, []);

  return (
    <div>
      <textarea onChange={handleInput}></textarea>
      <TreeView></TreeView>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
