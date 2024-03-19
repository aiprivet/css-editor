import {
  useCreatePageStore,
  useSelectedNodeStore,
} from "../../../store/useStore";
import findNode from "../../../utils/findNode";
import cl from "../../../utils/cl";

interface ButtonNodeProps {
  children?: React.ReactNode;
  node: Node;
}

export default function ButtonNode({ children, node }: ButtonNodeProps) {
  const selectedNode = useSelectedNodeStore(function (state) {
    return state.selectedNode;
  });

  const updateSelectedNode = useSelectedNodeStore(function (state) {
    return state.updateSelectedNode;
  });

  const page = useCreatePageStore(function (state) {
    return state.page;
  });

  function handleSelectNode(event) {
    event.stopPropagation();
    updateSelectedNode(node);
    findNode(node.id, page, updateSelectedNode);
  }

  return (
    <button
      onClick={(event) => {
        handleSelectNode(event);
      }}
      id={node.id}
      key={node.id}
      className={cl(node, selectedNode)}
    >
      {node.textContent}
    </button>
  );
}
