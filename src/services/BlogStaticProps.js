"use client";

import { client } from "../../lib/sanity";

export async function getStaticProps() {
  const query = `*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset -> { url }
    },
    body,
    author->{
      name,
      image
    },
    categories[]->{
      title
    }
  }`;

  const posts = await client.fetch(query);

  return {
    props: { posts },
    revalidate: 60
  };
}
