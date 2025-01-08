import { formatCurrency } from "../../utils/helper";
import DeleteItem from "./DeleteItem";
import UpdataItemQuantity from "./UpdataItemQuantity";

// Define the type for the 'item' prop
interface CartItemProps {
  item: {
    pizzaId: string; // or number, adjust based on your data
    name: string;
    quantity: number;
    totalPrice: number;
  };
}

function CartItem({ item }: CartItemProps) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdataItemQuantity pizzaId={pizzaId} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
