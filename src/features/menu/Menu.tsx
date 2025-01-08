import { useLoaderData } from "react-router";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import CartOverview from "../cart/CartOverview";

// Define the type for a pizza item
interface Pizza {
  id: string;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
}

function Menu() {
  const menu = useLoaderData<Pizza[]>(); // Type the loader data as an array of Pizza
  return ( <> 
    <ul className="py-20 bg-[#EFEEE8]">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}

    </ul>
  <CartOverview/>
  </>

  );
}

// Update loader to return typed data
export async function loader() {
  const menu = await getMenu();
  return menu ; // Type the return value of the loader function
}

export default Menu;
