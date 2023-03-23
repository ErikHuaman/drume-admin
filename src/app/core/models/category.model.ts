import { CollectionModel } from './collection.model';

export class CategoryModel {
  id: number;
  name: string;
  slug: string;
  image: string;
  active: boolean;
  coverImage?: string;
  collections: CollectionModel[] = [];
}
