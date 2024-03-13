export default function App() {
  const page = [
    {
      type: "div",
      styles: ["bg-black"],
      childrens: [
        {
          type: "div",
          styles: ["bg-red-500", "w-1/2"],
          childrens: [
            {
              type: "h1",
              styles: ["text-blue-500", "text-xl"],
              content: "Hello world!",
            },
          ],
        },
      ],
    },
    {
      type: "div",
      styles: ["bg-green-500"],
      childrens: [
        {
          type: "h1",
          styles: ["text-black", "text-3xl"],
          content: "Goodbye world!",
        },
      ],
    },
  ];

  function parseTree(tree) {
    return tree.map((node, index) => {
      if (node.type === "div") {
        if (node.childrens) {
          return (
            <div key={index} className={node.styles.join(" ")}>
              {parseTree(node.childrens)}
            </div>
          );
        } else {
          return <div key={index} className={node.styles.join(" ")}></div>;
        }
      }
      if (node.type === "h1") {
        return (
          <h1 key={index} className={node.styles.join(" ")}>
            {node.content}
          </h1>
        );
      }
      return null;
    });
  }

  return <>{parseTree(page)}</>;
}
