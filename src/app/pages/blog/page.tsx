"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import client from "@/sanity.client";

// Define the structure of a blog object
interface Blog {
  id: string;
  title: string;
  dateCreated: string;
  description: string;
  image: string;
}

const Page = () => {
  // Use the Blog type for the blogs state
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "blog"]{id, title, dateCreated, description, "image": image.asset->url}`
      )
      .then((data) => setBlogs(data))
      .catch(console.error);
  }, []);

  const truncateDescription = (description: string) => {
    const words = description.split(" ");
    if (words.length > 50) {
      return words.slice(0, 20).join(" ") + "..."; 
    }
    return description;
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-56 flex items-center justify-center bg-opacity-70"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      >
        <div className="text-center text-white space-y-2">
          <h2 className="text-4xl font-extrabold">Blog List</h2>
          <p className="pt-1 text-base">
            <Link href="/" className="text-yellow-400 hover:text-yellow-500">
              Home
            </Link>{" "}
            › Blog
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div
                key={blog.id}
                className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} bg-[#F8F8F8] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="w-full md:w-1/2 mb-4">
                <Image
  src={blog.image || "/fallback-image.jpg"}
  alt={blog.title}
  width={500} 
  height={200} 
  className="w-full h-48 object-cover rounded-lg"
/>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <p className="text-[#FF9F0D] text-sm mb-1">
                    {new Date(blog.dateCreated).toLocaleDateString()}
                  </p>
                  <h2 className="text-[#333333] text-2xl font-semibold mb-3">
                    {blog.title}
                  </h2>
                  <p className="text-[#666666] text-base mb-4">
                    {truncateDescription(blog.description)}
                  </p>
                  <div className="flex justify-start">
                    <Link
                      href={`/pages/blog/${blog.id}`}
                      className="text-[#FF9F0D] font-semibold text-base hover:text-yellow-400 transition-colors duration-200"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-black">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
