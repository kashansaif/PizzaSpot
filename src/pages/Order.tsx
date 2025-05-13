import { useParams } from "react-router-dom";
import MenuItem from "../components/MenuItem";
import { useAppSelector } from "../store/hooks.";
import BackBtn from "../components/BackBtn";

const Order = () => {
  const { orderId } = useParams();
  const items = useAppSelector((state) => state.order.items);
  const matchingOrder = items.find((item) => item.id == orderId);
  const order = {
    items: matchingOrder?.items,
    total: matchingOrder?.total,
    creditCardNum: "**** **** **** 1234",
  };
  return (
    <div className="my-6">
      <BackBtn to={"/menu"}>Back to menu</BackBtn>
      <h2 className="text-3xl text-center my-4">`Order ${orderId}`</h2>
      <div className="card bg-base-100 p-4">
        <div className="card-body gap-8">
          <div className="mx-5 card-title">Items</div>
          {order.items?.map((item) => {
            return <MenuItem readonly={true} item={item} />;
          })}
          <div className="card-title mx-5 flex justify-between">
            <span>Total:</span> <span>€{order.total}</span>
          </div>
          <div className="card-title mx-5 flex justify-between">
            <span>Paid with:</span> <span>{order.creditCardNum}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
