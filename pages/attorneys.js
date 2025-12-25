import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import Layout from "../components/Layout";

const attorneys = [
  {
    name: "Temilorun F. Komolafe ESQ, LL.M, ACIARB, MIMA (UK)",
    title: "Principal Counsel",
    // bio: 'Sophia has over 20 years of experience in corporate law, specializing in mergers and acquisitions.',
    image: "/owner.png"
  },
  {
    name: "N.C Muojekwu ESQ",
    title: "Associate",
    // bio: 'James represents clients in complex civil litigation and arbitration across multiple jurisdictions.',
    image: "/lawyer.png"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const Attorneys = () => {
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-20 px-4">
        <Head>
          <title>Amas & Rhod Law | Attorneys</title>
        </Head>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-garamond font-bold text-gray-900 mb-4">
              Meet Our Attorneys
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A team of passionate legal professionals committed to excellence
              and justice.
            </p>
          </div>

          {/* Attorney Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 px-6 lg:px-60">
            {attorneys.map((attorney, i) => (
              <motion.div
                key={attorney.name}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <div className="relative w-full aspect-square max-w-sm mx-auto overflow-hidden rounded-2xl">
                  <Image
                    src={attorney.image}
                    alt={attorney.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold font-garamond text-gray-900">
                    {attorney.name}
                  </h3>
                  <p className="text-sm text-primary-200 mt-1 italic">
                    {attorney.title}
                  </p>
                  {/* <p className="text-gray-600 mt-4 text-sm">{attorney.bio}</p> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Attorneys;
