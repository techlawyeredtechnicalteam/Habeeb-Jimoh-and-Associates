import Head from "next/head";
import Layout from "../../components/Layout";
import { client } from "../../lib/sanity";
import Link from "next/link";

export default function PoliciesIndex({ policies }) {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Policies
          </h1>
          <p className="text-lg text-gray-600">
            Please review our policies to understand how we protect your rights
            and privacy.
          </p>
        </div>

        {/* Policy Cards Grid */}
        <div className="space-y-4">
          {policies.map((policy) => (
            <Link
              key={policy._id}
              href={`/policy/${policy.slug.current}`}
              className="block"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:text-blue-950 transition-shadow duration-300 h-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {policy.title}
                </h2>
                {policy.description && (
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {policy.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Updated:{" "}
                    {new Date(policy.lastUpdated).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </span>
                  <span className="text-primary-600 font-semibold">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact Section */}
        {/* <section className="bg-gray-50 p-8 rounded-lg mt-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Questions About Our Policies?
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about these policies or how we handle your
            information, please don't hesitate to contact us.
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

export async function getStaticProps() {
  const query = `*[_type == "policy"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    lastUpdated
  }`;

  const policies = await client.fetch(query);

  return {
    props: { policies },
    revalidate: 3600
  };
}
