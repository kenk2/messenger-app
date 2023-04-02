export type User = {
  userId: number;
  userName: string;
  avatar: string;
};

export type UserLookup = {
  [userId: number]: User;
};
