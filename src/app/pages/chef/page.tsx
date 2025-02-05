"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import client from "../../../sanity.client";

interface Chef {
  id: string;
  name: string;
  position: string;
  experience: number;
  specialty: string;
  description: string;
  image: {
    asset: {
      url: string;
    };
  };
}

const Page = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);

  useEffect(() => {
    const fetchChefs = async () => {
      const data: Chef[] = await client.fetch(
        `*[_type == "chef"]{ id, name, position, experience, specialty, description, image { asset -> { url } } }`
      );
      setChefs(data);
    };
    fetchChefs();
  }, []);

  return (
    <>
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Our Chef</h2>
          <p className="pt-2">
            <Link href="/" className="text-yellow-400">Home</Link> › Chef
          </p>
        </div>
      </section>

      <div className="min-h-screen px-6 sm:px-[250px] py-12 bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-[1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {chefs.map((chef) => (
              <div key={chef.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 p-4 rounded-lg">
                <Image
                  src={chef.image.asset.url}
                  alt={chef.name}
                  width={312}
                  height={379}
                  className="w-full h-auto rounded-md"
                />
                <div className="mt-4 text-center">
                  <h2 className="text-lg font-bold text-gray-700">{chef.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">{chef.position}</p>
                  <p className="text-xs text-gray-500">Experience: {chef.experience} years</p>
                  <p className="text-xs text-gray-500">Specialty: {chef.specialty}</p>
                  <Link href={`/chef/${chef.id}`} className="text-yellow-400 underline mt-2 block">View More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
