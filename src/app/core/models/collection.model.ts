import { CategoryModel } from './category.model';

export class CollectionModel {
  id: number;
  name: string;
  shortName: string;
  image: string;
  slug: string;
  categoryId: number;
  active: boolean;
  category: CategoryModel;
}
