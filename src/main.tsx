import * as React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import { UndoRedoTreeStateType, UndoRedoTreeType } from "./types";
import { insertNodeToTree, findParentNode } from "./helper";

const TreeView = ({ treeState }: { treeState: UndoRedoTreeStateType }) => {
  return <div>{JSON.stringify(treeState)}</div>;
};

const undoRedoTree: UndoRedoTreeStateType = {
  currentNode: { id: 0, input: "", childrens: [], parentId: undefined },
  previousNode: { id: 0, input: "", childrens: [], parentId: undefined },
  tree: { id: 0, input: "", childrens: [], parentId: undefined },
};

const INPUT_ACTION_TYPE = "INPUT" as const;
const REDO_ACTION_TYPE = "REDO" as const;
const UNDO_ACTION_TYPE = "UNDO" as const;

type ActionType =
  | ReturnType<typeof inputAction>
  | ReturnType<typeof redoAction>
  | ReturnType<typeof uddoAction>;

const inputAction = (input: string) => {
  return {
    type: INPUT_ACTION_TYPE,
    payload: input,
  };
};

const redoAction = () => {
  return {
    type: REDO_ACTION_TYPE,
  };
};

const uddoAction = () => {
  return {
    type: UNDO_ACTION_TYPE,
  };
};

function reducer(
  state: UndoRedoTreeStateType,
  action: ActionType
): UndoRedoTreeStateType {
  switch (action.type) {
    case INPUT_ACTION_TYPE:
      // currentId の childrenに UndoRedoTree を差し込み、そのidをcurrentIdにセットする
      const newId = state.currentNode.id + 1;
      const node: UndoRedoTreeType = {
        id: newId,
        input: action.payload,
        childrens: [],
        parentId: state.currentNode.id,
      };
      const treeCopy = { ...state.tree };
      // treeCopy にinsert済nodeが書き込まれる
      insertNodeToTree(treeCopy, state.currentNode.id, node);
      console.log("node", node);
      return {
        ...state,
        currentNode: node,
        previousNode: state.currentNode,
        tree: treeCopy,
      };
    case UNDO_ACTION_TYPE:
      const currentNodeParentId = findParentNode(
        state.tree,
        state.currentNode.id
      );
      return {
        ...state,
        currentNode: currentNodeParentId,
        previousNode: state.currentNode,
      };
    case REDO_ACTION_TYPE:
      return {
        ...state,
        currentNode: state.previousNode,
        previousNode: state.currentNode,
      };
    default:
      throw new Error();
  }
}

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, undoRedoTree);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("e.target.value", e.target.value);
    dispatch(inputAction(e.target.value));
  };

  const handleUserKeyPress = React.useCallback((event) => {
    const { key, keyCode } = event;

    // スペース
    if (keyCode === 32) {
      dispatch(redoAction());
    }
  }, []);

  React.useEffect(() => {
    // キーイベントの監視を登録
    // ctrl + z => undo
    // ctrl + shift + z = redo
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);

  return (
    <div>
      <textarea
        value={state.currentNode.input}
        onChange={(e) => handleInput(e)}
      ></textarea>
      <TreeView treeState={state}></TreeView>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
