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
      <label>Тип</label>
      <input
        onChange={(event) => setInputType(event.target.value)}
        value={inputType}
        type="text"
        className="border border-black rounded-lg"
      />
      <label>Value</label>
      <input
        onChange={(event) => setInputValue(event.target.value)}
        value={inputValue}
        type="text"
        className="border border-black rounded-lg"
      />
      <label>Placeholder</label>
      <input
        onChange={(event) => setInputPlaceholder(event.target.value)}
        value={inputPlaceholder}
        type="text"
        className="border border-black rounded-lg"
      />
      <label>Стили</label>
      <input
        onChange={(event) => setNodeStyles(event.target.value)}
        value={nodeStyle}
        type="text"
        className="border border-black rounded-lg"
      />

<Button type={"primary"}>Добавить</Button>

    </>
  );
}
