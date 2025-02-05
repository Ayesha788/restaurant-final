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
  description: string;
}

const Meetchef = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const query = `*[_type == "chef"]{
          id,
          name,
          position,
          experience,
          specialty,
          description,
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0D0D0D] px-6 md:px-16 lg:px-24 space-y-12">
      <div className="text-center space-y-4">
        <p className="font-greatvibes text-[16px] md:text-[18px] font-normal text-[#FF9F0D]">
          Chefs
        </p>
        <h2 className="font-helvetica text-[28px] md:text-[36px] lg:text-[48px] font-bold text-[#FFFFFF]">
          <span className="text-[#FF9F0D]">Me</span>et Our Chef
        </h2>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 px-28 gap-6 lg:grid-cols-4  items-center justify-center">
        {chefs.map((chef) => (
          <div key={chef.id} className="flex flex-col items-center">
            <Link href={`/pages/chef/${chef.id}`}><Image
              src={chef.image}
              alt={chef.name}
              width={240}
              height={329}
              className="w-full max-w-[240px] h-auto rounded-sm"
            />
            
           
            </Link>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Meetchef;
