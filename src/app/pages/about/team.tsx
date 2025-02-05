

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import client from "@/sanity.client"; 

interface Chef {
  id: string;
  name: string;
  position: string;
  experience: number;
  specialty: string;
  image: string;
}

const Meetchef = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const query = `*[_type == "chef"] | order(name asc)[0..3] { 
          id,
          name,
          position,
          experience,
          specialty,
          "image": image.asset->url
        }`;
        const data = await client.fetch(query);
        setChefs(data);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    };

    fetchChefs();
  }, []);

  return (
    <div className="relative">
      <div className="md:max-w-[1920px] px-4 w-full mt-[50px] h-[460px] bg-[#FF9F0DD9] z-10 flex flex-col items-center justify-center">
        <div className="md:max-w-[418px] w-full mb-8 h-auto text-center">
          <h2 className="font-helvetica font-bold text-[#ffffff] text-[48px]">
            Meet Our Chef
          </h2>
          <p className="font-inter text-[#ffffff] text-[16px]">
            Discover our talented chefs who bring the magic to your plate.
          </p>
        </div>
      </div>
      <div className="pt-[-50px] z-20 px-6 sm:px-[250px] py-12 bg-gray-50">
        <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {chefs.map((chef) => (
            <div
              key={chef.id}
              className="bg-white shadow-md w-full relative md:mt-[-150px] mt-5 hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/pages/chef/${chef.id}`}>
                <Image
                  src={chef.image}
                  alt={chef.name}
                  width={312}
                  height={398}
                  className="w-full h-auto"
                />
              </Link>
              <div className="mt-4">
                <h2 className="md:text-lg sm:text-sm text-lg font-bold text-center text-gray-700 px-4">
                  {chef.name}
                </h2>
                <p className="text-sm text-center text-gray-600 px-4">
                  {chef.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meetchef;
