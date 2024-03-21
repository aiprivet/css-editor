export default function deleteStyle(
  indexToDelete,
  selectedNode,
  updateSelectedNodeStyles,
  updateSelectedNode,
  page,
  updatePage
) {
  let newNode = JSON.parse(JSON.stringify(selectedNode));
  
  let newPage = JSON.parse(JSON.stringify(page));

  let updatedStyles = newNode.styles.filter((_, i) => i !== indexToDelete);

  updateSelectedNodeStyles(updatedStyles);

  updateSelectedNode({ ...newNode, styles: updatedStyles });

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

  findNode(newPage);

  updatePage(newPage);
}
