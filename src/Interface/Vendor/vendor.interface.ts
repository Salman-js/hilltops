import { IItem } from '../Item/item.interface';

export interface IVendor {
  id: string;
  vendorId: string;
  name: string;
  location?: string[];
  phone?: string;
  email?: string;
  commonItems?: IItem[];
}
