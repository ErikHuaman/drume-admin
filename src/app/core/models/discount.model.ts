import { TypeModel } from './type.model';

export class DiscountModel {
  id: number;
  name: string;
  typeId: number;
  percent: number;
  fixed: number;
  quantity: number;
  quantityPay: number;
  code: string;
  expire: string;
  active: boolean;
  type: TypeModel;
}
