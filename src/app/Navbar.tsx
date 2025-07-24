"use client";
import { useCart } from "./CartContext";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { cart, removeFromCart, cartLoaded } = useCart();
  const [showCart, setShowCart] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 relative">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">
        <Link href="/">EcomCloth</Link>
      </h1>
      <nav className="flex gap-4">
        <Link href="/" className="text-green-700 hover:underline font-medium">Home</Link>
        <Link href="#men" className="text-blue-700 hover:underline font-medium">Men</Link>
        <Link href="#women" className="text-pink-700 hover:underline font-medium">Women</Link>
      </nav>
      {/* Cart Icon */}
      <button
        className="absolute right-0 top-0 sm:static flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow hover:bg-blue-100 transition-colors"
        onClick={() => setShowCart((v) => !v)}
        aria-label="View cart"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        {cartLoaded ? (
          <span className="font-bold text-blue-700">{cartCount}</span>
        ) : (
          <span className="font-bold text-blue-700">...</span>
        )}
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
                    onClick={() => removeFromCart(item.id, item.color, item.size)}
                  >Remove</button>
                </li>
              ))}
            </ul>
          )}
          <button
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            disabled={cart.length === 0}
          >
            Checkout
          </button>
        </div>
      )}
    </header>
  );
} 