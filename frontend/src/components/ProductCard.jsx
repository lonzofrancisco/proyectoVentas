import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between">
      
      <div>
        <h3 className="font-semibold text-lg">{product.name}</h3>

        <p className="text-gray-500 text-sm mt-1">
          {product.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-green-600">
          ${product.price}
        </span>

        <button
          onClick={() => addToCart(product)}
          className="bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;