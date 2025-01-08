import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

// تعريف نوع الـ Pizza
interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  unitPrice: number; // أضفنا هذه الخاصية
  ingredients: string[]; // أضفنا هذه الخاصية
  soldOut: boolean; // أضفنا هذه الخاصية
  imageUrl: string; // أضفنا هذه الخاصية
}

// مكون Menu
function Menu() {
  const menu = useLoaderData() as Pizza[]; // تحديد نوع البيانات المحملة هنا

  return (
    <ul className=" overflow-hidden mt-24">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// الدالة loader لتحميل البيانات
export async function loader(): Promise<any[]> {
  const menu = await getMenu(); // جلب البيانات من الـ API
  return menu;
}

export default Menu;
