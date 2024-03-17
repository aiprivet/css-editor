import { useCreatePageStore, useSelectedNodeStore } from "../../store/useStore";
import editNode from "../../utils/editNode";
import handleChangeStyles from "../../utils/handleChangeStyles";

export default function EditNodeForm() {
  const page = useCreatePageStore(function (state) {
    return state.page;
  });

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

  return (
    <div className="border border-black rounded-xl p-8 z-50 bg-white">
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
        className="flex flex-col gap-2"
      >
        <h2 className="text-center text-xl font-bold">Редактировать узел</h2>

        <p className="text-center font-bold">Стили:</p>

        <div className="flex flex-col gap-2">
          {selectedNode.styles.map((style: string, index: number) => (
            <input
              className="border border-black rounded-lg p-2"
              type="text"
              value={style}
              key={index}
              onChange={(event) =>
                handleChangeStyles(
                  index,
                  event,
                  selectedNode,
                  updateSelectedNodeStyles,
                  updateSelectedNode
                )
              }
            />
          ))}

          <button
            type="submit"
            className="border border-black bg-green-400 rounded-xl mt-4 "
          >
            Cохранить
          </button>
        </div>
      </form>
    </div>
  );
}
