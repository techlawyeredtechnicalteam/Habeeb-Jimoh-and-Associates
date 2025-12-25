import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";

// Animations
const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i = 1) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" }
  })
};

export default function AboutUs() {
  const focusAreas = [
    {
      title: "Maritime law",
      description:
        "Providing legal advisory and representation across maritime operations, including contract drafting and review for shipping, haulage and logistics transactions, demurrage and freight disputes, vessel chartering agreements, cargo claims, regulatory compliance, and enforcement of maritime rights before competent tribunals, in line with the Admiralty Jurisdiction Act and other applicable laws."
    },
    {
      title: "Entertainment law",
      description:
        "Providing comprehensive legal support to creatives and entertainment businesses in the negotiation, drafting, and enforcement of contracts, intellectual property protection, talent representation, and regulatory compliance across the media and entertainment industry."
    },
    {
      title: "Immigration Law",
      description:
        "Providing legal representation and advisory services on immigration matters, including visa applications, permanent residency and citizenship processing, and compliance with statutory and administrative immigration requirements."
    },
    {
      title: "Family law",
      description:
        "Providing legal advisory and representation in family law matters, including marriage validation, dissolution of marriage, child custody and maintenance proceedings, domestic abuse and violence, domestic partnership agreements, inheritance rights, Wills and probate, and enforcement of family-related court orders, in accordance with applicable statutory and customary law frameworks."
    },
    {
      title: "Property law",
      description:
        "Providing legal advisory on real estate transactions, including title investigation, land verification, property documentation, contract drafting, tenancy structuring, and dispute prevention, in accordance with relevant land and conveyancing laws."
    }
  ];

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-20 px-6">
        <Head>
          <title>Amas & Rhod Law | About Us</title>
        </Head>

        <div className="max-w-7xl mx-auto space-y-24">
          {/* Hero Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-garamond">
              About Amas & Rhod Law
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto text-justify">
              Established in May 2022, in Lagos State Nigeria, Amas & Rhod Law
              is a modern legal practice focused on delivering practical and
              accessible legal solutions across maritime, entertainment, family,
              property and immigration law. We have advised and represented
              clients ranging from truckers and logistics operators, transport
              unions, to creatives within the entertainment industry and
              property owners, handling contract reviews, regulatory compliance,
              negotiations, ADR, and dispute prevention. Known for our
              professionalism, proactiveness, in time responsiveness, and
              affordability, we remain committed to protecting our clients&apos;
              interests with clarity and efficiency.
              {/* Law in action. Protection in motion; Our Lawyers are working! */}
            </p>
          </motion.section>

          {/* Mission, Vision, Values */}
          <section className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Our Mission",
                text: "To empower clients with practical and top-tier legal solutions, delivered with confidence, insight, and strategic clarity. We are committed to protecting our clients’ interests, preventing disputes, and providing decisive representation across every legal challenge.",
                image: "/mission.png"
              },
              {
                title: "Our Vision",
                text: "To redefine the legal landscape by empowering individuals and businesses through exceptional advocacy and trusted counsel.",
                image: "/vision.png"
              },
              {
                title: "Our Values",
                text: "Integrity, diligence, excellence, empathy, and innovation are the core principles that guide every aspect of our practice.",
                image: "/values.png"
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="h-52 relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </section>

          {/* Focus Areas Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-garamond mb-8">
              Our Focus Areas
            </h2>

            <div className="h-72 w-full relative rounded-2xl overflow-hidden shadow-md mb-14">
              <Image
                src="/focus.png"
                alt="Our Practice Areas"
                fill
                className="object-cover"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {focusAreas.map((area, i) => (
                <motion.div
                  key={area.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <h4 className="text-xl font-bold text-primary-300">
                    {area.title}
                  </h4>
                  <p className="mt-2 text-sm text-gray-700">
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
}
