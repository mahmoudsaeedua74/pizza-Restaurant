import { useFetcher, useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helper";
import OrderItem from "./OrderItem";
import { getOrder } from "../../services/apiRestaurant";
import { useEffect } from "react";

// تعريف الواجهات لأنواع البيانات
interface CartItem {
  id: string;
  quantity: number;
  name: string;
  totalPrice: number;
}

interface OrderData {
  id: string;
  status: string;
  priority: boolean;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: CartItem[];
}

function Order() {
  const order = useLoaderData() as OrderData; // تحميل البيانات من الـ loader
  const fetcher = useFetcher(); // لاستخدام fetcher لجلب البيانات بشكل ديناميكي

  // تحميل البيانات إذا لم تكن موجودة أو إذا كانت الحالة idle
  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  // استخراج البيانات من order
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  // حساب الوقت المتبقي للتوصيل
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6 container mx-auto mt-20">
      {/* العنوان وحالة الطلب */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>
        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      {/* عرض الوقت المتبقي للتوصيل */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      {/* عرض تفاصيل المنتجات في الطلب */}
      <ul className="divide-stone-200 divide-y border-b border-t">
        {cart.map((item, index) => (
          <OrderItem item={item} key={index} />
        ))}
      </ul>

      {/* عرض الأسعار الإجمالية للطلب */}
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

// تعريف loader لجلب بيانات الطلب باستخدام orderId
export async function loader({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
