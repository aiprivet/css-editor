import { useState } from "react";
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

  const [content, setContent] = useState("");

  const [currentStyle, setCurrentStyle] = useState([
    "bg-black",
    "w-screen",
    "h-screen",
  ]);
  const [currentText, setCurrentText] = useState(null);

  const [selected, setSelected] = useState("1");

  function addChidlren(idToFound, children) {
    let updatedTree = JSON.parse(JSON.stringify(page));
    function addToChildrenById(nodes) {
      for (const node of nodes) {
        if (node.id === idToFound) {
          node.childrens.push(children);
          setSelected(children.id);
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
    function editNodeById(nodes) {
      for (const node of nodes) {
        if (node.id === idToFound) {
          node.styles = newStyles;
          if (node.content !== null) {
            node.content = newText;
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
    let foundStyles = [];
    let foundText = "";
    function findNodeById(nodes) {
      for (const node of nodes) {
        if (node.id === idToFound) {
          foundStyles = node.styles;
          if (node.type === "h1") {
            foundText = node.content;
          }
        }
        if (node.childrens?.length > 0) {
          findNodeById(node.childrens);
        }
      }
    }
    findNodeById(updatedTree);
    if (foundText !== "") setCurrentText(foundText);

    setCurrentStyle(foundStyles);
  }

  function deleteChildren(idToFound) {
    if (selected == "1") return;
    let updatedTree = JSON.parse(JSON.stringify(page));
    function deleteChildrenById(nodes, parentNode = null) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.id === idToFound) {
          if (parentNode) {
            parentNode.childrens.splice(i, 1);
          } else {
            updatedTree = updatedTree.filter((n) => n.id !== idToFound);
          }
          return;
        }
        if (node.childrens?.length > 0) {
          deleteChildrenById(node.childrens, node);
        }
      }
    }
    deleteChildrenById(updatedTree);
    setSelected("1");
    updatePage(updatedTree);
  }

  function createNode(nodeType, styles, textContent, parentId) {
    console.log(nodeType, styles, textContent, parentId);
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
    const newValue = event.target.value;
    setCurrentStyle((prevStyles) => {
      const newStyles = [...prevStyles];
      newStyles[index] = newValue;
      return newStyles;
    });
  }

  function parseTree(tree) {
    return tree.map(function (node) {
      if (node.nodeType === "div") {
        if (node.childrens) {
          return (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelected(node.id);
                findNode(node.id);
              }}
              id={node.id}
              key={node.id}
              className={`${node.styles.join(" ")} ${
                selected === node.id
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
                setSelected(node.id);
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
              setSelected(node.id);
              findNode(node.id);
            }}
            id={node.id}
            key={node.id}
            className={`${node.styles.join(" ")} ${
              selected === node.id ? "border border-sky-300 border-dashed" : ""
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
        <h1 className="text-sky-300 text-3xl">selected id:{selected}</h1>
      </div>

      <div className="fixed right-8 bottom-8">
        <div className="border border-black rounded-xl p-8 z-50 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addChidlren(
                selected,
                createNode(nodeType, nodeStyle.split(" "), content, selected)
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
              onChange={(e) => setContent(e.target.value)}
              value={content}
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
                selected === "1" ? "bg-neutral-300" : "bg-red-300"
              }`}
              disabled={selected === "1" ? true : false}
              onClick={() => deleteChildren(selected)}
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
              editNode(selected, currentStyle, currentText);
            }}
            className="flex flex-col gap-2"
          >
            <h2 className="text-center text-xl font-bold">
              Редактировать узел
            </h2>

            <p className="text-center font-bold">Стили:</p>

            <div className="flex flex-col gap-2">
              {currentStyle.map((style, index) => (
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
