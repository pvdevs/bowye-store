import Product from './Product';

export default interface ProductsList {
  products?: [];
  items: Product[];
  setItems: React.Dispatch<React.SetStateAction<Product[]>>;
  totalItems?: number;
  currentProductId?: number;
  currentProduct?: Product;
}
