export default interface Product {
  cover: string;
  title: string;
  id: number;
  category: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  productQuantity: {
    quantity: number;
    decrementQuantity: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
    incrementQuantity: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
  };
}
