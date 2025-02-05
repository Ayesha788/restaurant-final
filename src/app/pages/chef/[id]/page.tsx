import React from "react";
import Image from "next/image";
import Link from "next/link";
import client from "@/sanity.client"; // Ensure you're importing your sanity client here

interface Chef {
  id: string;
  name: string;
  position: string;
  experience: number;
  specialty: string;
  image: string;
  description: string;
}

// Fetching data using async functions in Server Component
async function getChefData(id: string) {
  try {
    const query = `*[_type == "chef" && id == $id][0]{
      id,
      name,
      position,
      experience,
      specialty,
      description,
      "image": image.asset->url
    }`;

    const data = await client.fetch(query, { id });
    return data;
  } catch (error) {
    console.error("Error fetching chef:", error);
    return null;
  }
}

const ChefPage = async ({ params }: { params: { id: string } }) => {
  const chef:Chef = await getChefData(params.id); // Fetch data on server-side

  if (!chef) {
    return <div>Chef not found</div>; // Handle no data found scenario
  }

  return (
    <>
      <section
        className="bg-cover bg-center h-[400px] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-5xl font-extrabold">Our Chef</h2>
          <p className="pt-4 text-xl">
            <Link href="/" className="text-yellow-400">
              Home
            </Link>{" "}
            › Chef › {chef.name}
          </p>
        </div>
      </section>

      <div className="min-h-screen px-6 sm:px-[100px] py-16 bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-[1400px] bg-white shadow-lg rounded-lg p-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <Image
              src={chef.image}
              alt={chef.name}
              width={400}
              height={480}
              className="rounded-xl shadow-xl"
            />
            <div className="text-center md:text-left space-y-6">
              <h2 className="text-4xl font-extrabold text-gray-800">{chef.name}</h2>
              <p className="text-xl text-[#FF9F0D]">{chef.position}</p>
              <p className="text-md text-gray-700">{chef.description}</p>
              <p className="text-lg text-gray-600">
                Specialty:{" "}
                <span className="text-gray-800 font-semibold">{chef.specialty}</span>
              </p>
              <p className="text-lg text-gray-600">
                Years of Experience:{" "}
                <span className="text-gray-800 font-semibold">{chef.experience} years</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChefPage;
