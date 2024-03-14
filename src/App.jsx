import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const tree = [
    {
      type: "div",
      styles: ["bg-black", "w-screen", "h-screen"],
      id: 1,
      childrens: [],
      parent: null,
    },
  ];

  const [type, setType] = useState("div");
  const [styles, setStyle] = useState("");
  const [content, setContent] = useState("");
  const [page, setPage] = useState(tree);
  const [selected, setSelected] = useState(1);
  const [currentStyle, setCurrentStyle] = useState([
    "bg-black",
    "w-screen",
    "h-screen",
  ]);

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
    setPage(updatedTree);
  }

  function editNode(idToFound, newStyles) {
    let updatedTree = JSON.parse(JSON.stringify(page));
    function editNodeById(nodes) {
      for (const node of nodes) {
        if (node.id === idToFound) {
          node.styles = newStyles;
          return;
        }
        if (node.childrens?.length > 0) {
          editNodeById(node.childrens);
        }
      }
    }
    editNodeById(updatedTree);
    setPage(updatedTree);
  }

  function findNode(idToFound) {
    let updatedTree = JSON.parse(JSON.stringify(page));
    let foundStyles = [];
    function findNodeById(nodes) {
      for (const node of nodes) {
        if (node.id === idToFound) {
          foundStyles = node.styles;
        }
        if (node.childrens?.length > 0) {
          findNodeById(node.childrens);
        }
      }
    }
    findNodeById(updatedTree);
    setCurrentStyle(foundStyles);
  }

  function deleteChildren(idToFound) {
    if (selected === 1) return;
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
    setSelected(1);
    setPage(updatedTree);
  }

  function createBlock(type, styles, content, parentId) {
    if (type === "div") {
      return {
        type,
        styles,
        id: uuidv4(),
        childrens: [],
        parentId,
      };
    }
    if (type === "h1") {
      return {
        type,
        styles,
        id: uuidv4(),
        content,
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
      if (node.type === "div") {
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
                  ? "border border-blue-500 border-dashed"
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
      if (node.type === "h1") {
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
              selected === node.id ? "border border-blue-500 border-dashed" : ""
            }`}
          >
            {node.content}
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
        <h1 className="text-blue-500 text-3xl">Debug mode</h1>
        <br />
        <h1 className="text-blue-500 text-3xl">selected id:{selected}</h1>
      </div>

      <div className="fixed right-8 bottom-8">
        <div className="border border-black rounded-xl p-8 z-50 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addChidlren(
                selected,
                createBlock(type, styles.split(" "), content, selected)
              );
            }}
            className="flex flex-col gap-2"
          >
            <h1 className="text-center text-xl font-bold">Добавить узел</h1>
            <label>Тип элемента</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-black rounded-lg "
            >
              <option value={"div"}>DIV</option>
              <option value={"h1"}>H1</option>
            </select>
            <label>Стили</label>
            <input
              onChange={(e) => setStyle(e.target.value)}
              value={styles}
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
              className="border border-black bg-blue-500 rounded-xl mt-4 "
            >
              Добавить
            </button>
            <button
              className={`border border-black  rounded-xl mt-4 ${
                selected === 1 ? "bg-neutral-500" : "bg-red-500"
              }`}
              disabled={selected === 1 ? true : false}
              onClick={() => deleteChildren(selected)}
            >
              Удалить узел
            </button>
          </form>
        </div>
      </div>

      <div style={{ left: "32px" }} className="fixed bottom-8 ">
        <div className="border border-black rounded-xl p-8 z-50 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editNode(selected, currentStyle);
            }}
            className="flex flex-col gap-2"
          >
            <h1 className="text-center text-xl font-bold">
              Редактировать узел
            </h1>
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
