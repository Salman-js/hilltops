export interface IUser {
  id: string;
  name: string;
  role: 'MANAGER' | 'POFFICER';
  username: string;
  password: string;
}
export interface ILoginType {
  username: string;
  password: string;
}
