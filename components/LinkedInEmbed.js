// "use client";
// import { useEffect } from "react";

// export default function LinkedInEmbed({ companyUrl = "aluko-oyebode" }) {
//   useEffect(() => {
//     // Load LinkedIn badge script
//     const script = document.createElement("script");
//     script.src = "https://platform.linkedin.com/badges/js/profile.js";
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);

//     return () => {
//       if (document.body.contains(script)) {
//         document.body.removeChild(script);
//       }
//     };
//   }, []);

//   return (
//     <section className="bg-gradient-to-br from-red-900 via-red-800 to-red-900 py-24 px-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <h2 className="text-5xl md:text-6xl font-bold text-white font-sans tracking-[0.3em] uppercase mb-12">
//           LATEST FEED
//         </h2>

//         <div className="max-w-4xl mx-auto space-y-8">
//           {/* LinkedIn Company Badge */}
//           <div className="bg-white rounded-lg p-6 shadow-2xl">
//             <div
//               className="badge-base LI-profile-badge"
//               data-locale="en_US"
//               data-size="large"
//               data-theme="light"
//               data-type="HORIZONTAL"
//               data-vanity={companyUrl}
//               data-version="v1"
//             >
//               <a
//                 className="badge-base__link LI-simple-link"
//                 href={`https://www.linkedin.com/company/${companyUrl}?trk=profile-badge`}
//               >
//                 {companyUrl}
//               </a>
//             </div>
//           </div>

//           {/* Instructions Card */}
//           <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-white/10">
//             <h3 className="text-2xl font-bold text-white mb-4">
//               📱 Follow Our Updates on LinkedIn
//             </h3>
//             <p className="text-gray-300 mb-6 leading-relaxed">
//               Stay connected with Aluko & Oyebode for the latest legal insights,
//               industry updates, and firm announcements. Click below to view our
//               complete LinkedIn feed and join our professional community.
//             </p>

//             {/* Stats/Benefits */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               <div className="bg-white/5 rounded-lg p-4 text-center">
//                 <div className="text-3xl mb-2">📰</div>
//                 <div className="text-white font-semibold">Legal Insights</div>
//                 <div className="text-gray-400 text-sm">Weekly updates</div>
//               </div>
//               <div className="bg-white/5 rounded-lg p-4 text-center">
//                 <div className="text-3xl mb-2">🏆</div>
//                 <div className="text-white font-semibold">Firm News</div>
//                 <div className="text-gray-400 text-sm">Latest achievements</div>
//               </div>
//               <div className="bg-white/5 rounded-lg p-4 text-center">
//                 <div className="text-3xl mb-2">🤝</div>
//                 <div className="text-white font-semibold">Networking</div>
//                 <div className="text-gray-400 text-sm">Join our community</div>
//               </div>
//             </div>

//             {/* Call to Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <a
//                 href={`https://www.linkedin.com/company/${companyUrl}/posts/`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex-1 inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                 </svg>
//                 <span>View All Posts</span>
//               </a>

//               <a
//                 href={`https://www.linkedin.com/company/${companyUrl}/`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex-1 inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 border border-white/20"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 4v16m8-8H4"
//                   />
//                 </svg>
//                 <span>Follow Us</span>
//               </a>
//             </div>
//           </div>

//           {/* Recent Highlights (Optional - You can add manual highlights) */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
//               <div className="flex items-start space-x-4">
//                 <div className="text-4xl">💼</div>
//                 <div>
//                   <h4 className="font-bold text-lg mb-2">
//                     Latest Legal Insights
//                   </h4>
//                   <p className="text-gray-600 text-sm mb-3">
//                     Discover our latest analysis on Nigerian corporate law,
//                     regulatory updates, and industry trends.
//                   </p>
//                   <a
//                     href={`https://www.linkedin.com/company/${companyUrl}/posts/`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:text-blue-700 font-semibold text-sm inline-flex items-center gap-2"
//                   >
//                     Read on LinkedIn
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
//               <div className="flex items-start space-x-4">
//                 <div className="text-4xl">🎓</div>
//                 <div>
//                   <h4 className="font-bold text-lg mb-2">Firm Announcements</h4>
//                   <p className="text-gray-600 text-sm mb-3">
//                     Stay updated on our team growth, awards, and contributions
//                     to the legal community.
//                   </p>
//                   <a
//                     href={`https://www.linkedin.com/company/${companyUrl}/posts/`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:text-blue-700 font-semibold text-sm inline-flex items-center gap-2"
//                   >
//                     View Updates
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
