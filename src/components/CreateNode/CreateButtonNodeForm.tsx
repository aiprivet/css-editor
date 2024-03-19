import Button from "../../ui/Button/Button";

export default function CreateButtonNodeForm({
  nodeStyle,
  setNodeStyles,
  textContent,
  setTextContent,
}) {
  return (
    <>
     
      <label>Стили</label>
      <input
        onChange={(event) => setNodeStyles(event.target.value)}
        value={nodeStyle}
        type="text"
        className="border border-neutral-300 p-2 rounded-lg"
      />
      <label>Текст</label>
      <input
        onChange={(event) => setTextContent(event.target.value)}
        value={textContent}
        type="text"
        className="border border-neutral-300 p-2 rounded-lg"
      />
      <Button type={"primary"}>Добавить</Button>
    </>
  );
}
