import {
  useCreatePageStore,
  useSelectedNodeStore,
} from "../../../store/useStore";
import cl from "../../../utils/cl";
import findNode from "../../../utils/findNode";

interface DivNodeProps {
  children?: React.ReactNode;
  node: Node;
}

export default function DivNode({ children, node }: DivNodeProps) {
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
    <div
      onClick={(event) => {
        handleSelectNode(event);
      }}
      id={node.id}
      key={node.id}
      className={cl(node, selectedNode)}
    >
      {children}
    </div>
  );
}
