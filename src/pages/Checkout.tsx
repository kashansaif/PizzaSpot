import "react-credit-cards-2/dist/es/styles-compiled.css";
import BackBtn from "../components/BackBtn";
import CreditCard from "../components/CreditCard";
import { useAppDispatch, useAppSelector } from "../store/hooks.";
import { resetCart, selectCartItems, selectCartTotal } from "../store/cartSlice";
import { createOrder } from "../store/orderSlice";
import { createOrderId } from "../utils/order-utils";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return cartItems.length > 0 ? (
    <div className="my-6">
      <BackBtn to={"/cart"}>Back to cart</BackBtn>
      <div className="grid grid-cols-1 my-4 p-4 md:grid-cols-2 gap-8 card bg-base-300 shadow-xl">
        <section>
          <h2 className="text-2xl w-full text-center mb-4 card-title block">Order Summary</h2>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  );
                })}
                <tr className="font-semibold">
                  <td>Subtotal: </td>
                  <td></td>
                  <td>€{cartTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-2xl mb-4 card-title w-full block text-center">Payment Details</h2>
          <CreditCard
            handleSubmit={(state) => {
              const orderId = createOrderId();
              dispatch(
                createOrder({
                  id: orderId,
                  creditCardNum: state.number,
                  items: cartItems,
                  total: cartTotal,
                  state: "pending",
                })
              );
              dispatch(resetCart());
              navigate(`/order/${orderId}`);
            }}
          />
        </section>
      </div>
    </div>
  ) : (
    <div className="text-center my-6">
      <BackBtn to={"/menu"}>Back to menu</BackBtn>
      <h2 className="text-3xl">Chockout</h2>
      <h3 className="text-2xl">No items in the cart</h3>
    </div>
  );
};

export default Checkout;
