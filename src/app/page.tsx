'use client';

import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import { useSearchParams } from "next/navigation";

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
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<"All" | "Men" | "Women">("All");

  // On mount, set category from query param if present
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat === "Men" || cat === "Women") {
      setCategory(cat);
    } else {
      setCategory("All");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Filter products based on selected category
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div>
      <Navbar category={category} setCategory={setCategory} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 p-4 sm:p-8">
        {/* Home Section (Hero) */}
        <section id="home" className="w-full flex flex-col items-center justify-center text-center py-12 sm:py-20 mb-10 bg-white/80 rounded-2xl shadow-lg">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-4">Welcome to EcomCloth</h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-2xl">Discover the latest trends in men’s and women’s clothing. Shop our exclusive collection and enjoy a seamless, stylish shopping experience.</p>
          <a href="#products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow transition-colors">Shop Now</a>
        </section>
        <main>
          <h2 id="products" className="text-2xl font-semibold mb-6 text-center text-gray-800">
            {category === "All" ? "Featured Products" : `${category}'s Products`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </main>
        <footer className="mt-12 text-center text-gray-500 text-sm">© 2024 EcomCloth. All rights reserved.</footer>
      </div>
    </div>
  );
}
