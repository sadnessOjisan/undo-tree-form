export type UndoRedoTreeType = {
  id: number;
  input: string;
  childrens: UndoRedoTreeType[];
  parentId?: number;
};

export type UndoRedoTreeStateType = {
  currentNode: UndoRedoTreeType;
  previousNode: UndoRedoTreeType;
  tree: UndoRedoTreeType;
};
