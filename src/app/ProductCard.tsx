"use client";
import Image from "next/image";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, qty?: number) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent click from Add to Cart button or modal
    if ((e.target as HTMLElement).closest("button")) return;
    window.open(`/product/${product.id}`, "_blank");
  };

  const handleAddToCart = () => {
    setShowModal(true);
    setQuantity(1);
    setAdded(false);
  };

  const handleConfirm = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setShowModal(false), 1200);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform relative cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="w-full h-48 relative mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold mb-2 ${product.category === "Men" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"}`}>{product.category}</span>
      <h3 className="text-lg font-bold text-gray-900 mb-1 text-center">{product.name}</h3>
      <p className="text-md text-gray-700 font-semibold mb-2">${product.price.toFixed(2)}</p>
      <button
        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center relative min-w-[250px]">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            {!added ? (
              <>
                <span className="text-blue-700 font-semibold text-lg text-center mb-2">Select Quantity</span>
                <div className="flex items-center gap-4 mb-4">
                  <button
                    className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold text-gray-700 hover:bg-gray-300"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                  <button
                    className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold text-gray-700 hover:bg-gray-300"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  onClick={handleConfirm}
                >
                  Add {quantity} to Cart
                </button>
              </>
            ) : (
              <>
                <svg className="mb-2" width="40" height="40" fill="none" stroke="green" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="green" strokeWidth="2" fill="none"/><path d="M8 12l2 2l4-4" stroke="green" strokeWidth="2" fill="none"/></svg>
                <span className="text-green-700 font-semibold text-lg text-center">Added to cart!</span>
                <span className="text-gray-600 text-sm mt-1 text-center">{product.name} x {quantity} added to your cart.</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 