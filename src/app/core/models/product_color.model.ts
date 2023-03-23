import { ColorModel } from './color.model';
import { ColorSizeModel } from './color_size.model';

export class ProductColorModel {
  id: number;
  productId: number;
  colorId: number;
  image?: string;
  price?: number = 0;
  discountId: number;
  color: ColorModel;
  color_sizes: ColorSizeModel[];
}
