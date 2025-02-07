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

  // Form state
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [paymentOption, setPaymentOption] = useState<string>("Cash on Delivery");

  // Popup state
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Show the customized popup message
    setPopupMessage(`Thank you for your order, ${firstName} ${lastName}! Your order has been placed successfully.`);
    setShowPopup(true);

    // Clear the form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPaymentOption("Cash on Delivery");

    // Optionally log the order data
    console.log("Order Submitted:", {
      firstName,
      lastName,
      email,
      phone,
      address,
      paymentOption,
      cartItems,
      totalPrice,
      totalWithDelivery,
    });
  };

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

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
        {/* Order Summary */}
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

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Billing Information</h2>

          <div className="w-full gap-2 flex md:flex-row flex-col px-0">
            <div className="md:w-1/2 px-4 w-full">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div className="md:w-1/2 px-4 w-full">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          </div>

          <div className="w-full gap-2 flex md:flex-row flex-col px-0">
            <div className="md:w-1/2 px-4 w-full">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div className="md:w-1/2 px-4 w-full">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          </div>

          <div className="my-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            ></textarea>
          </div>

          {/* Payment Option */}
          <div className="my-4">
            <label htmlFor="paymentOption" className="block text-sm font-medium text-gray-700 mb-1">Payment Option</label>
            <select
              id="paymentOption"
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-orange-500 text-white rounded-md shadow-sm text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Place an order
          </button>
        </form>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">{popupMessage}</h3>
            <button
              onClick={closePopup}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
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
