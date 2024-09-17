export interface IToken {
  accessToken?: string;
}

export interface IUser extends IToken {
  _id?: string;
  id?: string;
  user_id?: string;
  email?: string;
  name?: string;
  role?: string;
}
