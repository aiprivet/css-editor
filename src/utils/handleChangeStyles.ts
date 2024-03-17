export default function handleChangeStyles(
  index: number,
  event: React.ChangeEvent<HTMLInputElement>,
  selectedNode,
  updateSelectedNodeStyles,
  updateSelectedNode,
) {
  const newStyle = event.target.value;
  const updatedStyles = [...selectedNode.styles];
  updatedStyles[index] = newStyle;
  updateSelectedNodeStyles(updatedStyles);
  updateSelectedNode({ ...selectedNode, styles: updatedStyles });
}