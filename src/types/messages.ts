export type IMessage = {
  userId: number;
  userName: string;
  messageId: number;
  text: string;
  createdAt: Date;
};

export type IAddMessage = {
  userId: number;
  text: string;
};
