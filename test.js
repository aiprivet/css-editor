
const tree = [
  {
    type: "div",
    styles: ["bg-black w-screen h-screen"],
    id: 1,
    childrens: [  {
      type: "div",
      styles: ["bg-red w-screen h-screen"],
      id: 10,
      childrens: [],
      parent: null,
    },],
    parent: null,
  },
];




console.log(findNode(10))