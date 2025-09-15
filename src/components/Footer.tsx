'use client';

import { motion, Variants } from 'framer-motion';
import {
  HiHome,
  HiUserGroup,
  HiDocument,
  HiPhone,
  HiClipboardList,
  HiCurrencyDollar,
  HiTruck,
} from 'react-icons/hi';
import { BiCar } from 'react-icons/bi';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaTiktok,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Mail } from 'lucide-react';

interface ContactItem {
  text: string;
  icon: IconType | null;
}

interface LinkItem {
  name: string;
  href: string;
  icon: IconType;
}

interface FooterSection {
  title: string;
  content?: string | ContactItem[];
  links?: LinkItem[];
}

const Footer = () => {
  const footerSections: FooterSection[] = [
    {
      title: "About Us",
      content: "KARVENTURE INVESTMENT LIMITED is a dynamic and rapidly expanding microcredit institution based in Nairobi Kenya. We specialize in providing secured loan solutions tailored to meet the diverse financial needs of individuals and small businesses across the country.",
    },
    {
      title: "Contact Info",
      content: [
        { text: "Mfangano Street Information House Second Floor Suite A4 Nairobi.", icon: null },
        { text: "+254 700 393363", icon: HiPhone },
         { text: "", icon: Mail },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/", icon: HiHome },
        { name: "Loan Products", href: "/loans", icon: HiClipboardList },
        { name: "About Us", href: "/about", icon: HiUserGroup },
        { name: "News", href: "/news", icon: HiDocument },
        { name: "Contact Us", href: "/contact", icon: HiPhone },
      ],
    },
    {
      title: "Loan Products",
      links: [
        { name: "Car Financing", href: "/loans/car-financing", icon: BiCar },
        { name: "Log Book Loans", href: "/loans/log-book-loans", icon: HiClipboardList },
        { name: "Buy Off Loans", href: "/loans/buy-off-loans", icon: HiCurrencyDollar },
        { name: "Import Duty Clearance", href: "/loans/import-duty-clearance", icon: HiTruck },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, href: "#" },
    { name: "Instagram", icon: FaInstagram, href: "#" },
    { name: "X", icon: FaTwitter, href: "#" },
    { name: "Linked In", icon: FaLinkedinIn, href: "#" },
    { name: "Tiktok", icon: FaTiktok, href: "#" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-light tracking-wider border-b border-orange-500 pb-2 mb-4">
              {footerSections[0].title}
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              {typeof footerSections[0].content === 'string' ? footerSections[0].content : ''}
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-light tracking-wider border-b border-orange-500 pb-2 mb-4">
              {footerSections[1].title}
            </h3>
            <div className="space-y-3">
              {Array.isArray(footerSections[1].content) && footerSections[1].content.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {item.icon && (
                    <item.icon className="w-4 h-4 text-[yellow] mt-1 flex-shrink-0" />
                  )}
                  <p className="text-gray-300 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-light tracking-wider border-b border-orange-500 pb-2 mb-4">
              {footerSections[2].title}
            </h3>
            <ul className="space-y-2">
              {footerSections[2].links?.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors duration-300 text-sm"
                  >
                    <link.icon className="w-4 h-4 text-[yellow]" />
                    <span>{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Loan Products */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-light tracking-wider border-b border-orange-500 pb-2 mb-4">
              {footerSections[3].title}
            </h3>
            <ul className="space-y-2">
              {footerSections[3].links?.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors duration-300 text-sm"
                  >
                    <link.icon className="w-4 h-4 text-[yellow]" />
                    <span>{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex flex-col items-center border-t border-gray-700 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-light tracking-wider mb-6">Connect With Us</h3>
          <div className="flex space-x-4 mb-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="w-10 h-10 rounded-full bg-[yellow] flex items-center justify-center text-[red] hover:bg-red-600 transition-colors duration-300"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            className="text-center text-gray-300 text-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <p>© {new Date().getFullYear()} KARVENTURE INVESTMENT LIMITED. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;