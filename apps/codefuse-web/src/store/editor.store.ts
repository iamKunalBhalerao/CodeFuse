import { create } from "zustand";

type EditorState = {
  ready: boolean;
  setReady: () => void;
};

export const useEditorState = create<EditorState>((set) => ({
  ready: false,
  setReady: () => set({ ready: true }),
}));
