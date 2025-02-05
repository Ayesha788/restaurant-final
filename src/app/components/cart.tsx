"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../redux/store";
import { increaseItemQuantity, decreaseItemQuantity } from "../redux/cartSlice";
import Image from "next/image";

const Cart = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const cartRef = useRef<HTMLDivElement>(null);

  const totalPrice = cartItems.reduce(
    (total: number, item: { price: number; quantity: number }) =>
      total + item.price * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleCheckout = () => {
    const queryParams = new URLSearchParams({
      totalPrice: totalPrice.toString(),
      totalQuantity: totalQuantity.toString(),
      items: JSON.stringify(cartItems),
    });

    router.push(`/pages/checkout?${queryParams.toString()}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          className="bg-orange-500 text-white p-2 rounded-full"
          onClick={toggleCart}
        >
          <span className="absolute top-0 right-0 text-sm bg-red-500 text-white rounded-full px-2 py-1">
            {totalQuantity}
          </span>
          🛒 {/* Cart icon */}
        </button>
      </div>

      {/* Cart Dropdown */}
      {isCartVisible && (
        <div
          ref={cartRef}
          className="absolute top-12 right-0 bg-white shadow-2xl rounded-lg w-[500px] p-8 max-h-[80vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-2xl text-center text-gray-700">
              Your Cart
            </h3>
            {/* X Icon to Close Cart */}
            <button
              className="text-2xl text-gray-500 hover:text-gray-700"
              onClick={() => setIsCartVisible(false)}
            >
              &times; {/* X Icon */}
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <div>
              <ul>
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center py-4 border-b border-gray-200"
                  >
                    <div className="flex items-center">
                      {item.image_url && (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover rounded-md mr-4"
                        />
                      )}
                      <span className="font-semibold text-lg">{item.name}</span>
                    </div>

                    <div className="flex items-center">
                      <button
                        className="bg-gray-200 p-2 rounded-full mx-2 hover:bg-gray-300"
                        onClick={() => dispatch(decreaseItemQuantity(item.id))}
                      >
                        -
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        className="bg-gray-200 p-2 rounded-full mx-2 hover:bg-gray-300"
                        onClick={() => dispatch(increaseItemQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>

                    <div>
                      <span className="font-semibold text-lg text-gray-600">
                        RS: {item.price} x {item.quantity}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 font-bold text-2xl text-center text-gray-700">
                <div>Total: RS: {totalPrice}</div>
              </div>
            </div>
          )}
          <button
            onClick={handleCheckout}
            className="mt-8 bg-orange-500 text-white py-3 px-8 rounded-lg w-full hover:bg-orange-600 text-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
