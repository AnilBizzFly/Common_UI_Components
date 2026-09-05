import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function CartButton() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);

  const addToCart = () => {
    setCount((c) => c + 1);
    setShow(true);
    setTimeout(() => setShow(false), 600);
  };

  return (
    <button onClick={addToCart} className="relative group">
      <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-xs font-medium text-white shadow">
          {count}
        </span>
      )}
      {show && (
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-emerald-500 px-3 py-1 text-xs font-medium text-white shadow-lg animate-fadeInUp">
          Added to cart ✓
        </span>
      )}
    </button>
  );
}
