import * as Y from "yjs";

export const createYjsDoc = () => {
  const doc = new Y.Doc();
  const text = doc.getText("editor");

  return { doc, text };
};
