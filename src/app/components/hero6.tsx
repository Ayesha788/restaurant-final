"use client";
import { useEffect, useState } from "react";
import client from "../../sanity.client";
import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { LuMessageSquareMore } from "react-icons/lu";
import { IoShareSocialOutline } from "react-icons/io5";
import Image from "next/image";

export default function Home() {
  interface Blog {
    id: string;
    title: string;
    dateCreated: string;
    description: string;
    image: string;
  }

  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    client
      .fetch<Blog[]>(
        `*[_type == "blog"] | order(dateCreated desc)[0...3]{
        id, title, dateCreated, description, "image": image.asset->url
      }`
      )
      .then((data) => {
        console.log(data);
        setBlogs(data);
      })
      .catch(console.error);
  }, []);

  const truncateDescription = (description: string) => {
    const words = description.split(" ");
    if (words.length > 50) {
      return words.slice(0, 15).join(" ") + "...";
    }
    return description;
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-16 px-4 sm:px-8 lg:px-16">
      <h1 className="text-center text-4xl font-bold text-[#FFFFFF] mb-12">
        <span className="text-[#FF9F0D]">La</span>test News & Blog
      </h1>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg flex flex-col"
            >
              {/* Image */}

              <Image
                src={blog.image || "/fallback-image.jpg"}
                alt={blog.title}
                width={500} // You can adjust this value based on your needs
                height={256} // You can adjust this value based on your needs
                className="w-full h-64 object-cover rounded-lg mb-4"
              />

              {/* Date */}
              <p className="font-inter text-[#FF9F0D] text-sm mb-2">
                {new Date(blog.dateCreated).toLocaleDateString()}
              </p>

              {/* Title */}
              <h2 className="font-helvetica font-bold text-[#FFFFFF] text-lg mb-4">
                {blog.title}
              </h2>

              {/* Description */}
              <p className="text-[#B3B3B3] text-sm mb-4">
                {truncateDescription(blog.description)}
              </p>

              {/* Learn More and Icons */}
              <div className="flex justify-between items-center">
                <Link
                  href={`/pages/blog/${blog.id}`}
                  className="text-[#FF9F0D] font-semibold hover:underline"
                >
                  Learn More
                </Link>

                <div className="flex items-center gap-3 text-[#FFFFFF]">
                  <AiOutlineLike
                    size={20}
                    className="cursor-pointer hover:text-[#FF9F0D]"
                  />
                  <LuMessageSquareMore
                    size={20}
                    className="cursor-pointer hover:text-[#FF9F0D]"
                  />
                  <IoShareSocialOutline
                    size={20}
                    className="cursor-pointer hover:text-[#FF9F0D]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
}
