import Image from "next/image";
import logo from "../public/logo.png";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Logo and Firm Name */}
        <div className="flex flex-col items-center md:items-start mb-4">
          <Image
            src={logo}
            alt="Amas & Rhod Law logo"
            width={100}
            height={100}
            className="object-contain"
          />
          <h4 className="mt-4 text-2xl font-bold font-garamond tracking-wider leading-tight text-center md:text-left">
            Amas & Rhod Law
          </h4>

          {/* Social Links */}
          <div className="space-y-4 mt-6">
            <h4 className="text-xl font-garamond mb-4 md:mb-2">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-6 text-2xl">
              <a
                href="https://www.linkedin.com/company/amasandrhodlaw/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-gray-500 focus:text-gray-500"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://x.com/amasandrhodlaw?s=21"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-gray-500 focus:text-gray-500"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/amasandrhodlaw?igsh=MXM4ZDJsY3liZjVmaQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-gray-500 focus:text-gray-500"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://wa.me/2348134642665?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20legal%20services"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Whatsapp"
                className="hover:text-gray-500 focus:text-gray-500"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-2xl font-garamond mb-4">Contact Details</h4>
          <address className="not-italic text-lg">
            Emerge Hub No 4 Ayanboye street,
            <br />
            faramobi Ajike street Anthony village,
            <br />
            Lagos, Nigeria.
          </address>
          <p className="mt-4 text-lg">
            Phone:{" "}
            <a href="tel:+2348134642665" className="hover:underline">
              +234 813 464 2665, <br />
            </a>
            <a href="tel:+2349137565593" className="hover:underline">
              +234 913 756 5593 <br />
            </a>
          </p>
          <p className="text-lg">
            Email:{" "}
            <a
              href="mailto:info@amasandrhodlaw.com"
              className="hover:underline"
            >
              info@amasandrhodlaw.com
            </a>
          </p>
        </div>

        {/* Office Hours */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-2xl font-garamond mb-4">Office Hours</h4>
          <div className="text-lg">
            <p>Monday to Friday: 9:00 AM – 6:00 PM</p>
            <p>
              Saturdays and Sundays: Closed(Open to retainer clients in
              emergency Only)
            </p>
          </div>
        </div>

        {/* Policies and Terms */}
        <div className="space-y-2 flex flex-col">
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/policy"
                className="text-gray-800 hover:text-gray-700"
              >
                Privacy & Policies
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-gray-800 hover:text-gray-700">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Socials */}
      <div className="max-w-7xl mx-auto mt-12 border-t border-gray-500 pt-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center">
          {/* copyright reserved */}
          <div className="mt-6 md:mt-0">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Amas & Rhod Law. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
