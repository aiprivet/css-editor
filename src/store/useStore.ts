import { create } from "zustand";

const initialPage = [
  {
    type: "div",
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
        type: "h1",
        styles: ["text-white", "text-3xl"],
        id: "2",
        childrens: [],
        textContent: "Пора создать первый компонент🌝",
        parentId: "1",
      },
    ],
    parentId: null,
  },
];

export const useCreatePageStore = create(function (set) {
  return {
    page: initialPage,
    updatePage(updatedPage) {
      return set({ page: updatedPage });
    },
  };
});
