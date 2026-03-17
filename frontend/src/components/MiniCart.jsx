import { useContext, useState, useRef, useEffect } from "react";
import { CartContext } from "../context/CartContext";

function MiniCart() {

  const {
    cart,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useContext(CartContext);

  const [open, setOpen] = useState(false);
  const cartRef = useRef();

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // cerrar si haces click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  return (

    <div ref={cartRef} className="relative">

      {/* BOTON CARRITO */}

      <button
        onClick={() => setOpen(!open)}
        className="relative bg-black text-white px-4 py-2 rounded-lg"
      >
        🛒

        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            {totalItems}
          </span>
        )}

      </button>


      {/* PANEL CARRITO */}

      {open && (

        <div className="absolute right-0 mt-3 w-80 bg-white border shadow-xl rounded-xl p-4 z-50">

          <h3 className="font-semibold mb-3">
            Carrito
          </h3>


          {cart.length === 0 && (
            <p className="text-gray-500 text-sm">
              Carrito vacío
            </p>
          )}


          {cart.map(item => (

            <div
              key={item.id}
              className="flex justify-between items-center mb-3"
            >

              <div className="flex flex-col text-sm">

                <span>{item.name}</span>

                <span className="text-gray-500">
                  ${item.price}
                </span>

              </div>


              <div className="flex items-center gap-2">

                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-2 border rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-2 border rounded"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  🗑
                </button>

              </div>

            </div>

          ))}


          <div className="border-t pt-3 mt-3 font-semibold">
            Total: ${total}
          </div>


          <button
            onClick={() =>
              console.log(JSON.stringify(cart, null, 2))
            }
            className="w-full mt-3 bg-black text-white py-2 rounded-lg"
          >
            Finalizar compra
          </button>

        </div>

      )}

    </div>

  );
}

export default MiniCart;