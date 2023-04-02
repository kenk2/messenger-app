export type IMessage = {
  userId: number;
  messageId: number;
  text: string;
  createdAt: Date;
};

export type IAddMessage = {
  userId: number;
  text: string;
};
