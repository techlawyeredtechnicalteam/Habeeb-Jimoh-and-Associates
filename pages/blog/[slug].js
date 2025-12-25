import Layout from "../../components/Layout";
import { client, urlFor } from "../../lib/sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useState } from "react";

const components = {
  types: {
    image: ({ value }) => {
      // Add safety check here
      if (!value || !value.asset) return null;
      return (
        <img
          src={urlFor(value).width(800).url()}
          alt="Blog Image"
          className="my-4 rounded-lg"
        />
      );
    }
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold my-4">{children}</h2>
    ),
    normal: ({ children }) => (
      <p className="my-2 text-gray-700 leading-relaxed">{children}</p>
    )
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value.href}
        className="text-blue-600 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }
};

const CommentForm = ({ postId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify({ ...formData, _id: postId })
    });

    const data = await response.json();

    if (response.ok) {
      setSubmitted(true);
    } else {
      alert("Failed to submit comment");
    }
  };

  return submitted ? (
    <p className="text-green-600 mt-4 text-center font-semibold">
      Thank you! Your comment will appear once approved.
    </p>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-6 max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Leave a Comment
      </h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-gray-600">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="comment" className="text-gray-600">
          Comment
        </label>
        <textarea
          id="comment"
          placeholder="Enter your comment"
          required
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
          className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 h-32 resize-none"
        ></textarea>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-3 mt-4 bg-primary-500 text-black rounded-lg font-semibold shadow-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-opacity-50"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export async function getStaticPaths() {
  const query = `*[_type == "post"]{ slug }`;
  const posts = await client.fetch(query);

  const paths = posts.map((post) => ({
    params: { slug: post.slug.current }
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    body,
    mainImage,
    author->{
      name,
      image,
      bio
    },
    "comments": *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true
    ]{
      _id,
      name,
      comment
    }
  }`;

  const post = await client.fetch(query, { slug: params.slug });

  return { props: { post }, revalidate: 60 };
}

export default function BlogPost({ post }) {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {/* Main Image - with safety check */}
        {post.mainImage && post.mainImage.asset && (
          <Image
            src={urlFor(post.mainImage).url()}
            width={1200}
            height={600}
            alt={post.title}
            className="rounded-lg"
          />
        )}

        <div className="mt-6">
          <PortableText value={post.body} components={components} />
        </div>

        {/* Author Info - with safety checks */}
        {post.author && (
          <div className="flex items-center mt-6 mb-10 space-x-4">
            {post.author.image && post.author.image.asset && (
              <Image
                src={urlFor(post.author.image).width(100).height(100).url()}
                width={50}
                height={50}
                alt={post.author.name || "Author"}
                className="rounded-full object-cover"
              />
            )}
            <div>
              {post.author.name && (
                <h3 className="text-lg font-semibold">{post.author.name}</h3>
              )}
              {post.author.bio && (
                <div className="text-sm text-gray-500">
                  <PortableText
                    value={post.author.bio}
                    components={components}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Comments section - currently commented out */}
        {/* 
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Comments</h3>
          {Array.isArray(post.comments) && post.comments.length > 0 ? (
            post.comments.map((c) => (
              <div key={c._id} className="border-b py-2">
                <p className="font-medium">{c.name}</p>
                <p>{c.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>

        <CommentForm postId={post._id} />
        */}
      </div>
    </Layout>
  );
}

// import Layout from "../../components/Layout";
// import { client, urlFor } from "../../lib/sanity";
// import Image from "next/image";
// import { PortableText } from "@portabletext/react";

// const components = {
//   types: {
//     image: ({ value }) => {
//       if (!value?.assest) return null;
//       return (
//         <img
//           src={urlFor(value).width(800).url()}
//           alt="Blog Image"
//           className="my-4 rounded-lg"
//         />
//       );
//     }
//   },
//   block: {
//     h1: ({ children }) => (
//       <h1 className="text-3xl font-bold my-4">{children}</h1>
//     ),
//     h2: ({ children }) => (
//       <h2 className="text-2xl font-semibold my-4">{children}</h2>
//     ),
//     normal: ({ children }) => (
//       <p className="my-2 text-gray-700 leading-relaxed">{children}</p>
//     )
//   },
//   marks: {
//     strong: ({ children }) => (
//       <strong className="font-semibold">{children}</strong>
//     ),
//     em: ({ children }) => <em className="italic">{children}</em>,
//     link: ({ value, children }) => (
//       <a
//         href={value.href}
//         className="text-blue-600 underline"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         {children}
//       </a>
//     )
//   }
// };

// import { useState } from "react";

// const CommentForm = ({ postId }) => {
//   console.log("Post ID:", postId);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     comment: ""
//   });
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("/api/createComment", {
//       method: "POST",
//       body: JSON.stringify({ ...formData, _id: postId })
//     });

//     const data = await response.json();
//     console.log("Server Response:", data);

//     if (response.ok) {
//       setSubmitted(true);
//     } else {
//       alert("Failed to submit comment");
//     }
//   };

//   return submitted ? (
//     <p className="text-green-600 mt-4 text-center font-semibold">
//       Thank you! Your comment will appear once approved.
//     </p>
//   ) : (
//     <form
//       onSubmit={handleSubmit}
//       className="mt-6 space-y-6 max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md"
//     >
//       <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
//         Leave a Comment
//       </h2>

//       <div className="flex flex-col gap-2">
//         <label htmlFor="name" className="text-gray-600">
//           Name
//         </label>
//         <input
//           type="text"
//           id="name"
//           placeholder="Enter your name"
//           required
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
//         />
//       </div>

//       <div className="flex flex-col gap-2">
//         <label htmlFor="email" className="text-gray-600">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           placeholder="Enter your email"
//           required
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
//         />
//       </div>

//       <div className="flex flex-col gap-2">
//         <label htmlFor="comment" className="text-gray-600">
//           Comment
//         </label>
//         <textarea
//           id="comment"
//           placeholder="Enter your comment"
//           required
//           onChange={(e) =>
//             setFormData({ ...formData, comment: e.target.value })
//           }
//           className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 h-32 resize-none"
//         ></textarea>
//       </div>

//       <div className="flex justify-center">
//         <button
//           type="submit"
//           className="px-6 py-3 mt-4 bg-primary-500 text-black rounded-lg font-semibold shadow-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-opacity-50"
//         >
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };

// export async function getStaticPaths() {
//   const query = `*[_type == "post"]{ slug }`;
//   const posts = await client.fetch(query);

//   const paths = posts.map((post) => ({
//     params: { slug: post.slug.current }
//   }));

//   return { paths, fallback: "blocking" };
// }

// export async function getStaticProps({ params }) {
//   const query = `*[_type == "post" && slug.current == $slug][0]{
//     _id,
//     title,
//     body,
//     mainImage,
//     author->{
//       name,
//       image,
//       bio
//     },
//     "comments": *[
//       _type == "comment" &&
//       post._ref == ^._id &&
//       approved == true
//     ]{
//       _id,
//       name,
//       comment
//     }
//   }`;

//   const post = await client.fetch(query, { slug: params.slug });

//   // Log the fetched post to check if _id exists
//   console.log("Fetched Post:", post);

//   return { props: { post }, revalidate: 60 };
// }

// const query = `*[_type == "post" && slug.current == $slug][0]{
//   ...,
//   "comments": *[_type == "comment" && post._ref == ^._id && approved == true]
// }`;

// export default function BlogPost({ post }) {
//   return (
//     <Layout>
//       <div className="max-w-3xl mx-auto px-4 py-10">
//         <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
//         <Image
//           src={urlFor(post.mainImage).url()}
//           width={1200}
//           height={600}
//           alt={post.title}
//           className="rounded-lg"
//         />
//         <div className="mt-6">
//           <PortableText value={post.body} components={components} />
//         </div>
//         {/* Author Info */}
//         {post.author && (
//           <div className="flex items-center mt-6 mb-10 space-x-4">
//             {post.author.image && (
//               <Image
//                 src={urlFor(post.author.image).width(100).height(100).url()}
//                 width={50}
//                 height={50}
//                 alt={post.author.name || "Author"}
//                 className="rounded-full object-cover"
//               />
//             )}
//             <div>
//               <h3 className="text-lg font-semibold">{post.author?.name}</h3>
//               {post.author?.bio && (
//                 <div className="text-sm text-gray-500">
//                   <PortableText
//                     value={post.author.bio}
//                     components={components}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//         {/* <div className="mt-8">
//           <h3 className="text-xl font-semibold">Comments</h3>
//           {Array.isArray(post.comments) && post.comments.length > 0 ? (
//             post.comments.map((c) => (
//               <div key={c._id} className="border-b py-2">
//                 <p className="font-medium">{c.name}</p>
//                 <p>{c.comment}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No comments yet.</p>
//           )}
//         </div>

//         <CommentForm postId={post._id} /> */}
//       </div>
//     </Layout>
//   );
// }
