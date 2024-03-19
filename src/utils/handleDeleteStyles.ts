export default function handleDeleteStyle(
  indexToDelete,
  selectedNode,
  updateSelectedNodeStyles,
  updateSelectedNode
) {
  let updatedStyles = JSON.parse(JSON.stringify(selectedNode.styles));
  updatedStyles = updatedStyles.filter((_, i) => i !== indexToDelete);
  updateSelectedNodeStyles(updatedStyles);
  updateSelectedNode({ ...selectedNode, styles: updatedStyles });
}
