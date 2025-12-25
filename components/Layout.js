// // components/Layout.js
// import Header from './Header';
// import Footer from './Footer';
// import ScrollToTopButton from './ScrollToTopButton';

// const Layout = ({ children }) => {
//   return (
//     <div>
//       <Header />
//       <main>{children}</main>
//       <ScrollToTopButton />
//       <Footer />
//     </div>
//   );
// };

// export default Layout;

// components/Layout.js
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

const Layout = ({ children }) => {
  return (
    <div className="overflow-x-hidden w-full max-w-full">
      <Header />
      <main className="overflow-x-hidden w-full max-w-full">{children}</main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Layout;
