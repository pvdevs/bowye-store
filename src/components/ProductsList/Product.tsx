export default interface Product {
  image: string;
  title: string;
  id: number;
  category: string;
  description: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  quantity?: number;
}
