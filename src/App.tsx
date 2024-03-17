import { useCreatePageStore, useSelectedNodeStore } from "./store/useStore";
import CreateNodeForm from "./components/CreateNode/CreateNodeForm";
import EditNodeForm from "./components/EditNode/EditNodeForm";
import findNode from "./utils/findNode";

export default function App() {
  const page = useCreatePageStore(function (state) {
    return state.page;
  });
  const selectedNode = useSelectedNodeStore(function (state) {
    return state.selectedNode;
  });
  const updateSelectedNode = useSelectedNodeStore(function (state) {
    return state.updateSelectedNode;
  });

  function parseTree(tree: NodeTree) {
    return tree.map(function (node: Node) {
      if (node.nodeType === "div") {
        if (node.childrens) {
          return (
            <div
              onClick={(e) => {
                e.stopPropagation();
                updateSelectedNode(node);
                findNode(node.id, page, updateSelectedNode);
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
                findNode(node.id, page, updateSelectedNode);
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
              findNode(node.id, page, updateSelectedNode);
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
        <CreateNodeForm />
      </div>
      <div className="fixed bottom-8 left-8">
        <EditNodeForm />
      </div>
    </>
  );
}
