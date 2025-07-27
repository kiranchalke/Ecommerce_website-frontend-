"use client";
import { useCart } from "./CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  category?: "All" | "Men" | "Women";
  setCategory?: (cat: "All" | "Men" | "Women") => void;
}

export default function Navbar({ category, setCategory }: NavbarProps) {
  const { cart, removeFromCart, cartLoaded } = useCart();
  const [showCart, setShowCart] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const router = useRouter();

  // Handler for navigation if setCategory is not provided
  const handleNav = (cat: "All" | "Men" | "Women") => {
    if (setCategory) {
      setCategory(cat);
    } else {
      // Navigate to main page with category as query param
      const param = cat === "All" ? "" : `?category=${cat}`;
      router.push(`/${param}`);
    }
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 relative">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">EcomCloth</h1>
      <nav className="flex gap-4">
        <button
          className={`text-green-700 hover:underline font-medium ${category === "All" ? "underline" : ""}`}
          onClick={() => handleNav("All")}
        >
          Home
        </button>
        <button
          className={`text-blue-700 hover:underline font-medium ${category === "Men" ? "underline" : ""}`}
          onClick={() => handleNav("Men")}
        >
          Men
        </button>
        <button
          className={`text-pink-700 hover:underline font-medium ${category === "Women" ? "underline" : ""}`}
          onClick={() => handleNav("Women")}
        >
          Women
        </button>
      </nav>
      {/* Cart Icon */}
      <div className="relative">
        <button
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow hover:bg-blue-100 transition-colors"
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
          <div
            className="absolute right-0 mt-3 w-80 max-w-[95vw] z-50 bg-white rounded-xl shadow-2xl border border-blue-100 p-6"
            style={{ top: '100%', minWidth: '320px' }}
          >
            <h3 className="text-lg font-bold mb-4">Your Cart</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">Cart is empty.</p>
            ) : (
              <ul className="mb-4 max-h-60 overflow-y-auto divide-y divide-blue-50">
                {cart.map((item) => (
                  <li
                    key={`${item.id}-${item.color}-${item.size}`}
                    className="flex flex-col gap-1 py-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm truncate max-w-[140px]">
                        {item.name}
                      </span>
                      <span className="text-sm font-semibold text-blue-700">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                      <span>Qty: {item.qty}</span>
                      {item.color && <span>Color: {item.color}</span>}
                      {item.size && <span>Size: {item.size}</span>}
                    </div>
                    <button
                      className="self-end text-xs text-red-500 hover:underline mt-1"
                      onClick={() => removeFromCart(item.id, item.color, item.size)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </header>
  );
} 