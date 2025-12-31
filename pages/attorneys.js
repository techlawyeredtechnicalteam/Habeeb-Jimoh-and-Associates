import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";

// Helper function to truncate text
const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  // Find the last space before the max length to avoid cutting a word
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return truncated.substring(0, lastSpace > 0 ? lastSpace : maxLength) + "...";
};

// --- ATTORNEY DATA (No change here from your last provided data) ---
const attorneys = [
  {
    name: "Habeeb Abiola Jimoh",
    title: "Senior Partner",
    bio: "Habeeb Abiola Jimoh is a formidable Commercial Litigation Lawyer. His impressive track record boasts an astonishing number of cases, showcasing his exceptional prowess in commercial litigation and dispute resolution. Habeeb’s expertise extends to various domains, including Banking, Insurance, Labour Law, and Data Protection, Real Estate and more. He is particularly renowned for his pioneering work in areas like Fintech, Cybersecurity law, Intellectual Property law and Environmental law, making him a go-to authority for clients navigating the intricacies of innovative financial technologies and creative assets. Throughout his illustrious career, Habeeb has consistently demonstrated his ability to deliver favourable outcomes for his clients. His notable experience includes cases in which he successfully represented prominent client, as well as his advisory work on complex Banking, Fintech, Intellectual Property, Data Protection and environmental law matters. Habeeb's academic credentials include a Bachelor of Laws degree from prestigious universities, complemented by relevant National and International certifications and training. He is an active member of the following association and various industry associations, underscoring his commitment to staying at the forefront of legal developments:\n1. Nigerian Bar Association - Member\n2. Asian International Arbitration Centre - Member\n3. Centre for American and International Law\n4. Nigerian Institute of Chartered Arbitrators.\n5. Nigerian Maritime Law Association\nTo get in touch with Habeeb, please email Habeeb.a.jimoh@niegerianbar.ng or call +2348058334106, +2347038771202",
    image: "/owner.png"
  },
  {
    name: "Simbiat LoLa ",
    title: "Partner",
    bio: "Simbiat is a multifaceted legal professional with a unique blend of expertise in both Law and Technology. Since her admission to the Nigerian Bar, she has swiftly established herself as a formidable Lawyer with a diverse portfolio of experience. Throughout her career, Simbiat has demonstrated exceptional proficiency in handling high-profile cases across a broad spectrum of legal disciplines, including Tech-law, Corporate, criminal, and family law. Her expertise extends to introducing Technology to alternative dispute resolution, where she has successfully mediated complex matters with finesse and also acted as a Judge in the Willem C. Vis International Commercial Arbitration Moot. In addition to her impressive legal acumen, Simbiat is an ardent enthusiast of literature, dedicating her spare moments to voracious reading. Her intellectual curiosity and passion for knowledge underscore her commitment to staying abreast of the latest developments in her field. Moreover, Simbiat's athletic inclinations are evident in her love for basketball, a testament to her dynamic personality and ability to balance intellectual pursuits with physical activities. She is a member of various professional bodies like:\n1. Nigerian Bar Association\n2. Nigerian Institute of Chartered Arbitrators\n3. Nigeria Bar Association – Member, Executive Committee, Eti-Osa Branch",
    image: "/lawyer.png"
  },
  {
    name: "Habibu M. Abdullahi",
    title: "Consultant Partner",
    bio: "Habibu M. Abdullahi is a Partner who focuses on the energy and mining Law, which is a key area for the firm. His time as a Legal Officer at the Nigerian National Petroleum Company Limited gave him a deep, practical understanding of the regulatory and commercial challenges facing the industry, allowing him to handle complex agreements and internal legal matters for a national entity. This commercial focus extends to Trade Law, where he advises clients on transactions and disputes, and he is a Chartered Arbitrator, a designation he earned in 2019, showing his commitment to mastering alternative dispute resolution processes. Environmental Law is a necessary part of his work, as he guides companies through compliance issues and defends them when pollution or regulatory breaches lead to litigation. Mr. Abdullahi is not just a lawyer who knows the law; he is a practitioner focused on efficiency, having advised on ways to streamline office operations, a skill set that translates directly into managing client matters effectively. He focuses on delivering clear, practical solutions for clients, always keeping the big picture in mind.",
    image: "/lawyer2.png"
  },
  {
    name: "I. O. Adedeji ",
    title: "Partner",
    bio: "I.O. Adedeji is a seasoned corporate and commercial law expert with a strong background in telecommunications. Adedeji has years of experience in drafting and negotiating commercial agreements, Adedeji has honed her skills in contract law, ensuring seamless transactions and protecting clients' interests. Iswat’s expertise extends to the telecommunications industry, where she has gained valuable insight into regulatory compliance, network infrastructure, and innovative technologies. Adedeji's unique blend of legal acumen and industry knowledge makes her a trusted advisor for businesses seeking to navigate complex commercial horizon.\n1. Nigerian Bar Association\n2. Nigerian Institute of Chartered Arbitrators",
    image: "/lawyer3.png"
  },
  {
    name: "K. O. Jimoh (Mrs)",
    title: "Practice Manager",
    bio: "Mrs. Jimoh handles the complex job of managing all our internal processes, using her strong background in project management and data analysis to keep the firm on track. She is very good at tracking key performance indicators and making sure our schedules are met, which is important for a busy law firm where time is always short. She works closely with the partners to make sure we follow all the necessary rules and that our internal governance is strong, a necessary part of her job. Her focus is always on efficiency; she helped streamline the firm’s internal processes, which actually cut down on project delays and improved how we handle meetings. Mrs. Jimoh is the operational backbone of the firm, and her dedication to organized work is a huge part of the service we give our clients.",
    image: "/lawyer5.png"
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

// --- Modal Component ---
const BioModal = ({ attorney, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={backdropVariants}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70"
        variants={backdropVariants}
      />

      {/* Modal Content */}
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <h2 className="text-3xl font-garamond font-bold text-gray-900 mb-2">
          {attorney.name}
        </h2>
        <p className="text-md text-primary-200 mb-6 italic">{attorney.title}</p>

        {attorney.image && (
          <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary-200">
            <Image
              src={attorney.image}
              alt={attorney.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        <p className="text-gray-700 mt-4 text-base whitespace-pre-wrap text-left">
          {attorney.bio}
        </p>
      </motion.div>
    </motion.div>
  );
};

// --- Main Component ---
const Attorneys = () => {
  // State to hold the attorney object whose bio should be shown in the modal
  const [selectedAttorney, setSelectedAttorney] = useState(null);

  const openModal = (attorney) => {
    setSelectedAttorney(attorney);
  };

  const closeModal = () => {
    setSelectedAttorney(null);
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-20 px-4">
        <Head>
          <title>Habeeb Jimoh & Associates | Attorneys</title>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attorneys.map((attorney, i) => (
              <motion.div
                key={attorney.name}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col" // Added flex-col for better layout control
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                {/* Image Section */}
                {attorney.image && (
                  <div className="relative w-full aspect-square rounded-2xl">
                    <Image
                      src={attorney.image}
                      alt={attorney.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                )}

                {/* Text Content */}
                <div
                  className={`p-6 text-center flex flex-col justify-between flex-grow ${!attorney.image ? "pt-10" : ""}`}
                >
                  <div>
                    <h3 className="text-xl font-semibold font-garamond text-gray-900">
                      {attorney.name}
                    </h3>
                    <p className="text-sm text-primary-200 mt-1 italic mb-4">
                      {attorney.title}
                    </p>
                  </div>

                  {/* Truncated Bio and Read More Button */}
                  {attorney.bio && (
                    <div className="text-left">
                      <p className="text-gray-600 text-sm whitespace-pre-wrap">
                        {truncateText(attorney.bio)}
                      </p>
                      {/* Only show 'Read More' if the bio was actually truncated */}
                      {attorney.bio.length > 150 && (
                        <button
                          onClick={() => openModal(attorney)}
                          className="mt-2 text-sm text-primary-500 hover:text-primary-700 font-medium transition-colors focus:outline-none"
                        >
                          Read More →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Overlay: Uses AnimatePresence for smooth entry/exit */}
      <AnimatePresence>
        {selectedAttorney && (
          <BioModal attorney={selectedAttorney} onClose={closeModal} />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Attorneys;
