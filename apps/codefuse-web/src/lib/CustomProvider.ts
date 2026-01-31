import * as Y from "yjs";
import { Observable } from "lib0/observable";

export class CustomProvider extends Observable<any> {
  /**
   * @param {Y.Doc} doc
   */

  constructor(ydoc) {
    super();
    ydoc.on("update", (update, origin) => {
      if (origin !== this) {
        this.emit("update", [update]);
      }
    });

    this.on("update", (update) => {
      Y.applyUpdate(ydoc, update, this);
    });
  }
}
