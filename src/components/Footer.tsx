'use client';

import { motion, Variants } from 'framer-motion';
import {
  HiHome,
  HiUserGroup,
  HiPhone,
  HiClipboardList,
  HiTruck,
} from 'react-icons/hi';
import { BiCar } from 'react-icons/bi';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Mail } from 'lucide-react';

interface ContactItem {
  text: string;
  icon: IconType | typeof Mail;
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
      title: "About",
      content: "Gathex Autospares is your trusted source for high-quality, original auto parts for small vehicles. Located along Kirinyaga Road, Nairobi, we provide countrywide delivery and expert support to keep your car running smoothly.",
    },
    {
      title: "Contact",
      content: [
        { text: "+254 748 094055", icon: HiPhone },
        { text: "+254 748 094055", icon: FaWhatsapp },
        { text: "Gathecha75@gmail.com", icon: Mail },
        { text: "Grogantv001@gmail.com", icon: Mail },
      ],
    },
    {
      title: "Links",
      links: [
        { name: "Home", href: "/", icon: HiHome },
        { name: "Products", href: "/products", icon: HiClipboardList },
        { name: "About Us", href: "/about", icon: HiUserGroup },
        { name: "Contact Us", href: "/contact", icon: HiPhone },
      ],
    },
    {
      title: "Categories",
      links: [
        { name: "Engine Parts", href: "/products/engine-parts", icon: BiCar },
        { name: "Brake & Steering", href: "/products/brake-steering", icon: HiClipboardList },
        { name: "Suspension & Body", href: "/products/suspension-body", icon: HiTruck },
        { name: "Electrical & Lights", href: "/products/electrical-light", icon: HiClipboardList },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, href: "#" },
    { name: "Instagram", icon: FaInstagram, href: "#" },
    { name: "X", icon: FaTwitter, href: "#" },
    { name: "LinkedIn", icon: FaLinkedinIn, href: "#" },
    { name: "TikTok", icon: FaTiktok, href: "#" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        ease: "easeOut",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const socialVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="bg-black text-white pt-16 pb-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "50px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="h-1.5 bg-red-600"
              />
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light tracking-wider">
                {footerSections[0].title}
              </h3>
            </div>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
              {typeof footerSections[0].content === 'string' ? footerSections[0].content : ''}
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "50px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="h-1.5 bg-red-600"
              />
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light tracking-wider">
                {footerSections[1].title}
              </h3>
            </div>
            <div className="space-y-4">
              {Array.isArray(footerSections[1].content) && footerSections[1].content.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3"
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  {item.icon && (
                    <motion.div
                      className="w-8 h-8 bg-red-600 flex items-center justify-center rounded-full"
                      whileHover={{ scale: 1.1, boxShadow: "0 0 8px rgba(220, 38, 38, 0.5)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                  <p className="text-gray-200 text-sm md:text-base">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "50px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="h-1.5 bg-red-600"
              />
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light tracking-wider">
                {footerSections[2].title}
              </h3>
            </div>
            <ul className="space-y-3">
              {footerSections[2].links?.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5, color: "#dc2626" }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-200 hover:text-red-600 transition-colors duration-300 text-sm md:text-base"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, boxShadow: "0 0 8px rgba(220, 38, 38, 0.5)" }}
                      transition={{ duration: 0.2 }}
                      className="w-8 h-8 bg-red-600 flex items-center justify-center rounded-full"
                    >
                      <link.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <span>{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Product Categories */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "50px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="h-1.5 bg-red-600"
              />
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light tracking-wider">
                {footerSections[3].title}
              </h3>
            </div>
            <ul className="space-y-3">
              {footerSections[3].links?.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5, color: "#dc2626" }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-200 hover:text-red-600 transition-colors duration-300 text-sm md:text-base"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, boxShadow: "0 0 8px rgba(220, 38, 38, 0.5)" }}
                      transition={{ duration: 0.2 }}
                      className="w-8 h-8 bg-red-600 flex items-center justify-center rounded-full"
                    >
                      <link.icon className="w-5 h-5 text-white" />
                    </motion.div>
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
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-1.5 bg-red-600 mb-6"
          />
          <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-light tracking-wider text-white mb-6">
            Connect With Us
          </h3>
          <div className="flex space-x-4 mb-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-500 transition-colors duration-300"
                variants={socialVariants}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 12px rgba(220, 38, 38, 0.6)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5 md:w-6 md:h-6" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            className="text-center text-gray-200 text-xs md:text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p>© {new Date().getFullYear()} Gathex Autospares. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;