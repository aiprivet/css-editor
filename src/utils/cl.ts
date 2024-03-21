export default function cl(node, selectedNode) {
  if (node.id !== selectedNode.id) {
    return node.styles.join(" ");
  } else {
    return `border border-neutral-300 border-dashed border-opacity-60 hover:opacity-70 transition ${node.styles.join(" ")}`;
  }
}
