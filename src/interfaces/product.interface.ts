export interface IProductItem {
  products?: IProductItemProps[];
  id: number;
  imgPath: string;
  title: string;
}

export interface IProductItemsProps {
  productItems: IProductItem[];
  allProductsItems: IProductItemProps[];
}

export interface IProductItemProps {
  id: number;
  productSelectId: number;
  code: string;
  title: string;
  index: number;
}
