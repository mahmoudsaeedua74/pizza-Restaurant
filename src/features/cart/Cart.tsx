import { useDispatch, useSelector } from "react-redux";
import { clearItem } from "./cartSlice";
import EmptyCart from "./EmptyCart";
import Button from "../../ui/Button";
import CartItem from "./CartItem";

// Define the type for a cart item
interface CartItemType {
  id: string; // or number, depending on your data
  pizzaId: string;
  name: string;
  quantity: number;
  totalPrice: number;
}

// Define the state type for cart (an array of CartItemType)
interface RootState {
  cart: CartItemType[];
}

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="cart-container">
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <Button type="primary" onClick={() => dispatch(clearItem())}>Clear Cart</Button>
    </div>
  );
}
