import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Error from "./ui/Error";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order,{ loader as orderLoader } from "./features/order/Order";
import {  action as updateOrderAction  } from "./features/order/UpataOrder";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./ui/NotFoundPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: menuLoader,
        },
        { path: "", element: <Home /> },
        { path: "*", element: <NotFoundPage /> },
        {
          path: "/menu",
          element: <Menu />,
          loader: menuLoader,
          errorElement: <Error />,
        },
        { path: "", element: <Home /> },
        { path: "/Cart", element: <Cart /> },
        {
          path: "/order/new",
          element: <CreateOrder />,
          action: createOrderAction,
        },
        {
          path: "/order/:orderId",
          element: <Order />,
          loader: orderLoader,
          errorElement: <Error />,
          action: updateOrderAction,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 1000,
          },
          error: {
            duration: 4000,
          },
        }}
      />
    </>
  );
}

export default App;
