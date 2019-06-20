export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  qty: number;
}

export interface IProductsHttp {
  products: IProduct[];
}
