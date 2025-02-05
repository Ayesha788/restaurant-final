import { notFound } from "next/navigation";
import client from "@/sanity.client";
import CommentSection from "../../../components/comment";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
  dateCreated: string;
}

export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  try {
    const blog: Blog | null = await client.fetch(
      `*[_type == "blog" && id == $id][0]{
        id, title, dateCreated, description, "image": image.asset->url
      }`,
      { id }
    );

    if (!blog) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-white py-16 px-6 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Blog Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              {new Date(blog.dateCreated).toLocaleDateString()}
            </p>
            <p className="text-gray-800 text-base leading-relaxed">
              {blog.description}
            </p>
          </div>

          {/* Blog Image */}
          <div className="flex items-center justify-center">
            <Image
              src={blog.image || "/fallback-image.jpg"}
              alt={blog.title}
              width={500}
              height={384}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <Image
              src={blog.image || "/fallback-image.jpg"}
              alt={blog.title}
              width={800}
              height={384}
              className="w-full h-96 object-cover rounded-lg shadow-lg" // Styling class
            />
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-12">
          <CommentSection />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    notFound();
  }
}
