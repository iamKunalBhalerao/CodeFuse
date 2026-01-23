import * as Y from "yjs";

export const bindYjsToWS = async (doc: Y.Doc, socket: WebSocket, roomId: string) => {
  doc.on("update", (update) => {
    socket.send(
      JSON.stringify({
        type: "YJS_UPDATE",
        payload: {
          state: Array.from(update),
          roomId
        },
      }),
    );
  });

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const update = new Uint8Array(message.payload.state);
    Y.applyUpdate(doc, update);
  };
};
