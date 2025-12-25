import Layout from "../../components/Layout";
import { client } from "../../lib/sanity";
import Link from "next/link";

export default function TermsIndex({ terms }) {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & Agreements
          </h1>
          <p className="text-lg text-gray-600">
            Terms and conditions governing our services and your use of our
            website
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {terms.map((term) => (
            <Link
              key={term._id}
              href={`/terms/${term.slug.current}`}
              className="block"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {term.title}
                </h2>
                {term.description && (
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {term.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Updated:{" "}
                    {new Date(term.lastUpdated).toLocaleDateString("en-US", {
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

        {/* <section className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Questions About Our Terms?
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions, please contact us:
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
  const query = `*[_type == "policy" && category == "terms"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    lastUpdated
  }`;

  const terms = await client.fetch(query);

  return {
    props: { terms },
    revalidate: 3600
  };
}
