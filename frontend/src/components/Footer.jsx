import React, { useEffect, useRef } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About Us", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms & Conditions", href: "#" },
    ],
    account: [
      { name: "My Account", href: "#" },
      { name: "Order History", href: "#" },
      { name: "Wishlist", href: "#" },
      { name: "Newsletter", href: "#" },
    ],
    categories: [
      { name: "Electronics", href: "#" },
      { name: "Fashion", href: "#" },
      { name: "Home & Living", href: "#" },
      { name: "Sports", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#" },
    { icon: <Twitter className="w-5 h-5" />, href: "#" },
    { icon: <Instagram className="w-5 h-5" />, href: "#" },
    { icon: <Youtube className="w-5 h-5" />, href: "#" },
  ];
  const footerRef = useRef(null);

  useEffect(() => {
    const updateFooterHeight = () => {
      if (footerRef.current) {
        const height = footerRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--footer-height",
          `${height}px`
        );
      }
    };

    // Resize Observer to detect height changes
    const resizeObserver = new ResizeObserver(updateFooterHeight);
    if (footerRef.current) resizeObserver.observe(footerRef.current);

    updateFooterHeight(); // Initial height set

    return () => resizeObserver.disconnect(); // Cleanup observer
  }, []);
  return (
    <footer ref={footerRef}>
      <div>
        <div className="container mx-auto border-2 border-dashed border-level-4 border-t-0 border-b-0">
          <div className=" p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-level-5">DIGIMART</h2>
                <p className="text-level-5/70 text-sm">
                  Your trusted destination for quality products and exceptional
                  service.
                </p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-8 h-8 rounded-full border-2 border-dashed border-level-4 flex items-center justify-center text-level-5 hover:border-level-5 transition-colors"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold text-level-5 mb-4">
                  Company
                </h3>
                <ul className="space-y-2">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-level-5/70 hover:text-level-5 transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Account */}
              <div>
                <h3 className="text-lg font-semibold text-level-5 mb-4">
                  My Account
                </h3>
                <ul className="space-y-2">
                  {footerLinks.account.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-level-5/70 hover:text-level-5 transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-lg font-semibold text-level-5 mb-4">
                  Newsletter
                </h3>
                <p className="text-level-5/70 text-sm mb-4">
                  Subscribe to our newsletter for updates and exclusive offers!
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 bg-transparent border-2 border-dashed border-level-4 rounded-lg px-3 py-2 text-level-5 focus:border-level-5 outline-none transition-colors"
                  />
                  <button className="bg-level-5 text-white p-2 rounded-lg hover:bg-level-5/90 transition-colors">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                {/* Contact Info */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-level-5/70">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">support@example.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-level-5/70">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">+1 234 567 890</span>
                  </div>
                  <div className="flex items-center gap-2 text-level-5/70">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">123 Street, City, Country</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="p-4 border-t-2 border-dashed border-level-4 text-center">
            <p className="text-level-5/70 text-sm">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
