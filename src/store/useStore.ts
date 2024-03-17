import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

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
      textContent: "Пора создать первый компонент🌝",
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

export const useCreateNodeStore = create(function (set) {
  return {
    node: {
      nodeType: "div",
      styles: [" "],
      id: "",
      parentId: "",
      childrens: [],
    },

    createNodeType(nodeType: string) {
      set(function (state: NodeState) {
        return { node: { ...state.node, nodeType } };
      });
    },

    createNodeStyles(styles: string[]) {
      set(function (state: NodeState) {
        return { node: { ...state.node, styles } };
      });
    },

    createTextContent(textContent: string) {
      set(function (state: NodeState) {
        return { node: { ...state.node, textContent } };
      });
    },

    createNodeId() {
      set(function (state: NodeState) {
        return { node: { ...state.node, id: uuidv4() } };
      });
    },

    createParentId(parentId: string) {
      set(function (state: NodeState) {
        return { node: { ...state.node, parentId } };
      });
    },

    createImgSrc(imgSrc: string) {
      set(function (state: NodeState) {
        return { node: { ...state.node, imgSrc } };
      });
    },

    createInputPlaceholder(inputPlaceholder: string) {
      set(function (state: NodeState) {
        return { node: { ...state.node, inputPlaceholder } };
      });
    },
    createInputType(inputType: string) {
      set(function (state: NodeState) {
        return { node: { ...state.node, inputType } };
      });
    },
    createAHref(aHref: string) {
      set(function (state: NodeState) {
        return { node: { ...state.node, aHref } };
      });
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
  };
});
