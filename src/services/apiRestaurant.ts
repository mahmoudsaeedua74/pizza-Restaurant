const API_URL = "https://react-fast-pizza-api.onrender.com/api";

interface MenuItem {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
}

interface Order {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: { pizzaId: number; quantity: number }[];
}

export async function getMenu(): Promise<MenuItem[]> {
  const res = await fetch(`${API_URL}/menu`);
  if (!res.ok) throw Error("Failed getting menu");
  const { data } = await res.json();
  return data;
}

export async function getOrder(id: string): Promise<Order> {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);
  const { data } = await res.json();

  // التأكد من تعيين قيم افتراضية إذا كانت بعض الخصائص مفقودة
  const order: Order = {
    id: data.id || "",
    customer: data.customer || "Unknown",
    phone: data.phone || "",
    address: data.address || "",
    priority: data.priority || false,
    estimatedDelivery: data.estimatedDelivery || "",
    cart: data.cart || [],
  };

  return order;
}

export async function createOrder(newOrder: MenuItem[]): Promise<Order> {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify({
        customer: "Customer Name", // يجب ملء هذا الحقل
        phone: "Customer Phone", // يجب ملء هذا الحقل
        address: "Customer Address", // يجب ملء هذا الحقل
        priority: false, // تحديد أولوية إذا كانت ضرورية
        estimatedDelivery: "2025-01-01T00:00:00Z", // تحديد وقت التسليم المتوقع
        cart: newOrder.map((item) => ({ pizzaId: item.id, quantity: 1 })),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(
  id: string,
  updateObj: Partial<Order>
): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error();
  } catch {
    throw Error("Failed updating your order");
  }
}
