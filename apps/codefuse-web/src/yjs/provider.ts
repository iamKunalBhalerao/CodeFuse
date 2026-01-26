import * as Y from "yjs";

export const bindYjsToWS = async (
  doc: Y.Doc,
  socket: WebSocket,
  roomId: string,
) => {
  doc.on("update", (update) => {
    socket.send(
      JSON.stringify({
        type: "YJS_UPDATE",
        payload: {
          state: Buffer.from(update).toString("base64"), // <-- base64 string
          roomId,
        },
      }),
    );
  });

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "YJS_UPDATE") {
      const update = new Uint8Array(Buffer.from(message.payload.state, "base64"));
      Y.applyUpdate(doc, update);
    }
  };
};
