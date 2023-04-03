interface IAuth {
  email: string;
  password: string;
}

export interface ISignUp extends IAuth {}
export interface ISignIn extends IAuth {}

export interface IUserModel {
  diskSpace: number;
  email: string;
  id: string;
  usedSpace: 0;
  avatar: string;
}

export interface IUserAuthData {
  token: string;
  user: IUserModel;
}
