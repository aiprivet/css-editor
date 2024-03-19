import Button from "../../ui/Button/Button";

export default function CreateImgNodeForm({
  nodeStyle,
  setNodeStyles,
  imgSrc,
  setImgSrc,
}) {
  return (
    <>
      <label>Стили</label>
      <input
        onChange={(event) => setNodeStyles(event.target.value)}
        value={nodeStyle}
        type="text"
        className="border border-black rounded-lg"
      />
      <label>Ссылка на изображение</label>
      <input
        onChange={(event) => setImgSrc(event.target.value)}
        value={imgSrc}
        type="text"
        className="border border-black rounded-lg"
      />
          <Button type={"primary"}>Добавить</Button>

    </>
  );
}
