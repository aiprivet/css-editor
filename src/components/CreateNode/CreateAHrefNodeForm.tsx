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
      <label>Ссылка</label>
      <input
        onChange={(event) => setAHref(event.target.value)}
        value={aHref}
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
      <label>Текст</label>
      <input
        onChange={(event) => setTextContent(event.target.value)}
        value={textContent}
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
