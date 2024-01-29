import { Moment } from 'moment';
import { IItem } from '../Item/item.interface';
import { IUser } from '../User/user.interface';

export interface IVendor {
  id: string;
  vendorId: string;
  name: string;
  location?: string[];
  phone?: string;
  email?: string;
  commonItems?: IItem[];
  user: IUser;
  createdAt: Date | Moment;
}
