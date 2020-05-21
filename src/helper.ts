import { UndoRedoTreeType } from "./types";

/**
 * 差し込まれる対象に対して探索を行い、差込Idと一致するNodeのchildrenにnodeを差し込む
 * @param tree 差込まれる対象
 * @param targetId 差込先Id
 * @param node 差し込むもの
 */
export const insertNodeToTree = (
  tree: UndoRedoTreeType,
  targetId: number,
  node: UndoRedoTreeType
) => {
  const stack: UndoRedoTreeType[] = [];
  stack.push(tree);
  while (stack.length > 0) {
    const targetNode = stack.shift();
    if (targetNode) {
      if (targetNode.id === targetId && targetId === 0) {
        targetNode.childrens.push(node);
        return tree;
      }
      targetNode.childrens.forEach((child) => {
        if (child.id === targetId) {
          child.childrens.push(node);
          return tree;
        } else {
          stack.push(child);
        }
      });
    }
  }
};

export const findParentNode = (
  tree: UndoRedoTreeType,
  targetId: number
): UndoRedoTreeType => {
  const stack: UndoRedoTreeType[] = [];
  stack.push(tree);
  const mostParent = stack[0];
  let res: UndoRedoTreeType;
  while (stack.length > 0) {
    const targetNode = stack.shift();
    if (targetNode) {
      targetNode.childrens.forEach((child) => {
        if (child.id === targetId) {
          res = targetNode || mostParent;
        } else {
          stack.push(child);
        }
      });
    }
    // @ts-ignore
    if (res) {
      return res;
    }
  }
  throw new Error("あるはず");
};

export const findChildNode = (
  tree: UndoRedoTreeType,
  targetId: number
): UndoRedoTreeType => {
  const stack: UndoRedoTreeType[] = [];
  stack.push(tree);
  let res: UndoRedoTreeType;
  while (stack.length > 0) {
    const targetNode = stack.shift();
    if (targetNode) {
      if (targetNode.id === targetId) {
        res = targetNode.childrens[targetNode.childrens.length - 1];
      }
      targetNode.childrens.forEach((child) => {
        stack.push(child);
      });
    }
    // @ts-ignore
    if (res) {
      return res;
    }
  }
  // @ts-ignore
  console.log("res", res);
  throw new Error("あるはず");
};
