import { ColorModel } from './color.model';
import { ColorSizeModel } from './colorSize.model';
import { DiscountModel } from './discount.model';

export class ProductColorModel {
  id: number;
  productId: number;
  colorId: number;
  image?: string;
  price?: number = 0;
  discountId: number;
  discount: DiscountModel;
  color: ColorModel;
  colorSizes: ColorSizeModel[];
}
