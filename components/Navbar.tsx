import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t('空间展示', 'Space Showcase'), link: '#' },
    { label: t('解决方案', 'Solutions'), link: '#' },
    { label: t('关于我们', 'About Us'), link: '#' }
  ];

  return (
    <nav className={`fixed top-0 w-full h-20 flex justify-between items-center px-[5%] z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${scrolled ? 'text-black' : 'text-white'}`}>
        REALSEE GREECE
      </div>
      
      <div className="hidden md:flex gap-10 items-center">
        {menuItems.map((item) => (
          <a 
            key={item.label} 
            href={item.link} 
            className={`font-medium text-sm transition-colors duration-300 hover:text-opacity-80 ${
              scrolled ? 'text-gray-800' : 'text-white/90 hover:text-white'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          className={`font-semibold text-xs tracking-wider transition-colors duration-300 ${
            scrolled ? 'text-gray-600 hover:text-black' : 'text-white/80 hover:text-white'
          }`}
        >
          {language === 'zh' ? 'EN' : '中文'}
        </button>

        <button className={`px-6 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
          scrolled
            ? 'border-gray-300 text-gray-800 hover:bg-black hover:text-white hover:border-black'
            : 'border-white/80 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-black'
        }`}>
          {t('联系咨询', 'Contact')}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;