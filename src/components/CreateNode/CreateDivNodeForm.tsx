import Button from "../../ui/Button/Button";

export default function CreateDivNodeForm({ nodeStyle, setNodeStyles }) {
  return (
    <>
      <label>Tailwnd classnames</label>
      <input
        onChange={(event) => setNodeStyles(event.target.value)}
        value={nodeStyle}
        type="text"
        className="border border-neutral-300 p-2 rounded-lg "
      />

      <Button type={"primary"}>Add</Button>
    </>
  );
}
