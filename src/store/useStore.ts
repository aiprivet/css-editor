import { create } from "zustand";

interface NodeState {
  node: Node;
}
interface SelectedNodeState {
  selectedNode: Node;
}
const initialNode = {
  nodeType: "div",
  styles: [
    "bg-black",
    "w-screen",
    "h-screen",
    "flex",
    "items-center",
    "justify-center",
  ],
  id: "1",
  childrens: [
    {
      nodeType: "h1",
      styles: ["text-white", "text-3xl"],
      id: "2",
      childrens: [],
      textContent: "Удали этот блок и создай новый🌝",
      parentId: "1",
    },
  ],
  parentId: null,
};

const initialPage = [initialNode];

export const useCreatePageStore = create(function (set) {
  return {
    page: initialPage,
    updatePage(updatedPage: NodeTree) {
      set({ page: updatedPage });
    },
  };
});

export const useSelectedNodeStore = create(function (set) {
  return {
    selectedNode: initialNode,
    updateSelectedNode(newSelectedNode: Node) {
      set({ selectedNode: newSelectedNode });
    },
    updateSelectedNodeStyles(newStyles: string[]) {
      set(function (state: SelectedNodeState) {
        return { selectedNode: { ...state.selectedNode, styles: newStyles } };
      });
    },
    updateSelectedNodeTextContent(newTextContent: string) {
      set(function (state: SelectedNodeState) {
        return {
          selectedNode: { ...state.selectedNode, textContent: newTextContent },
        };
      });
    },
    updateSelectedNodeAHref(newAHref: string) {
      set(function (state: SelectedNodeState) {
        return { selectedNode: { ...state.selectedNode, aHref: newAHref } };
      });
    },
    updateSelectedNodeImgSrc(newImgSrc: string) {
      set(function (state: SelectedNodeState) {
        return { selectedNode: { ...state.selectedNode, imgSrc: newImgSrc } };
      });
    },
  };
});
