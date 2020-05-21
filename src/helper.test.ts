import { insertNodeToTree, findParentNode } from "./helper";
import { UndoRedoTreeType } from "./types";
describe("insertNodeToTree", () => {
  describe("insertNodeToTree", () => {
    test("insert", () => {
      const targetTree: UndoRedoTreeType = {
        id: 0,
        input: "",
        childrens: [
          {
            id: 1,
            input: "",
            childrens: [],
            parentId: 0,
          },
          {
            id: 2,
            input: "",
            childrens: [
              {
                id: 3,
                input: "",
                childrens: [],
                parentId: 2,
              },
            ],
            parentId: 0,
          },
        ],
      };
      const insertNode = {
        id: 4,
        input: "",
        childrens: [],
        parentId: 3,
      };
      insertNodeToTree(targetTree, 3, insertNode);
      expect(targetTree).toEqual({
        id: 0,
        input: "",
        childrens: [
          {
            id: 1,
            input: "",
            childrens: [],
            parentId: 0,
          },
          {
            id: 2,
            input: "",
            childrens: [
              {
                id: 3,
                input: "",
                childrens: [insertNode],
                parentId: 2,
              },
            ],
            parentId: 0,
          },
        ],
      });
    });
    test("root", () => {
      const targetTree: UndoRedoTreeType = {
        id: 0,
        input: "",
        childrens: [],
      };
      const insertNode = {
        id: 1,
        input: "",
        childrens: [],
        parentId: 0,
      };
      insertNodeToTree(targetTree, 0, insertNode);
      expect(targetTree).toEqual({
        id: 0,
        input: "",
        childrens: [insertNode],
      });
    });
  });
  describe("findParentNode", () => {
    test("find", () => {
      const targetTree: UndoRedoTreeType = {
        id: 0,
        input: "",
        childrens: [
          {
            id: 1,
            input: "",
            childrens: [],
            parentId: 0,
          },
          {
            id: 2,
            input: "",
            childrens: [
              {
                id: 3,
                input: "",
                childrens: [],
                parentId: 2,
              },
            ],
            parentId: 0,
          },
        ],
      };
      const actual = findParentNode(targetTree, 3);
      expect(actual).toBe(2);
    });
  });
});
