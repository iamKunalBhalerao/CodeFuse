import * as Y from "yjs";

type Doc = Y.Doc;

// Encode SnapShot
const snapShot = Y.encodeStateAsUpdate(doc as Doc);

// Decode SnapShot
Y.applyUpdate(doc as Doc, snapShot);
