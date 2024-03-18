import { v4 as uuidv4 } from "uuid";

export const createNode = {
  div(styles, parentId) {
    return {
      nodeType: "div",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
    };
  },
  h1(styles, parentId, textContent) {
    return {
      nodeType: "h1",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  h2(styles, parentId, textContent) {
    return {
      nodeType: "h2",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  h3(styles, parentId, textContent) {
    return {
      nodeType: "h3",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  h4(styles, parentId, textContent) {
    return {
      nodeType: "h4",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  h5(styles, parentId, textContent) {
    return {
      nodeType: "h5",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  h6(styles, parentId, textContent) {
    return {
      nodeType: "h6",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  p(styles, parentId, textContent) {
    return {
      nodeType: "p",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  span(styles, parentId, textContent) {
    return {
      nodeType: "span",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  a(styles, parentId, textContent, aHref) {
    return {
      nodeType: "a",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
      aHref,
    };
  },
  img(styles, parentId, imgSrc) {
    return {
      nodeType: "img",
      styles,
      id: uuidv4(),
      parentId,
      imgSrc,
    };
  },
  input(styles, parentId, inputPlaceholder, inputType, inputValue) {
    return {
      nodeType: "input",
      styles,
      id: uuidv4(),
      parentId,
      inputPlaceholder,
      inputType,
      inputValue,
    };
  },
};
