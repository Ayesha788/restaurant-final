import React from 'react';
import Link from 'next/link';
const Hero5 = () => {
  return (
    <div className="bg-[url('/images/h4.png')] bg-cover bg-center w-full h-[558px] lg:h-[600px] flex items-center justify-end px-4 sm:px-8 lg:px-16">

      <div className="text-right text-white max-w-[705px] ">
        <p className="font-greatvibes text-[20px]  sm:text-[26px] text-orange-500 mb-4">
        Fresh & Halal Meals, Made with Care
        </p>
        <h2 className="font-bold text-3xl max-w-[705px] sm:text-4xl lg:text-5xl leading-tight mb-6">
          <span className='text-[#FF9F0D]'>we</span> document every step of our food preparation process to ensure fresh meals
        </h2>
        <p className='font-inter text-[14px] max-w-[651px] leading-relaxed mb-6'>
        We take pride in documenting every step of our food preparation process, ensuring that all meals served are not only fresh but also meet halal standards. From sourcing the finest ingredients to cooking and packaging, we guarantee that each meal is prepared with the utmost care, cleanliness, and quality.
        </p>
        <div className="flex justify-end gap-4">
          <Link href="/pages/faq">
          <button className="w-[190px] h-[60px] text-center border-[#FF9F0D] text-white border-[1px] rounded-[25px] text-lg">
            Show More
          </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Hero5;
