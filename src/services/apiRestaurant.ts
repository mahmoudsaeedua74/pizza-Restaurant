const API_URL = "https://react-fast-pizza-api.onrender.com/api";

// تعريف أنواع البيانات المستخدمة
interface MenuItem {
  id: string;
  name: string;
  price: number;
  ingredients: string[];
}

interface Order {
  id: string;
  status: string;
  priority: boolean;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: { pizzaId: string; name: string; quantity: number; price: number }[];
}

interface NewOrder {
  cart: { pizzaId: string; quantity: number }[];
  priority: boolean;
}

interface UpdateOrderObj {
  status?: string;
  priority?: boolean;
  priorityPrice?: number;
}

// جلب قائمة الطعام
export async function getMenu(): Promise<MenuItem[]> {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw Error("Failed getting menu");

  const { data } = await res.json();
  return data;
}

// جلب تفاصيل الطلب باستخدام الـ ID
export async function getOrder(id: string): Promise<Order> {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

// إنشاء طلب جديد
export async function createOrder(newOrder: NewOrder): Promise<Order> {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error("Failed creating your order");
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

// تحديث الطلب
export async function updateOrder(id: string, updateObj: UpdateOrderObj): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error("Failed updating your order");
  } catch  {
    throw Error("Failed updating your order");
  }
}
