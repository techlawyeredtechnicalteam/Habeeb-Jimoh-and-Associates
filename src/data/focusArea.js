import { X } from "lucide-react";
import { motion } from "framer-motion";

export const focusAreas = [
  {
    title: "Corporate law Banking & Insurance",
    image: "/corporate-restructuring.png",
    description:
      "HJ & A is dedicated to delivering tailored legal solutions that meet the unique needs of our clients. Whether navigating complex financing transactions or ensuring regulatory compliance, our team is equipped to provide the highest level of legal support to banks and other financial institutions, and insurance companies operating in Nigeria and beyond."
  },
  {
    title: "Fintech Practice",
    image: "/area4.png",
    description:
      "At Habeeb Jimoh & Associates, we are committed to driving innovation and success in the fintech industry through exceptional legal services. Our client-centric approach ensures that we understand your business goals and tailor our services to meet your specific needs. With extensive experience and deep industry knowledge, we are well-equipped to help you navigate the complexities of the fintech landscape and achieve your strategic objectives."
  },
  {
    title: "RegTech and InsurTech",
    image: "/area2.png",
    description:
      "At HJ & A, our RegTech and InsurTech practice is driven by a commitment to innovation and a deep understanding of the legal challenges these industries face. We work closely with our clients to develop legal strategies that ensure compliance while supporting their growth and innovation goals. Whether you are developing new technologies, forming partnerships, or seeking to ensure regulatory compliance, HJA is your trusted partner in these dynamic and evolving sectors."
  },
  {
    title: "Intellectual Property & Data Privacy Law ",
    image: "/area3.png",
    description:
      "The integration of our extensive background in intellectual property with our proficiency in corporate and commercial law equips us with a unique skill set. This enables us to adeptly guide clients through the complex intellectual property challenges that emerge in commercial transactions."
  },
  {
    title: "Dispute Resolution",
    image: "/area9.png",
    description:
      "Our dispute resolution group is highly skilled in handling a broad spectrum of commercial disputes, including commercial debt recovery, employment and trade disputes, finance and securities disputes. Our expertise lies in solving problems and managing risks. Our experienced litigators effectively and efficiently bring cases, including the most complex, multifaceted issues, to resolution through Nigerian courts, arbitration or alternative dispute resolution."
  },
  {
    title: "Matrimonial Causes",
    image: "/area7.png",
    description:
      "At HJ & A, we specialize in guiding individuals through the complex and often emotional landscape of matrimonial law and processes. Our team of experienced lawyers are dedicated to providing expert counsel and representation in all aspects of matrimonial matters."
  },
  {
    title: "Real Estate",
    image: "/real estate.png",
    description:
      "Our real estate and construction team supports clients at every stage of real estate development, from planning and due diligence on land acquisition, to assisting with title perfection, advising on corporate structures and joint development agreements, and ultimately leasing office spaces or residential units to tenants upon completion of construction."
  },
  {
    title: "Immigration",
    image: "/area12.png",
    description:
      "At Habeeb Jimoh & Associates (HJA), our Immigration Practice is dedicated to offering comprehensive legal services for individuals and businesses navigating the complexities of immigration law in Nigeria. We provide expert guidance on all aspects of immigration, including visa applications, work permits, expatriate quotas, and residency status."
  },
  {
    title: "Labour & Employment",
    image: "/area13.png",
    description:
      "We ensure that both employers and employees understand and adhere to evolving legal standards, offering support through negotiation, mediation, and litigation. Whether you're managing a workforce or protecting your rights, HJA is your trusted partner for all labor and employment matters."
  },
  {
    title: "Transport & Logistics",
    image: "/area6.png",
    description:
      "We offer specialized legal services for Nigeria’s transport and logistics companies. In recent years, we have continue to provide expert guidance on regulatory compliance, contract negotiations, and dispute resolution, ensuring that businesses in these industries operate smoothly and efficiently. For transport businesses, we address issues related to contracts, fleet management, and regulatory compliance. In logistics, we assist with supply chain management, warehousing, and customs regulations."
  },
  {
    title: "Environmental Law & Climate Change ",
    image: "/area11.png",
    description:
      "When a company faces a lawsuit over pollution or environmental damage, our team defends them in the courts, which is a necessary part of this practice. We also do the critical background checks for large property deals, looking for hidden environmental problems that could later become a serious financial liability for the buyer, and we are very good at that part of the job. We believe that a business should be able to grow without harming the environment, and our job is to help them find that balance."
  },
  {
    title: "PRO BONO SERVICES ",
    image: "/area10.png",
    description:
      "At Habeeb Jimoh & Associates, we believe that the pursuit of justice is a fundamental human right, not a privilege reserved for those who can afford it. Our Pro Bono Services are the cornerstone of our firm's ethos, reflecting our deep-seated commitment to social responsibility and the rule of law in Nigeria. We dedicate significant resources and expertise to champion the causes of the indigent and the marginalized, focusing on areas where the absence of legal representation can lead to the most profound injustices."
  }
];

// --- NEW MODAL COMPONENT ---
export const FocusAreaModal = ({ area, onClose }) => {
  if (!area) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
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
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-garamond font-bold text-blue-950 mb-4 pr-10">
          {area.title}
        </h2>

        <p className="text-gray-700 text-base whitespace-pre-wrap text-left">
          {area.description}
        </p>
      </motion.div>
    </motion.div>
  );
};
