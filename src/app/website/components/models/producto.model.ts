import { Category } from './category.model';

export interface Producto {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}
export interface CreateProductDTO extends Omit<Producto, 'id' | 'category'> {
  categoryId: number;
}
export type UpdateProductDTO = Partial<CreateProductDTO>;
