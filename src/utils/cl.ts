export default function cl(node, selectedNode) {
  if (node.id !== selectedNode.id) {
    return node.styles.join(" ");
  } else {
    return `border border-sky-300 border-dashed ${node.styles.join(" ")}`;
  }
}
