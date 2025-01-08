import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

interface Order {
  order: {
    id: string;
  };
}

interface UpdateOrderProps {
  order: Order;
}

function UpdateOrder({ order }: UpdateOrderProps) {
  const fetcher = useFetcher();
  console.log(order);

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({
  params,
}: {
  params: { orderId: string };
}) {
  const data = { priority: true };

  // تحديث الطلب باستخدام orderId
  if (params?.orderId) {
    await updateOrder(params.orderId, data);
  }

  return null;
}
