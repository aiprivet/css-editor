declare interface Node {
  nodeType: string | undefined;
  styles?: string[];
  id: string;
  parentId: string | null;
  childrens?: Node[] | undefined;
  imgSrc?: string | undefined;
  inputPlaceholder?: string | undefined;
  inputType?: string | undefined;
  inputValue?:string | undefined;
  textContent?: string | undefined;
  aHref?: string;
}

declare type NodeTree = Node[];
