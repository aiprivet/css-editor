import {
  useCreatePageStore,
  useCreateNodeStore,
  useSelectedNodeStore,
} from "../../store/useStore";

import { v4 as uuidv4 } from "uuid";
import addChidlren from "../../utils/addChildren";
import deleteChildren from "../../utils/deleteChildren";

export default function CreateNodeForm() {
  const page = useCreatePageStore(function (state) {
    return state.page;
  });

  const updatePage = useCreatePageStore(function (state) {
    return state.updatePage;
  });

  const nodeType = useCreateNodeStore(function (state) {
    return state.node.nodeType;
  });

  const createNodeType = useCreateNodeStore(function (state) {
    return state.createNodeType;
  });

  const nodeStyle = useCreateNodeStore(function (state) {
    return state.node.styles;
  });

  const createNodeStyles = useCreateNodeStore(function (state) {
    return state.createNodeStyles;
  });

  const textContent = useCreateNodeStore(function (state) {
    return state.node.textContent;
  });

  const createTextContent = useCreateNodeStore(function (state) {
    return state.createTextContent;
  });

  const selectedNode = useSelectedNodeStore(function (state) {
    return state.selectedNode;
  });

  const updateSelectedNode = useSelectedNodeStore(function (state) {
    return state.updateSelectedNode;
  });

  function createNode(
    nodeType: string,
    styles: string[],
    textContent: string,
    parentId: string
  ) {
    if (nodeType === "div") {
      return {
        nodeType,
        styles,
        id: uuidv4(),
        childrens: [],
        parentId,
      };
    }
    if (nodeType === "h1") {
      return {
        nodeType,
        styles,
        id: uuidv4(),
        textContent,
        parentId,
      };
    }
  }

  return (
    <div className="border border-black rounded-xl p-8 z-50 bg-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addChidlren(
            selectedNode.id,
            createNode(
              nodeType,
              nodeStyle.split(" "),
              textContent,
              selectedNode.id
            ),
            page,
            updateSelectedNode,
            updatePage
          );
        }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-center text-xl font-bold">Добавить узел</h1>
        <label>Тип элемента</label>
        <select
          value={nodeType}
          onChange={(e) => createNodeType(e.target.value)}
          className="border border-black rounded-lg "
        >
          <option value={"div"}>DIV</option>
          <option value={"h1"}>H1</option>
        </select>
        <label>Стили</label>
        <input
          onChange={(e) => createNodeStyles(e.target.value)}
          value={nodeStyle}
          type="text"
          className="border border-black rounded-lg"
        />
        <label>Контент?</label>
        <input
          onChange={(e) => createTextContent(e.target.value)}
          value={textContent}
          type="text"
          className="border border-black rounded-lg"
        />
        <button
          type="submit"
          className="border border-black bg-sky-300 rounded-xl mt-4 "
        >
          Добавить
        </button>
        <button
          className={`border border-black  rounded-xl mt-4 ${
            selectedNode.id === "1" ? "bg-neutral-300" : "bg-red-300"
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
      </form>
    </div>
  );
}
