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
      title: "Corporate law Banking & Insurance",
      description:
        "HJ & A is dedicated to delivering tailored legal solutions that meet the unique needs of our clients. Whether navigating complex financing transactions or ensuring regulatory compliance, our team is equipped to provide the highest level of legal support to banks and other financial institutions, and insurance companies operating in Nigeria and beyond."
    },
    {
      title: "Fintech Practice",
      description:
        "At Habeeb Jimoh & Associates, we are committed to driving innovation and success in the fintech industry through exceptional legal services. Our client-centric approach ensures that we understand your business goals and tailor our services to meet your specific needs. With extensive experience and deep industry knowledge, we are well-equipped to help you navigate the complexities of the fintech landscape and achieve your strategic objectives."
    },
    {
      title: "RegTech and InsurTech",
      description:
        "At HJ & A, our RegTech and InsurTech practice is driven by a commitment to innovation and a deep understanding of the legal challenges these industries face. We work closely with our clients to develop legal strategies that ensure compliance while supporting their growth and innovation goals. Whether you are developing new technologies, forming partnerships, or seeking to ensure regulatory compliance, HJA is your trusted partner in these dynamic and evolving sectors."
    },
    {
      title: "Intellectual Property & Data Privacy Law ",
      description:
        "The integration of our extensive background in intellectual property with our proficiency in corporate and commercial law equips us with a unique skill set. This enables us to adeptly guide clients through the complex intellectual property challenges that emerge in commercial transactions."
    },
    {
      title: "Dispute Resolution",
      description:
        "Our dispute resolution group is highly skilled in handling a broad spectrum of commercial disputes, including commercial debt recovery, employment and trade disputes, finance and securities disputes. Our expertise lies in solving problems and managing risks. Our experienced litigators effectively and efficiently bring cases, including the most complex, multifaceted issues, to resolution through Nigerian courts, arbitration or alternative dispute resolution."
    },
    {
      title: "Matrimonial Causes",
      description:
        "At HJ & A, we specialize in guiding individuals through the complex and often emotional landscape of matrimonial law and processes. Our team of experienced lawyers are dedicated to providing expert counsel and representation in all aspects of matrimonial matters."
    },
    {
      title: "Real Estate",
      description:
        "Our real estate and construction team supports clients at every stage of real estate development, from planning and due diligence on land acquisition, to assisting with title perfection, advising on corporate structures and joint development agreements, and ultimately leasing office spaces or residential units to tenants upon completion of construction."
    },
    {
      title: "Immigration",
      description:
        "At Habeeb Jimoh & Associates (HJA), our Immigration Practice is dedicated to offering comprehensive legal services for individuals and businesses navigating the complexities of immigration law in Nigeria. We provide expert guidance on all aspects of immigration, including visa applications, work permits, expatriate quotas, and residency status."
    },
    {
      title: "Labour & Employment",
      description:
        "We ensure that both employers and employees understand and adhere to evolving legal standards, offering support through negotiation, mediation, and litigation. Whether you're managing a workforce or protecting your rights, HJA is your trusted partner for all labor and employment matters."
    },
    {
      title: "Transport & Logistics",
      description:
        "We offer specialized legal services for Nigeria’s transport and logistics companies. In recent years, we have continue to provide expert guidance on regulatory compliance, contract negotiations, and dispute resolution, ensuring that businesses in these industries operate smoothly and efficiently. For transport businesses, we address issues related to contracts, fleet management, and regulatory compliance. In logistics, we assist with supply chain management, warehousing, and customs regulations."
    },
    {
      title: "Environmental Law & Climate Change ",
      description:
        "When a company faces a lawsuit over pollution or environmental damage, our team defends them in the courts, which is a necessary part of this practice. We also do the critical background checks for large property deals, looking for hidden environmental problems that could later become a serious financial liability for the buyer, and we are very good at that part of the job. We believe that a business should be able to grow without harming the environment, and our job is to help them find that balance."
    }
  ];

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-20 px-6">
        <Head>
          <title>Habeeb Jimoh & Associates| About Us</title>
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
              About Habeeb Jimoh & Associates (HJ & A)
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto text-justify">
              Is a leading hybrid law firm based in the heart of Lagos, Nigeria,
              renowned for its innovative approach to legal services. We
              leverage cutting-edge technology to provide seamless, efficient,
              and effective legal solutions to our clients, regardless of their
              geographical location. Our team comprises experienced and
              dedicated legal professionals who excel in various practice areas,
              including corporate law, Banking & Insurance law, Fintech,
              RegTech, intellectual property Law, Dispute resolution,
              Matrimonial Causes, Real Estate, Immigration, Environmental Law,
              Labour & Employment, Transport & Logistics, Data Protection and
              beyond. We are committed to setting new standards of excellence in
              the legal industry.
            </p>
          </motion.section>

          {/* Mission, Vision, Values */}
          <section className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Our Mission",
                text: "Our mission is to revolutionize legal services by providing top-tier, accessible, and efficient legal solutions through a hybrid platform. We strive to uphold the highest standards of professionalism and integrity, building lasting relationships with our clients through personalized attention and exceptional legal expertise. Our goal is to consistently meet and exceed our clients' evolving needs, ensuring their success and peace of mind.",
                image: "/mission.png"
              },
              {
                title: "Our Vision",
                text: "To redefine the legal landscape by becoming the foremost virtual law firm in Africa, celebrated for our unwavering dedication to innovation, excellence, and unparalleled client satisfaction.",
                image: "/vision.png"
              },
              {
                title: "Our Values",
                text: "Integrity, Innovation, Excellence, Client-Centricity, and Collaboration.",
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
