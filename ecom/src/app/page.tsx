'use client';

import { useState } from "react";
import ProductCard from "./ProductCard";
import { useCart } from "./CartContext";

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Men's Classic T-Shirt",
    price: 25.0,
    category: "Men",
    image: "/men/pexels-mostafasanadd-878358.jpg",
  },
  {
    id: 2,
    name: "Women's Summer Dress",
    price: 40.0,
    category: "Women",
    image: "/women/pexels-godisable-jacob-226636-794062.jpg",
  },
  {
    id: 3,
    name: "Men's Denim Jacket",
    price: 60.0,
    category: "Men",
    image: "/men/pexels-pixabay-157675.jpg",
  },
  {
    id: 4,
    name: "Women's Blouse",
    price: 30.0,
    category: "Women",
    image: "/women/pexels-olenagoldman-1021693.jpg",
  },
  {
    id: 5,
    name: "Men's Chinos Pants",
    price: 35.0,
    category: "Men",
    image: "/men/pexels-cottonbro-7763204.jpg",
  },
  {
    id: 6,
    name: "Women's Cardigan",
    price: 45.0,
    category: "Women",
    image: "/women/pexels-zayceva-tatiana-135444866-11971763.jpg",
  },
];

export default function Home() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);

  type CartItemType = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    qty: number;
    color?: string;
    size?: string;
  };
  const handleRemove = (item: CartItemType) => {
    removeFromCart(item.id, item.color, item.size);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 p-4 sm:p-8">
      <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 relative">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">EcomCloth</h1>
        <nav className="flex gap-4">
          <a href="#home" className="text-green-700 hover:underline font-medium">Home</a>
          <a href="#men" className="text-blue-700 hover:underline font-medium">Men</a>
          <a href="#women" className="text-pink-700 hover:underline font-medium">Women</a>
        </nav>
        {/* Cart Icon */}
        <button
          className="absolute right-0 top-0 sm:static flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow hover:bg-blue-100 transition-colors"
          onClick={() => setShowCart((v) => !v)}
          aria-label="View cart"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span className="font-bold text-blue-700">{cartCount}</span>
        </button>
        {/* Cart Dropdown/Modal */}
        {showCart && (
          <div className="absolute right-0 top-14 sm:top-auto sm:right-4 bg-white rounded-xl shadow-lg p-6 w-80 z-50 border border-blue-100">
            <h3 className="text-lg font-bold mb-4">Your Cart</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">Cart is empty.</p>
            ) : (
              <ul className="mb-4 max-h-48 overflow-y-auto">
                {cart.map((item) => (
                  <li key={`${item.id}-${item.color}-${item.size}`} className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.name} ({item.color}, {item.size}) x {item.qty}</span>
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                    <button
                      className="ml-2 text-red-500 hover:underline text-xs"
                      onClick={() => handleRemove(item)}
                    >Remove</button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-between items-center font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        )}
      </header>
      {/* Home Section (Hero) */}
      <section id="home" className="w-full flex flex-col items-center justify-center text-center py-12 sm:py-20 mb-10 bg-white/80 rounded-2xl shadow-lg">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-4">Welcome to EcomCloth</h2>
        <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-2xl">Discover the latest trends in men’s and women’s clothing. Shop our exclusive collection and enjoy a seamless, stylish shopping experience.</p>
        <a href="#products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow transition-colors">Shop Now</a>
      </section>
      <main>
        <h2 id="products" className="text-2xl font-semibold mb-6 text-center text-gray-800">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </main>
      <footer className="mt-12 text-center text-gray-500 text-sm">© 2024 EcomCloth. All rights reserved.</footer>
    </div>
  );
}
