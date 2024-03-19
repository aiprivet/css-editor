export default function ChangeAHref(
  newAHref,
  selectedNode,
  updateSelectedNodeAHref,
  updateSelectedNode
) {
  updateSelectedNodeAHref(newAHref);
  updateSelectedNode({ ...selectedNode, aHref: newAHref });
}
