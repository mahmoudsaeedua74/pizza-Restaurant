import { useDispatch, useSelector } from "react-redux";
import { clearItem } from "./cartSlice";
import EmptyCart from "./EmptyCart";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import LinkButton from "../../ui/LinkButton";

// Define the type for a cart item
interface CartItemType {
  id: string;
  pizzaId: string;
  name: string;
  quantity: number;
  totalPrice: number;
}

// Define the state type for cart (an array of CartItemType)
interface RootState {
  cartSlice: {
    cart: CartItemType[];
  };
}

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cartSlice.cart);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-3 container mx-auto mt-24">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item: CartItemType) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearItem())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}
