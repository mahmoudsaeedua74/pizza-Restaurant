import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";
import NavBar from "./NavBar";
import { Outlet, useNavigation } from "react-router-dom";
export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="overflow-x-hidden">
      {isLoading && <Loader />}
      <NavBar />
      <div>
        <Outlet />
      </div>
      <CartOverview/>
    </div>
  );
}
