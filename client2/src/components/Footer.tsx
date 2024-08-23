// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-10 bg-gray-100 text-gray-600 text-sm">
      <div className="container mx-auto flex justify-between items-center px-4">
        <p className="text-left">&copy; 2023 SEYANG PARK. All rights reserved.</p>
        <p className="text-right hover:text-gray-800 transition-colors cursor-pointer">Privacy Policy</p>
        <p className="text-right hover:text-gray-800 transition-colors cursor-pointer">
          Useful Links</p>
          <p className="text-right hover:text-gray-800 transition-colors cursor-pointer">
          Contact</p>
      </div>
    </footer>
  );
};

export default Footer;
