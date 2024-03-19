import { v4 as uuidv4 } from "uuid";

export const createNode = {
  div(parentId, styles) {
    return {
      nodeType: "div",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
    };
  },
  button(parentId, styles, textContent) {
    return {
      nodeType: "button",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  h1(parentId, styles, textContent) {
    return {
      nodeType: "h1",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  h2(parentId, styles, textContent) {
    return {
      nodeType: "h2",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  h3(parentId, styles, textContent) {
    return {
      nodeType: "h3",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  h4(parentId, styles, textContent) {
    return {
      nodeType: "h4",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  h5(parentId, styles, textContent) {
    return {
      nodeType: "h5",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  h6(parentId, styles, textContent) {
    return {
      nodeType: "h6",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  p(parentId, styles, textContent) {
    return {
      nodeType: "p",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  span(parentId, styles, textContent) {
    return {
      nodeType: "span",
      styles,
      id: uuidv4(),
      childrens: [],
      parentId,
      textContent,
    };
  },
  a(parentId, styles, textContent, aHref) {
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
  img(parentId, styles, imgSrc) {
    return {
      nodeType: "img",
      styles,
      id: uuidv4(),
      parentId,
      imgSrc,
    };
  },
  input(parentId, styles, inputPlaceholder, inputType, inputValue) {
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
