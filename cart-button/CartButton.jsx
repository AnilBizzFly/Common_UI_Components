import { useEffect, useRef, useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function CartButton() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const timer = useRef(null);

  const addToCart = () => {
    setCount((c) => c + 1);
    setShow(true);
    // FIX 1: a second click within 600ms used to leave the first timeout
    // running, which hid the toast while the newer one still wanted it up.
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 600);
  };

  // FIX 2: don't leave a timer running past unmount
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <button
      type="button"                                  /* FIX 3: would submit inside a <form> */
      onClick={addToCart}
      aria-label={count > 0 ? `Add to cart, ${count} in cart` : 'Add to cart'}
      className="relative group rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
    >
      <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />

      {count > 0 && (
        <span
          aria-hidden="true"
          /* FIX 4: w-5 clipped 3-digit counts; min-w + px lets it grow */
          className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500 px-1 text-xs font-medium text-white shadow"
        >
          {count > 99 ? '99+' : count}
        </span>
      )}

      {show && (
        <span
          role="status"
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-emerald-500 px-3 py-1 text-xs font-medium text-white shadow-lg animate-fadeInUp"
        >
          Added to cart ✓
        </span>
      )}
    </button>
  );
}
