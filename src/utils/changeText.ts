export default function changeTextContent(
  newTextContent,
  selectedNode,
  updateSelectedNodeTextContent,
  updateSelectedNode,
  page,
  updatePage
) {
  let newNode = JSON.parse(JSON.stringify(selectedNode));

  let newPage = JSON.parse(JSON.stringify(page));

  updateSelectedNodeTextContent(newTextContent);

  updateSelectedNode({ ...newNode, textContent: newTextContent });

  function findNode(page) {
    for (let node of page) {
      if (node.id === selectedNode.id) {
        node.textContent = newTextContent;
        return;
      } else if (node.childrens?.length > 0) {
        findNode(node.childrens);
      }
    }
  }

  findNode(newPage);
  updatePage(newPage);
}
