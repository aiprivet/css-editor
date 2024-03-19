import { useCreatePageStore, useSelectedNodeStore } from "../../store/useStore";

import addChidlren from "../../utils/addChildren";
import { createNode } from "../../utils/createNode";
import { useEffect, useState } from "react";
import CreateDivNodeForm from "./CreateDivNodeForm";
import CreateTextNodeForm from "./CreateTextNodeForm";
import CreateInputNodeForm from "./CreateInputNodeForm";
import CreateImgNodeForm from "./CreateImgNodeForm";
import CreateAHrefNodeForm from "./CreateAHrefNodeForm";
import CreateButtonNodeForm from "./CreateButtonNodeForm";
export default function CreateNodeForm() {
  const page = useCreatePageStore(function (state) {
    return state.page;
  });

  const updatePage = useCreatePageStore(function (state) {
    return state.updatePage;
  });

  const [nodeType, setNodeType] = useState("div");

  const [nodeStyle, setNodeStyles] = useState("");

  const [textContent, setTextContent] = useState("");

  const [aHref, setAHref] = useState("");

  const [imgSrc, setImgSrc] = useState("");

  const [inputPlaceholder, setInputPlaceholder] = useState("");

  const [inputType, setInputType] = useState("");

  const [inputValue, setInputValue] = useState("");

  const [formNodeType, setFormNodeType] = useState("div");

  const selectedNode = useSelectedNodeStore(function (state) {
    return state.selectedNode;
  });

  const updateSelectedNode = useSelectedNodeStore(function (state) {
    return state.updateSelectedNode;
  });

  function cls(nodeStyle) {
    return nodeStyle.split(" ");
  }

  const nodeParams = {
    div: [selectedNode.id, cls(nodeStyle)],
    h1: [selectedNode.id, cls(nodeStyle), textContent],
    h2: [selectedNode.id, cls(nodeStyle), textContent],
    h3: [selectedNode.id, cls(nodeStyle), textContent],
    h4: [selectedNode.id, cls(nodeStyle), textContent],
    h5: [selectedNode.id, cls(nodeStyle), textContent],
    h6: [selectedNode.id, cls(nodeStyle), textContent],
    p: [selectedNode.id, cls(nodeStyle), textContent],
    span: [selectedNode.id, cls(nodeStyle), textContent],
    a: [selectedNode.id, cls(nodeStyle), textContent, aHref],
    img: [selectedNode.id, cls(nodeStyle), imgSrc],
    input: [
      selectedNode.id,
      cls(nodeStyle),
      inputPlaceholder,
      inputType,
      inputValue,
    ],
    button: [selectedNode.id, cls(nodeStyle), textContent, aHref],
  };

  const nodeTypes = ["div", "text", "img", "button", "input", "a"];

  const nodeFormByType = {
    div: (
      <CreateDivNodeForm
        nodeStyle={nodeStyle}
        setNodeStyles={setNodeStyles}
      ></CreateDivNodeForm>
    ),
    text: (
      <CreateTextNodeForm
        nodeStyle={nodeStyle}
        setNodeStyles={setNodeStyles}
        setNodeType={setNodeType}
        nodeType={nodeType}
        textContent={textContent}
        setTextContent={setTextContent}
      ></CreateTextNodeForm>
    ),
    a: (
      <CreateAHrefNodeForm
        nodeStyle={nodeStyle}
        setNodeStyles={setNodeStyles}
        aHref={aHref}
        setAHref={setAHref}
        textContent={textContent}
        setTextContent={setTextContent}
      ></CreateAHrefNodeForm>
    ),
    img: (
      <CreateImgNodeForm
        nodeStyle={nodeStyle}
        setNodeStyles={setNodeStyles}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
      ></CreateImgNodeForm>
    ),
    input: (
      <CreateInputNodeForm
        nodeStyle={nodeStyle}
        setNodeStyles={setNodeStyles}
        inputPlaceholder={inputPlaceholder}
        setInputPlaceholder={setInputPlaceholder}
        inputType={inputType}
        setInputType={setInputType}
        inputValue={inputValue}
        setInputValue={setInputValue}
      ></CreateInputNodeForm>
    ),
    button: (
      <CreateButtonNodeForm
        nodeStyle={nodeStyle}
        setNodeStyles={setNodeStyles}
        textContent={textContent}
        setTextContent={setTextContent}
      ></CreateButtonNodeForm>
    ),
  };

  function handleSubmit(event) {
    event.preventDefault();
    addChidlren(
      selectedNode.id,
      createNode[nodeType](...nodeParams[nodeType]),
      page,
      updateSelectedNode,
      updatePage
    );
  }
  return (
    <div className="border border-neutral-200 bg-neutral-100 rounded-xl p-8 z-50 ">
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-center text-xl font-bold mb-2">Добавить узел</h1>
        <label>Тип элемента</label>
        <select
          value={formNodeType}
          onChange={(event) => {
            setFormNodeType(event.target.value);
            if (event.target.value === "text") {
              setNodeType("h1");
            } else {
              setNodeType(event.target.value);
            }
          }}
          className="border border-neutral-300 p-2 rounded-lg "
        >
          {nodeTypes.map(function (type) {
            return (
              <option key={type} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        {nodeFormByType[formNodeType]}
      </form>
    </div>
  );
}
