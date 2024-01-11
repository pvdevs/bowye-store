export default interface Product {
  cover: string;
  title: string;
  category: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}
