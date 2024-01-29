import { Moment } from 'moment';
import { IDischarge, IItem } from '../Item/item.interface';
import { IVendor } from '../Vendor/vendor.interface';
import { IPurchase } from '../Purchase/purchase.interface';

export interface IUser extends ILoginType {
  id: string;
  name: string;
  role: 'MANAGER' | 'POFFICER';
  lastNotificationCheckTime?: Date | Moment;
}
export interface ILoginType {
  username: string;
  password: string;
}
export interface INotification {
  id: string;
  type: 'item' | 'vendor' | 'purchase' | 'discharge';
  name: string;
  time: Date | Moment;
  item: IItem | IVendor | IPurchase | IDischarge;
}

export interface IAlert {
  id: string;
  name: string;
}
