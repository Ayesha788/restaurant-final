"use client"
import { useState } from "react";
import Image from "next/image";
import { PiQuotesLight } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0); // Explicitly typing activeIndex as number

  const testimonials = [
    {
      text: `"Ordered from this online fast food restaurant and had a fantastic experience! The website was easy to navigate, with a wide variety of tasty options to choose from. My order was placed effortlessly, and the delivery was surprisingly fast. The food arrived hot and fresh, just like it would from an in-person visit. I was impressed by the quality and taste of everything, especially the burgers and fries. The online customer service was prompt and helpful. I highly recommend this online fast food restaurant for anyone looking for quick, delicious meals delivered right to their door!"`,
      name: "Alamin Hasan",
      role: "Food Specialist",
      stars: 4, 
    },
    {
      text: `"I had an incredible experience with this fast food restaurant! From the moment I placed my order online, the process was seamless and easy to navigate. The website had a great variety of options, and I was able to customize my meal exactly how I wanted. The delivery was super fast, and the food arrived hot, fresh, and ready to eat. The burgers were absolutely delicious – juicy and packed with flavor. The fries were perfectly crispy, just the way I like them. I also tried their milkshake, and it was the creamiest I’ve had in a long time! Everything was cooked to perfection, and you could tell the ingredients were of high quality. The customer service was also top-notch, with quick responses to my questions. I would definitely recommend this restaurant to anyone looking for great fast food. It's my new go-to for fast and delicious meals!"`,
      name: "John Doe",
      role: "Customer",
      stars: 5,
    },
    {
      text: `"I’m always on the lookout for fast food that's both quick and tasty, and I’m so glad I found this place! The whole experience, from ordering to delivery, was excellent. The website was user-friendly, and I was able to choose from a wide range of meals that all sounded delicious. When my food arrived, it was fresh, hot, and perfectly packaged. The burger I ordered was amazing – juicy and full of flavor, with just the right amount of seasoning. The fries were crispy and golden, just like I love them. I also tried their chicken wings, which were cooked to perfection, crispy on the outside and tender on the inside. The milkshake was a real treat, thick and creamy, and the portion sizes were generous. I’m definitely coming back for more, and I’ll be recommending this place to all my friends. If you’re looking for fast food that doesn’t compromise on quality or taste, this is the place to be!"`,
      name: "Jane Smith",
      role: "Reviewer",
      stars: 5,
    },
  ];

  const handleDotClick = (index: number) => {  // Typing index as number
    setActiveIndex(index);
  };

  return (
    <div className="bg-[#0D0D0D] px-4 sm:px-8 lg:px-16 py-12">
      <div className="text-left mb-12 ml-4 sm:ml-8 lg:ml-12">
        <p className="font-greatvibes text-[24px] sm:text-[32px] text-orange-500">
          Testimonials
        </p>
        <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
          What our clients are saying
        </h2>
      </div>

      <div className="flex flex-col items-center text-center pb-8">
        <Image
          src="/images/test.png"
          alt="test"
          width={133}
          height={134}
          className="rounded-full relative mb-[-50px]"
        />
        <div className="max-w-4xl mx-auto bg-[#ffffff] p-8 rounded-lg shadow-lg h-[450px]"> {/* Fixed height for consistency */}
          <PiQuotesLight size={47} />
          <p className="leading-relaxed text-[#4F4F4F] text-lg h-[120px] overflow-hidden"> {/* Ensuring text doesn't overflow */}
            {testimonials[activeIndex].text}
          </p>
          <span className="flex md:ml-[40%] ml-[20%] mt-4 gap-2">
            {Array.from({ length: testimonials[activeIndex].stars }).map(
              (_, index) => (
                <FaStar key={index} size={24} />
              )
            )}
            {Array.from({ length: 5 - testimonials[activeIndex].stars }).map(
              (_, index) => (
                <CiStar key={index} size={24}  />
              )
            )}
          </span>
          <h2 className="text-[#333333] font-helvetica font-bold text-2xl my-4">
            {testimonials[activeIndex].name}
          </h2>
          <p className="text-[#828282] text-[16px] font-helvetica ">
            {testimonials[activeIndex].role}
          </p>
        </div>
      </div>

      {/* Dots for navigation */}
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? "bg-orange-500" : "bg-gray-300"} rounded-full h-2 w-2 mx-2 cursor-pointer`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
