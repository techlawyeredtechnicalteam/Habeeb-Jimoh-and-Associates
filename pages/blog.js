import Head from "next/head";
import BlogList from "./BlogList";
import Layout from "../components/Layout";
import { getStaticProps } from "../src/services/BlogStaticProps";

export { getStaticProps };

export default function Blog({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Amas & Rhod Law | Blog</title>
      </Head>
      <BlogList posts={posts} showTitle={true} />
    </Layout>
  );
}

// {posts.map((post) => (
//   <div
//     key={post._id}
//     className="flex flex-col md:flex-row gap-4 bg-white shadow-md rounded-md p-4"
//   >
//     {/* Image */}
//     {post.mainImage?.asset?.url && (
//       <div className="md:w-1/3 w-full">
//         <Image
//           src={post.mainImage.asset.url}
//           alt={post.title}
//           width={400}
//           height={250}
//           className="rounded-md object-cover w-full h-full"
//         />
//       </div>
//     )}

//     {/* Post Content */}
//     <div className="md:w-2/3 w-full flex flex-col justify-between">
//       <div>
//         <Link href={`/blog/${post.slug.current}`}>
//           <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-950">
//             {post.title}
//           </h2>
//         </Link>

//         {/* Meta Info */}
//         <div className="flex items-center text-sm text-gray-600 mt-2 space-x-4">
//           {post.author?.name && (
//             <span className="flex items-center space-x-1">
//               <FaUser />
//               <span>{post.author.name}</span>
//             </span>
//           )}
//           <BlogDate date={post.publishedAt} />
//           <span className="flex items-center space-x-1">
//             <FaComments />
//             <span>0 Comments</span>{" "}
//             {/* replace with real comment count if available */}
//           </span>
//         </div>

//         {/* Excerpt */}
//         <p className="text-gray-700 mt-3">
//           {post.body[0]?.children[0]?.text?.substring(0, 200) ||
//             "No preview available"}
//           ...
//         </p>

//         {/* Categories */}
//         <div className="text-xs text-gray-500 mt-3">
//           Categories:{" "}
//           {post.categories?.map((cat, index) => (
//             <span key={index}>
//               {cat.title}
//               {index < post.categories.length - 1 ? ", " : ""}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Read More Button */}
//       <div className="mt-4">
//         <Link
//           href={`/blog/${post.slug.current}`}
//           className="inline-block bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
//         >
//           Continue Reading →
//         </Link>
//       </div>
//     </div>
//   </div>
// ))}
