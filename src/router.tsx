import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import RootLayout from "./components/RootLayout";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
      <Route path="/menu" element={<Menu />} errorElement={<ErrorPage />} />
      <Route path="/cart" element={<Cart />} errorElement={<ErrorPage />} />
      <Route path="/checkout" element={<Checkout />} errorElement={<ErrorPage />} />
      <Route path="/order/:orderId" element={<Order />} errorElement={<ErrorPage />} />
    </Route>
  )
);

export default router;
