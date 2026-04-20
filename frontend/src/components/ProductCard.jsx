import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  // Construir la URL completa de la imagen desde el backend
  const imageUrl = product.image_medium ? `http://localhost:3001${product.image_medium}` : '/placeholder-image.jpg';

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between">
      
      <img src={imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-xl mb-4" />

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