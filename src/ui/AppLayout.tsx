import Loader from "./Loader";
import NavBar from "./NavBar";
import { Outlet, useNavigation } from "react-router";
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
    </div>
  );
}
