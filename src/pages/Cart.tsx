import { Link } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import { useAppSelector } from "../store/hooks.";
import { selectCartItems, selectCartTotal } from "../store/cartSlice";
import MenuItem from "../components/MenuItem";

const Cart = () => {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  return (
    <div className="text-center my-6">
      <BackBtn to={"/menu"}>Back to menu</BackBtn>
      <h2 className="text-3xl">Cart</h2>
      {cartItems.length ? (
        <>
          <ul className="my-4 w-full flex flex-col gap-4"></ul>
          {cartItems.map((item) => (
            <li className="marker:hidden" key={item.id}>
              <MenuItem item={item} readonly={true} />
            </li>
          ))}
          <div className="flex text-2xl px-4 w-full font-semibold items-center justify-between">
            <span>Total price</span>
            <span className="text-primary">€{cartTotal}</span>
          </div>
          <Link to={"/checkout"} className="btn btn-primary w-44">
            Checkout
          </Link>
        </>
      ) : (
        <h3 className="text-2xl">No items in the cart</h3>
      )}
    </div>
  );
};

export default Cart;
