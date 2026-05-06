import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    // Crear una clave única considerando el meatCount si existe
    const itemKey = product.meatCount 
      ? `${product.id}-meat${product.meatCount}`
      : product.id;

    const existing = cart.find(item => 
      product.meatCount 
        ? item.id === product.id && item.meatCount === product.meatCount
        : item.id === product.id && !item.meatCount
    );

    if (existing) {
      setCart(cart.map(item =>
        (product.meatCount 
          ? item.id === product.id && item.meatCount === product.meatCount
          : item.id === product.id && !item.meatCount)
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: quantity }]);
    }
  };

  const removeFromCart = (id, meatCount = null) => {
    setCart(cart.filter(item => {
      if (meatCount !== null) {
        return !(item.id === id && item.meatCount === meatCount);
      }
      return item.id !== id;
    }));
  };

  const total = cart.reduce((acc, item) =>
    acc + item.price * item.quantity, 0
  );

  const increaseQuantity = (id, meatCount = null) => {
    setCart(cart.map(item =>
      meatCount !== null
        ? item.id === id && item.meatCount === meatCount
          ? { ...item, quantity: item.quantity + 1 }
          : item
        : item.id === id && !item.meatCount
          ? { ...item, quantity: item.quantity + 1 }
          : item
    ));
  };

  const decreaseQuantity = (id, meatCount = null) => {
    setCart(cart
      .map(item =>
        meatCount !== null
          ? item.id === id && item.meatCount === meatCount
            ? { ...item, quantity: item.quantity - 1 }
            : item
          : item.id === id && !item.meatCount
            ? { ...item, quantity: item.quantity - 1 }
            : item
      )
      .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = async (slug, customerName, customerPhone) => {
    try {
      const items = cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));

      const response = await fetch(`http://localhost:3001/api/store/${slug}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName,
          customerPhone,
          items
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error creando el pedido');
      }

      // Limpiar el carrito después de un pedido exitoso
      clearCart();

      return { success: true, order: data.order };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <CartContext.Provider value={{
  cart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  checkout,
  total
}}>
      {children}
    </CartContext.Provider>
  );
}