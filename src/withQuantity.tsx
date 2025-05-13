import { ComponentType, FC } from "react";
import { Pizza } from "./data/menu-items";
import { useAppSelector } from "./store/hooks";
import { CartItem, selectItemQuantity } from "./store/CartSlice";
import { MenuItemProps } from "./components/MenuItem";

type WithQuantityProps = {
  item: Pizza;
};

const WithQuantity = (Component: ComponentType<MenuItemProps>) => {
  const WithQuantityComponent: FC<WithQuantityProps> = (props) => {
    const { item } = props;
    const quantity = useAppSelector(selectItemQuantity(item));
    const cartItem: CartItem = {
      ...item,
      quantity,
    };
    return <Component item={cartItem} />;
  };
  return WithQuantityComponent;
};

export default WithQuantity;
