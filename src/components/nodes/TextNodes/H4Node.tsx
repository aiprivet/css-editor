import {
  useCreatePageStore,
  useSelectedNodeStore,
} from "../../../store/useStore";
import findNode from "../../../utils/findNode";
import cl from "../../../utils/cl";

interface H4NodeProps {
  children?: React.ReactNode;
  node: Node;
}

export default function H4Node({ children, node }: H4NodeProps) {
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

  if (children) {
    return (
      <h4
        onClick={(event) => {
          handleSelectNode(event);
        }}
        id={node.id}
        key={node.id}
        className={cl(node, selectedNode)}
      >
        {children}
      </h4>
    );
  } else {
    return (
      <h4
        onClick={(event) => {
          handleSelectNode(event);
        }}
        id={node.id}
        key={node.id}
        className={cl(node, selectedNode)}
      >
        {node.textContent}
      </h4>
    );
  }
}
