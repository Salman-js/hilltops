import { Moment } from 'moment';

export interface IItem {
  id: string;
  itemId: string;
  name: string;
  unitPrice: number;
  category?: string[];
  lastPurchaseDate?: Date | Moment;
  startQuantity?: number;
  approved: boolean;
  vendors?: string[];
  description?: string;
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
}
