import { useCreatePageStore, useSelectedNodeStore } from "./store/useStore";
import CreateNodeForm from "./components/CreateNode/CreateNodeForm";
import EditNodeForm from "./components/EditNode/EditNodeForm";
import DivNode from "./components/nodes/BlockNodes/DivNode";
import H1Node from "./components/nodes/TextNodes/H1Node";
export default function App() {
  const page = useCreatePageStore(function (state) {
    return state.page;
  });
  const selectedNode = useSelectedNodeStore(function (state) {
    return state.selectedNode;
  });
  function parseTree(tree: NodeTree) {
    return tree.map(function (node: Node) {
      const { nodeType } = node;
      if (nodeType === "div") {
        if (node.childrens) {
          return (
            <DivNode key={node.id} node={node}>
              {parseTree(node.childrens)}
            </DivNode>
          );
        } else return <DivNode key={node.id} node={node} />;
      }
      if (nodeType === "h1") {
        return <H1Node key={node.id} node={node}></H1Node>;
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
