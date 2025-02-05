"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const Checkout = () => {
  const searchParams = useSearchParams();

  const totalPrice = searchParams.get('totalPrice');
  const totalQuantity = searchParams.get('totalQuantity');
  const items = searchParams.get('items');

  const cartItems = items ? JSON.parse(items) : [];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");

  interface CartItem {
    id: number;
    img: string;
    name: string;
    quantity: number;
    price: number;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order submitted successfully");
  };

  return (
    <section>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNo">Phone Number</label>
          <input
            type="text"
            id="phoneNo"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Shipping Address</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Order</button>
      </form>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <div>
          <h4>Items:</h4>
          <ul>
            {cartItems.map((item: CartItem) => (
              <li key={item.id}>
                <Image src={item.img} alt={item.name} width={50} height={50} />
                <span>{item.name}</span>
                <span>{item.quantity}</span>
                <span>RS: {item.price}</span>
              </li>
            ))}
          </ul>
          <div>
            <strong>Total Quantity: {totalQuantity}</strong>
            <br />
            <strong>Total Bill: RS: {totalPrice}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
