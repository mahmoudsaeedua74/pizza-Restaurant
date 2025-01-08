import { useDispatch, useSelector } from "react-redux";
import { clearItem, getCarts } from "./cartSlice";
import EmptyCart from "./EmptyCart";
import LinkButton from "../../ui/LinkButton";
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
  // Use the typed useSelector to get the cart state
  const cart = useSelector((state: RootState) => getCarts(state));
  const dispatch = useDispatch();

  function handleClearItem() {
    dispatch(clearItem());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3 mt-20 container mx-auto">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, {"username"}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item, index) => (
          <CartItem item={item} key={index} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={handleClearItem}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}
