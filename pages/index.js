"use client";
import Image from "next/image";
import BlogList from "./BlogList";
import { AnimatePresence, useInView } from "framer-motion";
import Layout from "../components/Layout";
import { useAnimation } from "framer-motion";
import { FocusAreaModal, focusAreas } from "../src/data/focusArea";
import { useEffect, useRef, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { testimonials } from "../src/data/testimonial";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getStaticProps } from "../src/services/BlogStaticProps";
// import TwitterFeed from "../components/TwitterFeed";
// import LinkedInFeed from "../components/LinkedInFeed";

export { getStaticProps };

export default function Home({ posts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedArea, setSelectedArea] = useState(null);

  // Auto testimonials every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const openModal = (area) => setSelectedArea(area);
  const closeModal = () => setSelectedArea(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <Layout>
      <div className="font-sans text-gray-800">
        <main className="">
          {/* Hero Section */}
          <section className="relative h-screen w-full">
            <Image
              src="/hero.png"
              alt="Habeeb Jimoh & Associates"
              fill
              priority
              className="object-cover object-center z-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 z-10 flex flex-col items-center justify-center text-center text-white px-4">
              <h1 className="text-5xl md:text-6xl font-garamond font-bold mb-6 leading-tight">
                Habeeb Jimoh & Associates
              </h1>
              {/* <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Innovative approach to legal services
              </p> */}
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 bg-gray-50 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex items-start">
                <Image
                  src="/logo.png"
                  alt="Habeeb Jimoh & Associates"
                  width={200}
                  height={200}
                />
              </div>
              <div>
                <h2 className="text-4xl font-garamond font-bold mb-4">
                  About Us
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Habeeb Jimoh & Associates (HJ & A) is a leading hybrid law
                  firm based in the heart of Lagos, Nigeria, renowned for its
                  innovative approach to legal services. We leverage
                  cutting-edge technology to provide seamless, efficient, and
                  effective legal solutions to our clients, regardless of their
                  geographical location.
                </p>
              </div>
            </div>
          </section>

          {/* Practice Areas */}
          <section
            id="practice-areas"
            className="bg-[#c8c8c4] text-white py-24 px-6 md:px-20"
          >
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl font-garamond md:text-5xl font-bold mb-6 text-[#B7860D]">
                What <span className="text-primary-200 italic">we do</span>
              </h2>
              <p className="text-gray-800 text-lg mb-16">
                Click on any area to learn more about our expertise.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-24 bg-primary-100 text-black px-6">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl font-garamond font-bold mb-12">
                Why Partner With Us?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Card 1 */}
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/buildings.png"
                    alt="Dispute Resolution"
                    width={600}
                    height={256}
                    className="w-full h-[22rem] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm p-4">
                    <h3 className="text-2xl font-semibold font-garamond mb-4">
                      Our Mission
                    </h3>
                    <p className="text-sm text-gray-700 text-center mt-2">
                      Our mission is to revolutionize legal services by
                      providing top-tier, accessible, and efficient legal
                      solutions through a hybrid platform. We strive to uphold
                      the highest standards of professionalism and integrity,
                      building lasting relationships with our clients through
                      personalized attention and exceptional legal expertise.
                      Our goal is to consistently meet and exceed our clients'
                      evolving needs, ensuring their success and peace of mind.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/values.png"
                    alt="Corporate & Commercial Law"
                    width={600}
                    height={256}
                    className="w-full h-[24rem] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm p-4">
                    <h3 className="text-2xl font-semibold font-garamond mb-4">
                      Our Values
                    </h3>
                    <p className="text-sm text-gray-700 text-center mt-2 font-bold">
                      Integrity, Innovation, Excellence, Client-Centricity, and
                      Collaboration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-[#b7860d] py-24 px-6 md:px-16 text-center overflow-hidden">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-garamond md:text-5xl font-bold mb-6 text-white">
                Client Testimonials
              </h2>
              <p className="text-lg text-gray-400 mb-16">
                Hear directly from those we've helped achieve success.
              </p>

              {/* Testimonials slider */}
              <div className="relative">
                {/* Testimonial Cards Container */}
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="w-full flex-shrink-0 px-4">
                        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md mx-auto max-w-3xl">
                          <div className="text-5xl text-blue-950 mb-4">"</div>
                          <p className="text-black text-base md:text-lg leading-relaxed mb-8">
                            {testimonial.quote}
                          </p>

                          {/* Star Rating */}
                          <div className="flex items-center justify-center space-x-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className="w-5 h-5 text-yellow-400 fill-yellow-400"
                              />
                            ))}
                          </div>

                          <hr className="border-t border-gray-300 my-6" />
                          <p className="italic text-black font-medium">
                            - {testimonial.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6 text-black" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6 text-black" />
                </button>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section
            id="contact"
            className="bg-primary-200 text-white py-24 px-4 text-center"
          >
            <h2 className="text-4xl font-garamond font-bold mb-6">
              Let's Get Started
            </h2>
            <p className="mb-8 text-lg max-w-2xl mx-auto">
              Ready to take the next step? Contact us today to discuss how we
              can support your legal journey.
            </p>
            <a
              href="/contact"
              className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300"
            >
              Contact Us
            </a>
          </section>
          {/* Blog */}
          {/* <BlogList posts={posts} showTitle={true} /> */}
          {/* LinkedIn Feed */}
          {/* <LinkedInFeed companyId="amasandrhodlaw" /> */}
        </main>
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
