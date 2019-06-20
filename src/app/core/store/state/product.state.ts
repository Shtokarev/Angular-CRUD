import { IProduct } from '@app/core/models';

export interface IProductState {
  products: IProduct[];
  selectedProduct: IProduct | null;
}

export const initialProductState: IProductState = {
  products: [
    {
      id: 1,
      name: 'Name 1',
      description: 'Initial store for testing get method 1',
      price: 100,
      qty: 10
    } as IProduct,
    {
      id: 2,
      name: 'Name 2',
      description: 'Initial store for testing get method 2',
      price: 1000,
      qty: 100
    } as IProduct
  ],
  selectedProduct: null
};
