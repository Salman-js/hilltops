import { Moment } from 'moment';

export interface IItem {
  id?: string;
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
