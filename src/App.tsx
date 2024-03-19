import { useCreatePageStore, useSelectedNodeStore } from "./store/useStore";
import CreateNodeForm from "./components/CreateNode/CreateNodeForm";
import EditNodeForm from "./components/EditNode/EditNodeForm";
import DivNode from "./components/nodes/BlockNodes/DivNode";
import H1Node from "./components/nodes/TextNodes/H1Node";
import H2Node from "./components/nodes/TextNodes/H2Node";
import H3Node from "./components/nodes/TextNodes/H3Node";
import H4Node from "./components/nodes/TextNodes/H4Node";
import H5Node from "./components/nodes/TextNodes/H5Node";
import H6Node from "./components/nodes/TextNodes/H6Node";
import PNode from "./components/nodes/TextNodes/PNode";
import SpanNode from "./components/nodes/TextNodes/SpanNode";
import ANode from "./components/nodes/TextNodes/ANode";
import InputNode from "./components/nodes/InputNodes/InputNode";
import ImgNode from "./components/nodes/ImageNode/ImgNode";
import ButtonNode from "./components/nodes/ButtonNode/BtnNode";
import { SiTailwindcss } from "react-icons/si";
import Button from "./ui/Button/Button";
import { FaArrowUp } from "react-icons/fa6";

export default function App() {
  const page = useCreatePageStore(function (state) {
    return state.page;
  });
  const selectedNode = useSelectedNodeStore(function (state) {
    return state.selectedNode;
  });
  function parseTree(tree: NodeTree) {
    return tree.map(function (node: Node) {
      const { nodeType } = node;
      if (nodeType === "div") {
        if (node.childrens.length > 0) {
          return (
            <DivNode key={node.id} node={node}>
              {parseTree(node.childrens)}
            </DivNode>
          );
        } else return <DivNode key={node.id} node={node} />;
      }
      if (nodeType === "h1") {
        if (node.childrens.length > 0) {
          return (
            <H1Node key={node.id} node={node}>
              {parseTree(node.childrens)}
            </H1Node>
          );
        } else return <H1Node key={node.id} node={node}></H1Node>;
      }
      if (nodeType === "h2") {
        if (node.childrens.length > 0) {
          return (
            <H2Node key={node.id} node={node}>
              {parseTree(node.childrens)}
            </H2Node>
          );
        } else return <H2Node key={node.id} node={node}></H2Node>;
      }
      if (nodeType === "h3") {
        if (node.childrens.length > 0) {
          return (
            <H3Node key={node.id} node={node}>
              {parseTree(node.childrens)}
            </H3Node>
          );
        } else return <H3Node key={node.id} node={node}></H3Node>;
      }
      if (nodeType === "h4") {
        if (node.childrens.length > 0) {
          return (
            <H4Node key={node.id} node={node}>
              {parseTree(node.childrens)}
            </H4Node>
          );
        } else return <H4Node key={node.id} node={node}></H4Node>;
      }
      if (nodeType === "h5") {
        if (node.childrens.length > 0) {
          return (
            <H5Node key={node.id} node={node}>
              {parseTree(node.childrens)}
            </H5Node>
          );
        } else return <H5Node key={node.id} node={node}></H5Node>;
      }
      if (nodeType === "h6") {
        if (node.childrens.length > 0) {
          return (
            <H6Node key={node.id} node={node}>
              {parseTree(node.childrens)}
            </H6Node>
          );
        } else return <H6Node key={node.id} node={node}></H6Node>;
      }
      if (nodeType === "p") {
        if (node.childrens.length > 0) {
          return (
            <PNode key={node.id} node={node}>
              {parseTree(node.childrens)}
            </PNode>
          );
        } else return <PNode key={node.id} node={node}></PNode>;
      }
      if (nodeType === "span") {
        if (node.childrens.length > 0) {
          return (
            <SpanNode key={node.id} node={node}>
              {parseTree(node.childrens)}
            </SpanNode>
          );
        } else return <SpanNode key={node.id} node={node}></SpanNode>;
      }
      if (nodeType === "a") {
        if (node.childrens.length > 0) {
          return (
            <ANode key={node.id} node={node}>
              {parseTree(node.childrens)}
            </ANode>
          );
        } else return <ANode key={node.id} node={node}></ANode>;
      }

      if (nodeType === "button") {
        if (node.childrens.length > 0) {
          return (
            <ButtonNode key={node.id} node={node}>
              {parseTree(node.childrens)}
            </ButtonNode>
          );
        } else return <ButtonNode key={node.id} node={node}></ButtonNode>;
      }
      if (nodeType === "input") {
        return <InputNode key={node.id} node={node}></InputNode>;
      }
      if (nodeType === "img") {
        return <ImgNode key={node.id} node={node}></ImgNode>;
      }
      return null;
    });
  }

  return (
    <>
      <div className="hidden bg-white w-screen h-12 fixed border-b border-neutral-100 hover:flex justify-between p-6">
        <div className="flex justify-center items-center gap-2 ml-2">
          <div className="text-sky-500">
            <SiTailwindcss size={24} />
          </div>
          <p className="text-sky-950">Tailwind editor</p>
        </div>

        <div className="flex justify-center items-center gap-2 ">
          <Button type={"danger"}>Удалить все</Button>
          <Button type={"primary"}>Импортировать</Button>
          <Button type={"success"}>Сохранить</Button>
        </div>
      </div>
      <div className="">{parseTree(page)}</div>

      <div className="fixed right-8 bottom-8">
        <CreateNodeForm />
      </div>
      <div className="fixed bottom-8 left-8">
        <EditNodeForm />
      </div>
    </>
  );
}
