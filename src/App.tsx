import { v4 as uuidv4 } from "uuid";
import {
  useCreatePageStore,
  useCreateNodeStore,
  useSelectedNodeStore,
} from "./store/useStore";

interface Node {
  nodeType: string;
  styles?: string[];
  id: string;
  parentId: string | null;
  childrens?: Node[];
  imgSrc?: string;
  inputPlaceholder?: string;
  inputType?: string;
  textContent?: string;
  aHref?: string;
}

type NodeTree = Node[];

export default function App() {
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

  const updateSelectedNodeStyles = useSelectedNodeStore(function (state) {
    return state.updateSelectedNodeStyles;
  });

  function addChidlren(idToFound, children) {
    let updatedTree = JSON.parse(JSON.stringify(page));
    function addToChildrenById(nodes) {
      for (const node of nodes) {
        if (node.id === idToFound) {
          node.childrens.push(children);
          updateSelectedNode(children);
          return;
        }
        if (node.childrens?.length > 0) {
          addToChildrenById(node.childrens);
        }
      }
    }
    addToChildrenById(updatedTree);
    updatePage(updatedTree);
  }

  function editNode(idToFound, newStyles, newText = "") {
    let updatedTree = JSON.parse(JSON.stringify(page));
    console.log(newStyles);
    function editNodeById(nodes) {
      for (const node of nodes) {
        if (node.id === idToFound) {
          node.styles = newStyles;
          if (node.textContent !== null) {
            node.textContent = newText;
          }
          return;
        }
        if (node.childrens?.length > 0) {
          editNodeById(node.childrens);
        }
      }
    }
    editNodeById(updatedTree);
    updatePage(updatedTree);
  }

  function findNode(idToFound) {
    let updatedTree = JSON.parse(JSON.stringify(page));
    function findNodeById(nodes) {
      for (const node of nodes) {
        if (node.id === idToFound) {
          updateSelectedNode(node);
        }
        if (node.childrens?.length > 0) {
          findNodeById(node.childrens);
        }
      }
    }
    findNodeById(updatedTree);
  }

  function deleteChildren(idToFound) {
    if (selectedNode.id === "1") return;

    let updatedTree = JSON.parse(JSON.stringify(page));

    function deleteNode(nodes, idToDelete) {
      return nodes.filter((node) => node.id !== idToDelete);
    }

    function deleteChildrenById(nodes, idToDelete, parentNode = null) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.id === idToDelete) {
          if (parentNode) {
            parentNode.childrens = deleteNode(parentNode.childrens, idToDelete);
          } else {
            updatedTree = deleteNode(updatedTree, idToDelete);
          }
          return;
        }
        if (node.childrens?.length > 0) {
          deleteChildrenById(node.childrens, idToDelete, node);
        }
      }
    }

    deleteChildrenById(updatedTree, idToFound);
    const initNode = updatedTree[0];
    updateSelectedNode(initNode);
    updatePage(updatedTree);
  }

  function createNode(nodeType, styles, textContent, parentId) {
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

  function handleChangeStyles(index, event) {
    const newStyle = event.target.value;
    const updatedStyles = [...selectedNode.styles];
    updatedStyles[index] = newStyle;
    updateSelectedNodeStyles(updatedStyles);
    updateSelectedNode({ ...selectedNode, styles: updatedStyles });
  }

  function parseTree(tree) {
    return tree.map(function (node) {
      if (node.nodeType === "div") {
        if (node.childrens) {
          return (
            <div
              onClick={(e) => {
                e.stopPropagation();
                updateSelectedNode(node);
                findNode(node.id);
              }}
              id={node.id}
              key={node.id}
              className={`${node.styles.join(" ")} ${
                selectedNode.id === node.id
                  ? "border border-sky-300 border-dashed"
                  : ""
              }`}
            >
              {parseTree(node.childrens)}
            </div>
          );
        } else {
          return (
            <div
              onClick={(e) => {
                e.stopPropagation();
                updateSelectedNode(node);
                findNode(node.id);
              }}
              id={node.id}
              key={node.id}
              className={node.styles.join(" ")}
            ></div>
          );
        }
      }
      if (node.nodeType === "h1") {
        return (
          <h1
            onClick={(e) => {
              e.stopPropagation();
              updateSelectedNode(node);
              findNode(node.id);
            }}
            id={node.id}
            key={node.id}
            className={`${node.styles.join(" ")} ${
              selectedNode.id === node.id
                ? "border border-sky-300 border-dashed"
                : ""
            }`}
          >
            {node.textContent}
          </h1>
        );
      }
      return null;
    });
  }

  return (
    <>
      <div className="">{parseTree(page)}</div>
      <div className="fixed z-50 right-4 top-4 ">
        <h1 className="text-sky-300 text-3xl">Debug mode</h1>
        <br />
        <h1 className="text-sky-300 text-3xl">selected id:{selectedNode.id}</h1>
      </div>

      <div className="fixed right-8 bottom-8">
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
                )
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
              onClick={() => deleteChildren(selectedNode.id)}
            >
              Удалить узел
            </button>
          </form>
        </div>
      </div>
      <div className="fixed bottom-8 left-8">
        <div className="border border-black rounded-xl p-8 z-50 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editNode(
                selectedNode.id,
                selectedNode.styles,
                selectedNode.textContent
              );
            }}
            className="flex flex-col gap-2"
          >
            <h2 className="text-center text-xl font-bold">
              Редактировать узел
            </h2>

            <p className="text-center font-bold">Стили:</p>

            <div className="flex flex-col gap-2">
              {selectedNode.styles.map((style, index) => (
                <input
                  className="border border-black rounded-lg p-2"
                  type="text"
                  value={style}
                  key={index}
                  onChange={(event) => handleChangeStyles(index, event)}
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
      </div>
    </>
  );
}
