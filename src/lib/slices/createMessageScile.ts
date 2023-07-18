import { StateCreator } from 'zustand';

type IMessageSlice = {
  createdAt: Date;
};

export interface MessageSlice {
  currentMessage: IMessageSlice | null;
  setCurrentMessage: (message: IMessageSlice) => void;
}

export const createMessageSlice: StateCreator<MessageSlice> = (set) => ({
  currentMessage: null,
  setCurrentMessage: (currentMessage: IMessageSlice) => {
    set({ currentMessage: currentMessage });
  },
});
