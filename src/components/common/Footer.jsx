// components/common/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = ['Facebook', 'Twitter', 'Instagram'];

  return (
    <footer className="bg-coral-500 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-6">

          <div className="w-full md:w-1/3 lg:w-1/4 mb-6">
            <h3 className="text-xl font-bold mb-2">SkillQuest 🧠</h3>
            <p>Build cool sh*t.</p>
          </div>

     
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map(platform => (
                <Link
                  key={platform}
                  to={`/${platform.toLowerCase()}`}
                  className="hover:text-coral-300 transition-colors"
                >
                  {platform}
                </Link>
              ))}
            </div>
          </div>

      
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p>
              If you have any questions, feel free to{' '}
              <a
                href="mailto:info@skillquest.com"
                className="text-coral-300 hover:underline"
              >
                email us
              </a>.
            </p>
          </div>
        </div>

  
        <div className="text-center mt-8 border-t border-white pt-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} SkillQuest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;