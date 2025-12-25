import Layout from "../../components/Layout";
import { client } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

const components = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="my-4 text-gray-700 leading-relaxed">{children}</p>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 my-4 space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 my-4 space-y-2 text-gray-700">
        {children}
      </ol>
    )
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value.href}
        className="text-primary-600 underline hover:text-primary-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }
};

export default function PolicyDetailPage({ policy, relatedPolicies }) {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/terms"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          ← Back to Terms
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {policy.title}
          </h1>
          <p className="text-gray-600">
            Last updated:{" "}
            {new Date(policy.lastUpdated).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </p>
          {policy.description && (
            <p className="text-lg text-gray-700 mt-4 leading-relaxed">
              {policy.description}
            </p>
          )}
        </div>

        <div className="prose prose-lg max-w-none">
          <PortableText value={policy.content} components={components} />
        </div>

        {relatedPolicies.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Policies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPolicies.map((p) => (
                <Link
                  key={p._id}
                  href={`/terms/${p.slug.current}`}
                  className="block bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {p.title}
                  </h3>
                  <span className="text-sm text-primary-600">Read Terms →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* <section className="bg-gray-50 p-8 rounded-lg mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions?</h2>
          <p className="text-gray-700 mb-4">
            Contact us if you have questions about this terms:
          </p>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Email:</strong> info@amasandrhodlaw.com
            </p>
            <p>
              <strong>Phone:</strong> +234 813 464 2665
            </p>
            <p>
              <strong>Address:</strong> Emerge Hub No 4 Ayanboye street,
              <br />
              faramobi Ajike street Anthony village,
              <br />
              Lagos, Nigeria.
            </p>
          </div>
        </section> */}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const query = `*[_type == "policy" && category == "terms"]{ slug }`;
  const policies = await client.fetch(query);

  const paths = policies.map((policy) => ({
    params: { slug: policy.slug.current }
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const policyQuery = `*[_type == "policy" && category == "terms" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    lastUpdated,
    content
  }`;

  const relatedQuery = `*[_type == "policy" && category == "terms" && slug.current != $slug] | order(order asc) {
    _id,
    title,
    slug
  }`;

  const policy = await client.fetch(policyQuery, { slug: params.slug });
  const relatedPolicies = await client.fetch(relatedQuery, {
    slug: params.slug
  });

  if (!policy) {
    return { notFound: true };
  }

  return {
    props: { policy, relatedPolicies },
    revalidate: 3600
  };
}
