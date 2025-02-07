"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import client from "../../sanity.client";

// Define the types for the category object
type Category = {
  _id: string;
  name: string;
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
  slug: {
    current: string;
  };
};

const FoodCategory1 = () => {
  
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const query = `*[_type == "foodCategory"]{
        _id,
        name,
        image{
          asset->{
            _id,
            url
          }
        },
        slug
      }`;

      try {
        const data = await client.fetch(query);
        setCategories(data.slice(0, 4)); 
      } catch (error) {
        console.error("Error fetching categories from Sanity:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen md:max-w-[1920px] w-full flex flex-col items-center justify-center bg-[#0D0D0D] px-6 pt-16 md:px-16 lg:px-24 space-y-8">
      <div className="text-center sm:mt-24 mt-[44rem] md:mt-20 space-y-4">
        <p className="font-greatvibes text-[16px] md:text-[18px] font-normal text-[#FF9F0D]">
          Food Category
        </p>
        <h2 className="font-helvetica text-[18px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold text-[#FFFFFF]">
          <span className="text-[#FF9F0D]">Ch</span>oose Food Item
        </h2>
      </div>

      <div className="w-full grid grid-rows-1 sm:grid-cols-2 md:grid-cols-3 px-28 gap-6 lg:grid-cols-4 items-center justify-center">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/pages/shop?category=${category.slug.current}`} 
          >
            <div className="flex items-center justify-center">
              <div className="w-full">
                {category.image?.asset?.url && (
                  <Image
                    src={category.image.asset.url}
                    alt={category.name} 
                    width={306}
                    height={329}
                    className="w-full object-cover h-auto"
                  />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FoodCategory1;
