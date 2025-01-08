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

import { ActionFunctionArgs } from "react-router-dom";

export async function action({ params }: ActionFunctionArgs): Promise<null> {
  const orderId = params?.orderId;

  if (!orderId) {
    throw new Error("Order ID is required for updating.");
  }

  const data = { priority: true };
  await updateOrder(orderId, data);

  return null;
}
