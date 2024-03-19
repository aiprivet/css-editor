export default function changeImgSrc(
  newImgSrc,
  selectedNode,
  updateSelectedNodeTextContent,
  updateSelectedNode
) {
  updateSelectedNodeTextContent(newImgSrc);
  updateSelectedNode({ ...selectedNode, imgSrc: newImgSrc });
}
