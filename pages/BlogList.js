import Link from "next/link";
import Image from "next/image";
import { FaUser, FaComments } from "react-icons/fa";
import dynamic from "next/dynamic";

const BlogDate = dynamic(() => import("../components/BlogDate"), {
  ssr: false
});

export default function BlogList({ posts = [], showTitle = false }) {
  if (!posts || posts.length === 0) {
    return <p className="text-gray-600">No blog posts available.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {showTitle && <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            // href={`/blog/${post.slug.current}`}
            className="flex flex-col md:flex-row gap-4 bg-white shadow-md rounded-md p-4"
          >
            {/* Image */}
            {post.mainImage?.asset?.url && (
              <div className="md:w-1/3 w-full">
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
            )}

            {/* Post Content */}
            <div className="md:w-2/3 w-full flex flex-col justify-between">
              <div>
                <Link href={`/blog/${post.slug.current}`}>
                  <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-950">
                    {post.title}
                  </h2>
                </Link>

                {/* Meta Info */}
                <div className="flex items-center text-sm text-gray-600 mt-2 space-x-4">
                  {post.author?.name && (
                    <span className="flex items-center space-x-2">
                      <FaUser />
                      <span>{post.author.name}</span>
                    </span>
                  )}
                  <BlogDate date={post.publishedAt} />
                  <span className="flex items-center space-x-2">
                    <FaComments />
                    <span>0 Comments</span>
                  </span>
                </div>

                {/* Excerpt */}
                <p className="text-gray-700 mt-3">
                  {post.body[0]?.children[0]?.text?.substring(0, 200) ||
                    "No preview available"}
                  ...
                </p>

                {/* Categories */}
                <div className="text-xs text-gray-500 mt-3">
                  Categories:{" "}
                  {post.categories?.map((cat, index) => (
                    <span key={index}>
                      {cat.title}
                      {index < post.categories.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>

              {/* Read More Button */}
              <div className="mt-4">
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="inline-block bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
                >
                  Continue Reading →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
