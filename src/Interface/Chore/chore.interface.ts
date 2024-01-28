import { Moment } from 'moment';
import { IUser } from '../User/user.interface';

export interface IChore {
  id: string;
  title: string;
  done?: boolean;
  description?: string;
  date: Date | Moment;
  user: IUser;
}
