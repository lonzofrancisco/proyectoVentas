import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import MiniCart from "./MiniCart";
function StoreHeader({ business }) {
  const { cart, total, toggleCart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm sticky top-0 z-50">
  
  <h1 className="text-2xl font-bold tracking-tight">
    {business.name}
  </h1>

  <MiniCart />

</header>
  );
}

export default StoreHeader;