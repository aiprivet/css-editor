export default function CreateDivNodeForm({ nodeStyle, setNodeStyles }) {
  return (
    <>
      <label>Стили</label>
      <input
        onChange={(event) => setNodeStyles(event.target.value)}
        value={nodeStyle}
        type="text"
        className="border border-black rounded-lg"
      />

      <button
        type="submit"
        className="border border-black bg-sky-300 rounded-xl mt-4 "
      >
        Добавить
      </button>
    </>
  );
}
