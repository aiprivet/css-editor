import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

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
    updatePage(updatedPage) {
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
      textContent: "",
    },

    createNodeType(nodeType) {
      set(function (state) {
        return { node: { ...state.node, nodeType } };
      });
    },

    createNodeStyles(styles) {
      set(function (state) {
        return { node: { ...state.node, styles } };
      });
    },

    createTextContent(textContent) {
      set(function (state) {
        return { node: { ...state.node, textContent } };
      });
    },

    createNodeId() {
      set(function (state) {
        return { node: { ...state.node, id: uuidv4() } };
      });
    },

    createParentId(parentId) {
      set(function (state) {
        return { node: { ...state.node, parentId } };
      });
    },

    createImgSrc(imgSrc) {
      set(function (state) {
        return { node: { ...state.node, imgSrc } };
      });
    },

    createInputPlaceholder(inputPlaceholder) {
      set(function (state) {
        return { node: { ...state.node, inputPlaceholder } };
      });
    },
    createInputType(inputType) {
      set(function (state) {
        return { node: { ...state.node, inputType } };
      });
    },
    createAHref(aHref) {
      set(function (state) {
        return { node: { ...state.node, aHref } };
      });
    },
  };
});

export const useSelectedNodeStore = create(function (set) {
  return {
    selectedNode: initialNode,
    updateSelectedNode(newSelectedNode) {
      set({ selectedNode: newSelectedNode });
    },
    updateSelectedNodeStyles(newStyles) {
      set(function (state) {
        return { selectedNode: {...state.selectedNode, styles: newStyles} };
      });
    },
  };
});
