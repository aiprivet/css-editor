export default function deleteChildren(
  idToFound: string,
  updateSelectedNode,
  page,
  updatePage
) {
  if (idToFound === "1") return;

  let updatedTree = JSON.parse(JSON.stringify(page));

  function deleteNode(nodes: NodeTree, idToDelete: string) {
    return nodes.filter((node) => node.id !== idToDelete);
  }

  function deleteChildrenById(
    nodes: NodeTree,
    idToDelete: string,
    parentNode = null
  ) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.id === idToDelete) {
        if (parentNode) {
          parentNode.childrens = deleteNode(parentNode.childrens, idToDelete);
        } else {
          updatedTree = deleteNode(updatedTree, idToDelete);
        }
        return;
      }
      if (node.childrens?.length > 0) {
        deleteChildrenById(node.childrens, idToDelete, node);
      }
    }
  }
  deleteChildrenById(updatedTree, idToFound);
  const initNode = updatedTree[0];
  updateSelectedNode(initNode);
  updatePage(updatedTree);
}
