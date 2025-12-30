import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import { FocusAreaModal, focusAreas } from "../src/data/focusArea";

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
  const [selectedArea, setSelectedArea] = useState(null);

  const openModal = (area) => setSelectedArea(area);
  const closeModal = () => setSelectedArea(null);

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
              About Habeeb Jimoh & Associates
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-5xl mx-auto text-justify">
              (HJ & A) Is a leading hybrid law firm based in the heart of Lagos,
              Nigeria, renowned for its innovative approach to legal services.
              We leverage cutting-edge technology to provide seamless,
              efficient, and effective legal solutions to our clients,
              regardless of their geographical location. Our team comprises
              experienced and dedicated legal professionals who excel in various
              practice areas, including corporate law, Banking & Insurance law,
              Fintech, RegTech, intellectual property Law, Dispute resolution,
              Matrimonial Causes, Real Estate, Immigration, Environmental Law,
              Labour & Employment, Transport & Logistics, Data Protection and
              beyond. We are committed to setting new standards of excellence in
              the legal industry.
            </p>
          </motion.section>

          {/* Mission, Vision, Values */}
          <section className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Our Mission",
                text: "Our mission is to revolutionize legal services by providing top-tier, accessible, and efficient legal solutions through a hybrid platform. We strive to uphold the highest standards of professionalism and integrity, building lasting relationships with our clients through personalized attention and exceptional legal expertise. Our goal is to consistently meet and exceed our clients' evolving needs, ensuring their success and peace of mind.",
                image: "/mission.png"
              },
              // {
              //   title: "Our Vision",
              //   text: "To redefine the legal landscape by becoming the foremost virtual law firm in Africa, celebrated for our unwavering dedication to innovation, excellence, and unparalleled client satisfaction.",
              //   image: "/vision.png"
              // },
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
                  <p className="text-sm text-gray-600 font-bold">{item.text}</p>
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
              What we do
            </h2>

            <div className="h-72 w-full relative rounded-2xl overflow-hidden shadow-md mb-14">
              <Image
                src="/focus.png"
                alt="Our Practice Areas"
                fill
                className="object-cover"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {focusAreas.map((area, idx) => (
                <div
                  key={idx}
                  onClick={() => openModal(area)}
                  className="relative rounded-xl overflow-hidden shadow-xl cursor-pointer group h-64"
                >
                  {/* Background Image */}
                  {area.image ? (
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-primary-200/50 flex items-center justify-center">
                      <span className="text-white text-lg">
                        Image Placeholder
                      </span>
                    </div>
                  )}

                  {/* Title Overlay */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition duration-300 flex items-center justify-center p-4">
                    <h4 className="text-2xl font-garamond font-bold text-white text-center">
                      {area.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* Modal Overlay: Uses AnimatePresence for smooth entry/exit */}
      <AnimatePresence>
        {selectedArea && (
          <FocusAreaModal area={selectedArea} onClose={closeModal} />
        )}
      </AnimatePresence>
    </Layout>
  );
}
