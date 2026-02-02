import * as Y from "yjs";

export const createYjsDoc = () => {
  const ydoc = new Y.Doc();
  const ytext = ydoc.getText("monaco");

  return { ydoc, ytext };
};
