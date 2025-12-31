import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("https://formspree.io/f/mjkjkkrw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "Success",
          message: "Message sent successfully! We'll get back to you soon."
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again"
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-20 px-4 min-h-screen">
        <Head>
          <title>Habeeb Jimoh & Associates| Contact Us</title>
        </Head>
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-garamond text-gray-900">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              We&apos;d love to hear from you. Whether you have a question, want
              to schedule a consultation, or simply say hello — feel free to
              reach out.
            </p>
          </motion.div>

          {/* Contact Details & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-5 lg:px-20 gap-2">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={1}
              className="lg:col-span-2"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-2">
                <div className="flex items-start mb-4">
                  <MapPin className="text-blue-950 mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold text-blue-950 text-lg">
                      Contact US
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Valley View Close,
                      <br />
                      Valley Estate, Ikeja,
                      <br />
                      Lagos, Nigeria.
                    </p>
                  </div>
                </div>

                <div className="flex items-start mb-4">
                  <Phone className="text-blue-950 mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      Phone
                    </h3>
                    <a href="tel:+2347038771202" className="hover:underline">
                      +234 703 877 1202, <br />
                    </a>
                    <a href="tel:+2348058334106" className="hover:underline">
                      +234 805 833 4106 <br />
                    </a>
                  </div>
                </div>

                <div className="flex items-start mb-4">
                  <Mail className="text-blue-950 mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      Email
                    </h3>
                    <a
                      href="mailto:info@habeebjimohandassociates.com"
                      className="hover:underline"
                    >
                      info@habeebjimohandassociates.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form  */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={2}
              className="w-full bg-white p-8 rounded-xl shadow-lg lg:col-span-3"
            >
              <h2 className="text-2xl font-bold text-blue-950 mb-6">
                Send us a Message
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="+234 800 000 0000"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="Subject of your message"
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message *
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>
              {/* {status.message && (
                <p
                  className={`text-sm text-center ${
                    status.type === "Success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {status.message}
                </p>
              )} */}

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mt-6 gap-2 w-full bg-blue-950 text-white py-3 px-6 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
