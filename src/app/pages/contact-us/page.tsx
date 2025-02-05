"use client";
import React, { useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { IoMailOutline } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import Link from "next/link";

const ContactUs = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);  

  // Typing e as React.FormEvent<HTMLFormElement> for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    // Reset the form fields
    setName("");
    setEmail("");
    setMessage("");

    // Show the modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  return (
    <>
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Contact Us</h2>
          <p className="pt-2">
            <Link href="/" className="text-yellow-400">Home</Link> › 
          </p>
        </div>
      </section>

      <div className="max-w-[1920px]">
        <div className="flex flex-col items-center justify-center mx-auto w-full max-w-[1200px] px-4 md:px-8 lg:px-12 py-10 gap-6 rounded-lg">
          <form
            className="bg-white w-full max-w-[424px] p-6 space-y-6 rounded-md shadow-[0_0_10px_0_rgba(155,159,13,0.4)]"
            onSubmit={handleSubmit}  // Handle form submission
          >
            <h2 className="text-[20px] font-bold text-[#0D0D0D]">Get In Touch</h2>

            {/* Name Field */}
            <div className="flex items-center border rounded-md px-3 py-2 gap-2">
              <LuUserRound size={20} />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full outline-none text-sm text-gray-700"
                value={name}
                onChange={(e) => setName(e.target.value)}  // Controlled input
              />
            </div>

            {/* Email Field */}
            <div className="flex items-center border rounded-md px-3 py-2 gap-2">
              <IoMailOutline size={20} />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full outline-none text-sm text-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}  // Controlled input
              />
            </div>

            {/* Message Field */}
            <div className="flex items-center border rounded-md px-3 py-2 gap-2">
              <MdMessage size={20} />
              <textarea
                placeholder="Your Message"
                className="w-full outline-none text-sm text-gray-700 p-2"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}  // Controlled input
              />
            </div>

            {/* Submit Button */}
            <button className="w-full bg-[#ff9f0d] text-white mt-4 py-2 rounded-md font-medium hover:bg-[#e88e0c]">
              Send Message
            </button>

            {/* Optional link for privacy policy */}
            <p className="text-right text-sm text-gray-500 hover:underline">
              Privacy Policy
            </p>

            <div className="flex items-center justify-center gap-2">
              <hr className="w-1/3 border-gray-300" />
              <span className="text-sm text-gray-500">OR</span>
              <hr className="w-1/3 border-gray-300" />
            </div>
          </form>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] sm:w-[400px] text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-4">Thank you for contacting us. We will get back to you shortly.</p>
            <button
              onClick={handleCloseModal}
              className="bg-[#ff9f0d] text-white px-6 py-2 rounded-md hover:bg-[#e88e0c]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactUs;
