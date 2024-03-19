export default function handleAddStyles(
  newStyle,
  selectedNode,
  updateSelectedNodeStyles,
  updateSelectedNode
) {
  const updatedStyles = [...selectedNode.styles, newStyle];
  updateSelectedNodeStyles(updatedStyles);
  updateSelectedNode({ ...selectedNode, styles: updatedStyles });
}
