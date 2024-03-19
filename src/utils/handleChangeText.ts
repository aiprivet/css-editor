export default function handleChangeTextContent(
  newTextContent,
  selectedNode,
  updateSelectedNodeTextContent,
  updateSelectedNode
) {
  updateSelectedNodeTextContent(newTextContent);
  updateSelectedNode({ ...selectedNode, textContent: newTextContent });
}
