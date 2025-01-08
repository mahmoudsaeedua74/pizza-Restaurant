import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

// Define the prop types for DeleteItem component
interface DeleteItemProps {
  pizzaId: string; // Pizza ID is expected to be a string
}

export default function DeleteItem({ pizzaId }: DeleteItemProps) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}
