export default function addChidlren(
  idToFound: string,
  children: Node,
  page,
  updateSelectedNode,
  updatePage
) {
  let updatedTree = JSON.parse(JSON.stringify(page));
  function addToChildrenById(nodes: NodeTree) {
    for (const node of nodes) {
      if (node.id === idToFound) {
        node.childrens.push(children);
        updateSelectedNode(children);
        return;
      }
      if (node.childrens?.length > 0) {
        addToChildrenById(node.childrens);
      }
    }
  }
  addToChildrenById(updatedTree);
  updatePage(updatedTree);
}
