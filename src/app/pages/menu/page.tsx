"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsCupHot } from "react-icons/bs";
import Partner from "./partner";
import client from "@/sanity.client"; 
import HeroSection from "./heroSection";
import Link from "next/link";

type FoodItem = {
  id: number; 
  category: string | null;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
};

type GroupedFoodData = {
  [category: string]: FoodItem[];
};

const Menu = () => {
  const [foodData, setFoodData] = useState<GroupedFoodData>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "food" && available == true] {
          id,
          name,
          category,
          price,
          description,
          "imageUrl": image.asset->url
        }`
      )
      .then((data: FoodItem[]) => {
        const groupedData = data.reduce<GroupedFoodData>((acc, item) => {
          const category = item.category || "Uncategorized";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {});
        setFoodData(groupedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-transparent border-solid animate-spin border-blue-500 border-8 rounded-full h-24 w-24"></div>
      </div>
    );
  }

  return (
    <>
      <HeroSection />

      <div className="min-h-screen gap-24 space-y-28 flex flex-col items-center justify-center bg-gray-50 px-8 md:px-24">
        {Object.keys(foodData).map((category, index) => (
          <div key={index} className="w-full md:w-3/4 space-y-12">
            <div className="flex items-center mb-8">
              <BsCupHot size={36} className="text-[#FF9F0D]" />
              <h2 className="text-4xl font-extrabold text-gray-800 ml-4 border-b-4 border-[#FF9F0D] pb-1">
                {category}
              </h2>
            </div>

            <div
              className={`flex ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"} items-center justify-between mb-12`}
            >
              <div className="w-full md:w-1/2 px-4">
                <div className="space-y-8">
                  {foodData[category].map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex justify-between items-center border-b pb-4 hover:shadow-md hover:rounded-lg p-4 transition-shadow duration-300"
                    ><Link href={`/pages/products/${item.id}`}>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <span className="text-1xl font-bold text-[#FF9F0D]">
                        Rs. {item.price}
                      </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {foodData[category][0]?.imageUrl && (
                <div className="w-full md:w-1/2 px-4">
                  {/* Link to dynamic product page */}
                  <Link href={`/pages/product/${foodData[category][0].id}`}>
                    <Image
                      src={foodData[category][0].imageUrl!}
                      alt={foodData[category][0].name}
                      width={448}
                      height={300}
                      className="shadow-lg rounded-xl hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
        <Partner />
      </div>
    </>
  );
};

export default Menu;
