import { SizeModel } from './size.model';

export class ColorSizeModel {
  id: number;
  productColorId: number;
  sizeId: number;
  stock: number;
  size: SizeModel;
  active: boolean;
}
