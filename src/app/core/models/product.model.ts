import { CollectionModel } from './collection.model';
import { ProductColorModel } from './productColor.model';

export class ProductModel {
  id: number;
  name: string;
  description: string;
  slug: string = '';
  collectionId: number;
  image?: string;
  price?: number = 0;
  discount?: number;
  collection: CollectionModel;
  productColors: ProductColorModel[];
}
