export default function changeImgSrc(
  newImgSrc,
  selectedNode,
  updateSelectedNodeImgSrc,
  updateSelectedNode,
  page,
  updatePage
) {
  let newNode = JSON.parse(JSON.stringify(selectedNode));

  let newPage = JSON.parse(JSON.stringify(page));

  updateSelectedNodeImgSrc(newImgSrc);

  updateSelectedNode({ ...newNode, imgSrc: newImgSrc });

  function findNode(page) {
    for (let node of page) {
      if (node.id === selectedNode.id) {
        node.imgSrc = newImgSrc;
        return;
      } else if (node.childrens?.length > 0) {
        findNode(node.childrens);
      }
    }
  }

  findNode(newPage);
  updatePage(newPage);
}
