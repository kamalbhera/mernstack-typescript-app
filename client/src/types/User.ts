export interface IUser {
  _id: string
  name: string;
  createdAt: string;
  isAdmin?: boolean;
  totalPolls?: number;
}

export interface IUsers {
  users: IUser[];
  totalItems: number;
}
