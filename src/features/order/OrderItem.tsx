import { formatCurrency } from "../../utils/helper";

// تعريف واجهة `Item`
interface CartItem {
  id: string;
  quantity: number;
  name: string;
  totalPrice: number;
}

interface OrderItemProps {
  item: CartItem;
  isLoadingIngredients?: boolean;
  ingredients?: string[]; // يمكن تحديد المزيد من الخصائص حسب الحاجة
}

function OrderItem({ item }: OrderItemProps) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
