import Button from "../../ui/Button/Button";

export default function CreateAHrefNodeForm({
  nodeStyle,
  setNodeStyles,
  textContent,
  setTextContent,
  aHref,
  setAHref,
}) {
  return (
    <>
      <label>Link</label>
      <input
        onChange={(event) => setAHref(event.target.value)}
        value={aHref}
        type="text"
        className="border border-neutral-300 p-2 rounded-lg"
      />

      <label>Tailwnd classnames</label>
      <input
        onChange={(event) => setNodeStyles(event.target.value)}
        value={nodeStyle}
        type="text"
        className="border border-neutral-300 p-2 rounded-lg"
      />
      <label>Text</label>
      <input
        onChange={(event) => setTextContent(event.target.value)}
        value={textContent}
        type="text"
        className="border border-neutral-300 p-2 rounded-lg"
      />
      <Button type={"primary"}>Add</Button>
    </>
  );
}
