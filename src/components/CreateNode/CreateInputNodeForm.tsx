import Button from "../../ui/Button/Button";

export default function CreateInputNodeForm({
  nodeStyle,
  setNodeStyles,
  inputPlaceholder,
  setInputPlaceholder,
  inputType,
  setInputType,
  inputValue,
  setInputValue,
}) {
  return (
    <>
      <label>Input type</label>
      <input
        onChange={(event) => setInputType(event.target.value)}
        value={inputType}
        type="text"
        className="border border-neutral-300 p-2 rounded-lg"
      />
      <label>Value</label>
      <input
        onChange={(event) => setInputValue(event.target.value)}
        value={inputValue}
        type="text"
        className="border border-neutral-300 p-2 rounded-lg"
      />
      <label>Placeholder</label>
      <input
        onChange={(event) => setInputPlaceholder(event.target.value)}
        value={inputPlaceholder}
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

      <Button type={"primary"}>Add</Button>
    </>
  );
}
