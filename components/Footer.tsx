import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#111] text-white py-20 px-[5%]">
      <div className="flex flex-wrap justify-between gap-10 mb-16">
        <div className="flex-[2] min-w-[300px]">
          <div className="text-2xl font-extrabold mb-5 tracking-tight">REALSEE GREECE</div>
          <p className="text-gray-400 max-w-xs leading-relaxed">
            {t('数字化世界，一次一个空间。将希腊之美带入元宇宙。', 'Digitizing the world, one space at a time. Bringing the beauty of Greece to the metaverse.')}
          </p>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h4 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-6">{t('产品', 'Product')}</h4>
          <div className="flex flex-col gap-3 text-gray-300">
            <a href="#" className="hover:text-white transition-colors">VR Scanner</a>
            <a href="#" className="hover:text-white transition-colors">Galois Camera</a>
            <a href="#" className="hover:text-white transition-colors">{t('软件', 'Software')}</a>
          </div>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h4 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-6">{t('公司', 'Company')}</h4>
          <div className="flex flex-col gap-3 text-gray-300">
            <a href="#" className="hover:text-white transition-colors">{t('关于我们', 'About Us')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('职业发展', 'Careers')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('联系我们', 'Contact')}</a>
          </div>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h4 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-6">{t('社交', 'Social')}</h4>
          <div className="flex flex-col gap-3 text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-sm text-gray-500 flex justify-between items-center">
        <span>© 2025 by CRF</span>
        <span className="hidden md:block">{t('为未来设计', 'Designed for Future')}</span>
      </div>
    </footer>
  );
};

export default Footer;