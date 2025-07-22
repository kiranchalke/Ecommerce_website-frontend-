'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../../CartContext';

const products = [
  {
    id: 1,
    name: "Men's Classic T-Shirt",
    price: 25.0,
    category: "Men",
    image: "/men/pexels-mostafasanadd-878358.jpg",
    colors: ["White", "Black", "Blue"],
    description: "A classic men's t-shirt, perfect for everyday wear. Comfortable and stylish.",
  },
  {
    id: 2,
    name: "Women's Summer Dress",
    price: 40.0,
    category: "Women",
    image: "/women/pexels-godisable-jacob-226636-794062.jpg",
    colors: ["Red", "Yellow", "Green"],
    description: "A breezy summer dress for women, ideal for warm days and outings.",
  },
  {
    id: 3,
    name: "Men's Denim Jacket",
    price: 60.0,
    category: "Men",
    image: "/men/pexels-pixabay-157675.jpg",
    colors: ["Blue", "Black"],
    description: "A rugged denim jacket for men, adds style to any outfit.",
  },
  {
    id: 4,
    name: "Women's Blouse",
    price: 30.0,
    category: "Women",
    image: "/women/pexels-olenagoldman-1021693.jpg",
    colors: ["White", "Pink"],
    description: "A soft and elegant blouse for women, perfect for work or casual wear.",
  },
  {
    id: 5,
    name: "Men's Chinos Pants",
    price: 35.0,
    category: "Men",
    image: "/men/pexels-cottonbro-7763204.jpg",
    colors: ["Beige", "Navy"],
    description: "Versatile chinos pants for men, comfortable and stylish for any occasion.",
  },
  {
    id: 6,
    name: "Women's Cardigan",
    price: 45.0,
    category: "Women",
    image: "/women/pexels-zayceva-tatiana-135444866-11971763.jpg",
    colors: ["Gray", "Blue"],
    description: "A cozy cardigan for women, great for layering in any season.",
  },
];

export default function ProductDetails() {
  const params = useParams();
  const id = Number(params.id);
  const product = products.find((p) => p.id === id);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState("M");
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  if (!product) {
    return <div className="p-8 text-center text-red-600 font-bold">Product not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full flex flex-col sm:flex-row gap-8">
        <div className="flex-1 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={320}
            height={320}
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">{product.name}</h1>
          <span className="text-lg font-semibold text-gray-700 mb-2">${product.price.toFixed(2)}</span>
          <span className="text-sm font-medium text-gray-500 mb-2">Category: {product.category}</span>
          <div className="mb-4">
            <span className="block text-gray-700 font-medium mb-1">Color:</span>
            <div className="flex gap-2 mb-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`px-3 py-1 rounded-full border text-sm font-semibold transition-colors ${selectedColor === color ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100'}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
            <span className="block text-gray-700 font-medium mb-1">Size:</span>
            <div className="flex gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 rounded-full border text-sm font-semibold transition-colors ${selectedSize === size ? 'bg-green-600 text-white border-green-600' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-green-100'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            onClick={() => {
              addToCart({ ...product, color: selectedColor, size: selectedSize }, 1);
              setShowModal(true);
              setTimeout(() => setShowModal(false), 1200);
            }}
          >
            Add to Cart
          </button>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center relative min-w-[250px]">
                <svg className="mb-2" width="40" height="40" fill="none" stroke="green" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="green" strokeWidth="2" fill="none"/><path d="M8 12l2 2l4-4" stroke="green" strokeWidth="2" fill="none"/></svg>
                <span className="text-green-700 font-semibold text-lg text-center">Added to cart!</span>
                <span className="text-gray-600 text-sm mt-1 text-center">{product.name} ({selectedColor}, {selectedSize}) added to your cart.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 