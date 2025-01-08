// src/features/cart/UpdataItemQuantity.tsx
import { useDispatch, useSelector } from "react-redux";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  getCurrentQuantityById,
} from "./cartSlice";
import Button from "../../ui/Button";

interface UpdataItemQuantityProps {
  pizzaId: string; 
}

const UpdataItemQuantity: React.FC<UpdataItemQuantityProps> = ({ pizzaId }) => {
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  const dispatch = useDispatch();

  return (
    <div className="flex gap-1 items-center md:gap-3">
      <Button
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        type={"round"}
      >
        +
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        type={"round"}
      >
        -
      </Button>
    </div>
  );
};

export default UpdataItemQuantity;
