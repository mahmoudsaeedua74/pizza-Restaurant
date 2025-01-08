import { useFetcher } from "react-router";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
interface Order {
  order: {
    id: string;
  };
}
function UpdateOrder({ order }: Order) {
  const fetcher = useFetcher();
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
  request: Request;
  params: { orderId: string };
}) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
