import { Moment } from 'moment';

export interface IChore {
  id: string;
  title: string;
  done?: boolean;
  date: Date | Moment;
}
