// "use client";

// import { useEffect } from "react";

// export default function LinkedInFeed({ companyId = "amasandrhodlaw" }) {
//   useEffect(() => {
//     // Load Tagembed script
//     const script = document.createElement("script");
//     script.src = "https://widget.tagembed.com/embed.min.js";
//     script.type = "text/javascript";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       if (document.body.contains(script)) {
//         document.body.removeChild(script);
//       }
//     };
//   }, []);

//   return (
//     <section className="bg-blue-950 py-24 px-6">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-5xl md:text-6xl font-bold font-sans tracking-[0.3em] uppercase mb-12 text-white text-center">
//           Latest Feed
//         </h2>

//         <div className="max-w-7xl mx-auto">
//           {/* Tagembed Widget Container */}
//           <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
//             {/* Method 1: Iframe (Most Reliable) */}
//             <div
//               className="tagembed-widget"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 overflow: "auto"
//               }}
//               data-widget-id="308793"
//               data-website="1"
//             />
//           </div>
//         </div>

//         {/* More Button */}
//         {/* <div className="mt-8 text-center">
//           <a
//             href={`https://www.linkedin.com/company/${companyId}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 border border-white/20"
//           >
//             <span className="text-lg">View All on LinkedIn</span>
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//             </svg>
//           </a>
//         </div> */}
//       </div>
//     </section>
//   );
// }
