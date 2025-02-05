import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero1 = () => {
  return (
    <div className="flex flex-col pb-56 sm:flex-row h-[562px] px-4 sm:px-8 lg:px-16  gap-8  md:max-w-[1920px] w-full  bg-black">
      <div className="text-black md:max-w-1/2 w-full md:mb-16 gap-4 pr-8  md:my-0 my-[40px] pl-0 md:mt-[110px]">
        <p className="md:w-[106px] md:h-[40px] md:text-2xl font-greatvibes font-normal text-3xl pl-5 md:pl-[50px] leading-[40px] text-[#FF9F0D] whitespace-nowrap">About us</p>
        <h2 className="font-bold font-helvetica md:text-[40px] text-[30px] pl-5 md:pl-[50px] md:w-[446px] leading-[56px] text-[#FFFFFF]">
          {" "}<span className="text-[#FF9F0D]">We</span> Create the best foody product
        </h2>
        <p className='text-[#FFFFFF] font-inter font-normal md:text-[16px] md:leading-[24px] w-[320px] pl-5 md:pl-[59px] px-5 md:w-[526px] md:my-[20px]'>
        Welcome to our food haven, where we proudly serve halal, healthy, and freshly prepared fast food to satisfy your cravings. Our commitment to quality ensures every bite is packed with authentic flavors and goodness.Experience the perfect blend of taste and nutrition, served quickly for your convenience. <b>Your satisfaction is our priority!</b>
        </p>
        <p className="font-inter text-white my-[20px] pl-5 md:pl-[59px] px-5 ">
          ✔ We ensure all our meals meet the highest halal standards, offering you peace of mind with every bite
        </p>
        <p className="font-inter text-white my-[20px] pl-5 md:pl-[59px] px-5">
          ✔ Our dishes are made with fresh ingredients, prioritizing your health and well-being without compromising on taste.
        </p>
        <p className="font-inter text-white my-[20px] pl-5 md:pl-[59px] px-5">
          ✔ Enjoy delicious, high-quality food served promptly to fit your busy lifestyle.
        </p>
        <Link href="/pages/about">
          <button className="rounded-[30px] md:h-[60px] h-[50px] pl-5 md:ml-[64px] px-5 mx-4 w-[160px] md:w-[180px] text-[#FFFFFF] bg-[#FF9F0D]">
            Read More
          </button>
        </Link>
      </div>
      <div className="space-y-4 md:p-5 w-full md:mb-12 sm:mb-20  p-1 md:w-1/2 object-cover mt-8">
        <div className="md:flex sm:w-full md:w-full sm:flex-row md:mr-[60px] gap-[12px] md:mt-[110px] sm:mt[50px] md:flex-col text-white">
          <div className="md:max-w-[660px] ">
            <Image src='/images/hero1.png' width={660} height={330} alt="hero-egg" className="rounded-[6px] object-cover sm:h-[180px] h-[400]"/>
          </div>
          <div className="flex md:max-w-[660px] flex-row sm:flex-col w-full   gap-[12px] md:mb-0 sm:mb-[30px]">
            <div className="w-full"><Image src='/images/hero2.png' width={322} height={194} alt="hero-egg" className="rounded-[6px] object-cover sm:w-[660px] h-[250px] sm:h-[180px]"/></div>
            <div className="w-full"><Image src='/images/hero3.png' width={322} height={194} alt="hero-egg" className="rounded-[6px] object-cover h-[250px] sm:w-[660px] sm:h-[180px]"/></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero1;
