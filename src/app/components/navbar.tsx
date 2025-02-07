import React, { useState } from "react";
import { FaSlidersH } from "react-icons/fa";  // Using react-icons' FaSlidersH icon
import Link from "next/link";
import { usePathname } from "next/navigation"; // use usePathname for Next.js 14

const Header = () => {
  const pathname = usePathname(); // Get the current pathname with usePathname
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  // Function to determine if the link is active based on the current route
  const isActive = (path: string) =>
    pathname === path ? "text-[#FF9F0D] font-bold" : "text-[#ffffff] font-normal";

  return (
    <header className="relative max-w-[1920px] w-full bg-[#0D0D0D] h-[90px]">
      <div className="absolute max-w-full mt-[15px] bg-[#0D0D0D] w-full flex justify-between items-center px-4 sm:px-8 h-[32px]">
        <div className="max-w-[109px]">
          <h2 className="font-helvetica font-bold text-[20px] sm:text-[24px] text-[#ffffff]">
            Food<span className="text-[#FF9F0D]">Luck</span>
          </h2>
        </div>
        <div className="hidden md:flex max-w-[508px]">
          <ul className="flex gap-2 sm:gap-4">
            <li className={`text-[14px] sm:text-[16px] ${isActive("/")}`}>
              <Link href="/">Home</Link>
            </li>
            <li className={`text-[14px] sm:text-[16px] ${isActive("/menu")}`}>
              <Link href="/pages/menu">Menu</Link>
            </li>
            <li className={`text-[14px] sm:text-[16px] ${isActive("/blog")}`}>
              <Link href="/pages/blog">Blog</Link>
            </li>
            <li className={`text-[14px] sm:text-[16px] ${isActive("/faq")}`}>
              <Link href="/pages/faq">Pages</Link>
            </li>
            <li className={`text-[14px] sm:text-[16px] ${isActive("/about")}`}>
              <Link href="/pages/about">About</Link>
            </li>
            <li className={`text-[14px] sm:text-[16px] ${isActive("/shoplist")}`}>
              <Link href="/pages/shop">Shop</Link>
            </li>
            <li className={`text-[14px] sm:text-[16px] ${isActive("/signin")}`}>
              <Link href="/pages/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-3">
          
          
          {/* Sliders Icon for settings */}
          <button
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            className="text-white flex items-center gap-2"
          >
            <FaSlidersH size={20} />
            {/* Display the default language */}
            <span className="text-white text-[16px] mr-10">English</span>
          </button>
        </div>
      </div>

      {/* Language Settings Menu */}
      {isLanguageMenuOpen && (
        <div className="absolute top-[90px] right-4 bg-[#0D0D0D] p-4 rounded-lg shadow-lg z-50 mr-10 ">
          <ul className="flex flex-col gap-2">
            {/* Add dropdown languages here */}
            <li className="text-white text-lg cursor-pointer">Français</li>
            <li className="text-white text-lg cursor-pointer">Español</li>
            <li className="text-white text-lg cursor-pointer">اردو</li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
