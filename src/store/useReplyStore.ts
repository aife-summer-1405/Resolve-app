import { create } from "zustand";

interface ReplyState {
    replyId: string;
    setReplyId: (id: string) => void;
    clearReply: () => void;
}

export const useReplyStore = create<ReplyState>((set) => ({
    replyId: "",
    setReplyId: (id) => set({ replyId: id }),
    clearReply: () => set({ replyId: "" }),
}));