import { useCreatePageStore, useSelectedNodeStore } from "../../store/useStore";
import deleteChildren from "../../utils/deleteChildren";
import editNode from "../../utils/editNode";
import handleAddStyles from "../../utils/handleAddStyles";
import Button from "../../ui/Button/Button";
import Badge from "../../ui/Badge/Badge";
import handleDeleteStyle from "../../utils/handleDeleteStyles";
import { useEffect, useState } from "react";
import handleChangeTextContent from "../../utils/handleChangeText";
import changeAHref from "../../utils/changeAHref";
import changeImgSrc from "../../utils/changeImgSrc";

export default function EditNodeForm() {
  const page = useCreatePageStore(function (state) {
    return state.page;
  });

  const [newStyle, setNewStyle] = useState("");

  const updatePage = useCreatePageStore(function (state) {
    return state.updatePage;
  });

  const selectedNode = useSelectedNodeStore(function (state) {
    return state.selectedNode;
  });
  const updateSelectedNodeStyles = useSelectedNodeStore(function (state) {
    return state.updateSelectedNodeStyles;
  });
  const updateSelectedNode = useSelectedNodeStore(function (state) {
    return state.updateSelectedNode;
  });
  const updateSelectedNodeTextContent = useSelectedNodeStore(function (state) {
    return state.updateSelectedNodeTextContent;
  });
  const updateSelectedNodeAHref = useSelectedNodeStore(function (state) {
    return state.updateSelectedNodeAHref;
  });
  const updateSelectedNodeImgSrc = useSelectedNodeStore(function (state) {
    return state.updateSelectedNodeImgSrc;
  });

  return (
    <div className=" flex flex-col gap-2 border border-neutral-200 rounded-xl p-8 z-50 bg-neutral-100 ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editNode(
            page,
            updatePage,
            selectedNode.id,
            selectedNode.styles,
            selectedNode.textContent
          );
        }}
      >
        <h2 className="text-center text-xl font-bold mb-2">
          Редактировать узел
        </h2>

        <div className="flex flex-col gap-2">
          <label className="text-start">Стили</label>
          <div className="flex flex-wrap max-w-52 max-h-24 overflow-scroll gap-2 border border-neutral-400 rounded-xl p-2">
            {selectedNode.styles.map((style: string, index: number) => (
              <Badge
                cl={style}
                key={index}
                onClick={() =>
                  handleDeleteStyle(
                    index,
                    selectedNode,
                    updateSelectedNodeStyles,
                    updateSelectedNode
                  )
                }
              />
            ))}
          </div>
          <label className="text-start">Добавить стиль</label>

          <input
            onChange={(event) => {
              setNewStyle(event.target.value);
            }}
            value={newStyle}
            type="text"
            className="border border-neutral-300 p-2 rounded-lg "
          />
          {selectedNode.textContent ? (
            <>
              <label className="text-start">Редактировать текст</label>

              <input
                onChange={(event) => {
                  handleChangeTextContent(
                    event.target.value,
                    selectedNode,
                    updateSelectedNodeTextContent,
                    updateSelectedNode
                  );
                }}
                type="text"
                value={selectedNode.textContent}
                className="border border-neutral-300 p-2 rounded-lg "
              />
            </>
          ) : (
            ""
          )}
          {selectedNode.aHref ? (
            <>
              <label className="text-start">Редактировать ссылку</label>

              <input
                onChange={(event) => {
                  changeAHref(
                    event.target.value,
                    selectedNode,
                    updateSelectedNodeAHref,
                    updateSelectedNode
                  );
                }}
                type="text"
                value={selectedNode.aHref}
                className="border border-neutral-300 p-2 rounded-lg "
              />
            </>
          ) : (
            ""
          )}

          {selectedNode.imgSrc ? (
            <>
              <label className="text-start">
                Редактировать ссылку на изображение
              </label>

              <input
                onChange={(event) => {
                  changeImgSrc(
                    event.target.value,
                    selectedNode,
                    updateSelectedNodeImgSrc,
                    updateSelectedNode
                  );
                }}
                type="text"
                value={selectedNode.aHref}
                className="border border-neutral-300 p-2 rounded-lg "
              />
            </>
          ) : (
            ""
          )}

          <Button
            onClick={() =>
              handleAddStyles(
                newStyle,
                selectedNode,
                updateSelectedNodeStyles,
                updateSelectedNode
              )
            }
            type={"success"}
          >
            Сохранить
          </Button>

          <button
            className={`text-white px-4 py-2 rounded-lg text-xs hover:bg-gradient-to-br transition ${
              selectedNode.id === "1"
                ? "bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutral-600 "
                : "bg-gradient-to-r from-red-400 via-red-500 to-red-600 "
            }`}
            disabled={selectedNode.id === "1" ? true : false}
            onClick={() =>
              deleteChildren(
                selectedNode.id,
                selectedNode,
                updateSelectedNode,
                page,
                updatePage
              )
            }
          >
            Удалить узел
          </button>
        </div>
      </form>
    </div>
  );
}
