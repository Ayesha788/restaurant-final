"use client"; // ✅ This ensures the page runs only on the client side

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>("0");
  const [totalQuantity, setTotalQuantity] = useState<string>("0");

  useEffect(() => {
    if (!searchParams) return;

    const items = searchParams.get("items");
    const price = searchParams.get("totalPrice");
    const quantity = searchParams.get("totalQuantity");

    try {
      setCartItems(items ? JSON.parse(items) : []);
    } catch (error) {
      console.error("Error parsing cart items:", error);
      setCartItems([]);
    }

    setTotalPrice(price || "0");
    setTotalQuantity(quantity || "0");
  }, [searchParams]);

  const deliveryCharge = 200;
  const totalWithDelivery = (parseFloat(totalPrice) + deliveryCharge).toFixed(2);

  return (
    <>
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold tracking-tight">Checkout</h2>
          <p className="pt-2 text-lg">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>{" "}
            › Checkout
          </p>
        </div>
      </section>

      <div className="lg:max-w-[800px] w-full px-6 lg:px-16 py-16 mx-auto space-y-12">
        <div className="w-full bg-white p-8 rounded-lg shadow-lg mb-8 max-w-[400px] mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    RS: {item.price} x {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 w-full space-y-6 border-t pt-4">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-600">Total Quantity</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-600">Subtotal</span>
              <span>RS: {totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-600">Delivery Charges</span>
              <span>RS: {deliveryCharge}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span>Total</span>
              <span>RS: {totalWithDelivery}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Main Checkout page wrapped inside Suspense
const Checkout = () => {
  return (
    <Suspense fallback={<h1>Loading Checkout...</h1>}>
      <CheckoutContent />
    </Suspense>
  );
};

export default Checkout;
