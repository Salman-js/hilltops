import { Moment } from 'moment';
import { IVendor } from '../Vendor/vendor.interface';
import { IItem } from '../Item/item.interface';

export interface IPurchase {
  id?: string;
  orderNo: string;
  date: Date | Moment;
  vendorId: string;
  approved: boolean;
  vendor: IVendor;
  items: IPItem[];
}
export interface IPItem {
  id: string;
  itemId?: string;
  item?: IItem;
  unitPrice: number;
  quantity: number;
  description?: string;
}
