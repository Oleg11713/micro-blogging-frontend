export interface IUser {
  id: number;
  displayName: string;
  age: number;
  email: string;
  password: string;
  role: string;
  isActivated: boolean;
  activationLink: string;
}
