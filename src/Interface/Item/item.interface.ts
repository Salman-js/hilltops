import { Moment } from 'moment';
import { IUser } from '../User/user.interface';
import { IVendor } from '../Vendor/vendor.interface';

export interface IItem {
  id: string;
  itemId: string;
  name: string;
  unitPrice: number;
  category?: string[];
  lastPurchaseDate?: Date | Moment;
  lowQuantityWarning?: number;
  startQuantity?: number;
  approved: boolean;
  vendors?: IVendor[];
  description?: string;
  user: IUser;
  createdAt: Date | Moment;
}

export interface IDischarge {
  id: string;
  orderNo: string;
  item: IItem;
  quantity: number;
  date: Date | Moment;
  approved: boolean;
  toBeReturned: boolean;
  returnDate?: Date | Moment;
  givenTo?: string;
  note?: string;
  user: IUser;
  createdAt: Date | Moment;
}
