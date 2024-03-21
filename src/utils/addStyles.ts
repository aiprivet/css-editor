export default function addStyles(
  newStyle,
  setNewStyle,
  selectedNode,
  updateSelectedNodeStyles,
  updateSelectedNode,
  page,
  updatePage
) {
  const updatedStyles = [...selectedNode.styles, newStyle];
  if (newStyle.length > 0) {
    updateSelectedNodeStyles(updatedStyles);
    updateSelectedNode({ ...selectedNode, styles: updatedStyles });
    const newPage = JSON.parse(JSON.stringify(page));
    findNode(newPage);
    updatePage(newPage);
    setNewStyle('')
  }
  function findNode(page) {
    for (let node of page) {
      if (node.id === selectedNode.id) {
        node.styles = updatedStyles;
        return;
      } else if (node.childrens?.length > 0) {
        findNode(node.childrens);
      }
    }
  }
}
