export default function findNode(
  idToFound: string,
  page: NodeTree,
  updateSelectedNode
) {
  let updatedTree = JSON.parse(JSON.stringify(page));
  function findNodeById(nodes: NodeTree) {
    for (const node of nodes) {
      if (node.id === idToFound) {
        updateSelectedNode(node);
      }
      if (node.childrens?.length > 0) {
        findNodeById(node.childrens);
      }
    }
  }
  findNodeById(updatedTree);
}
