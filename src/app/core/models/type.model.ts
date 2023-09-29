import { DiscountModel } from './discount.model';

export class TypeModel {
  id: number;
  name: string;
  discounts: DiscountModel[] = [];
}
