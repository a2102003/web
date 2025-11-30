import React, { useState } from 'react';
import { HardwareItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const HardwareSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const { t } = useLanguage();

  const hardwareList: HardwareItem[] = [
    { 
      category: "AR", 
      name: "RayNeo Air 4", 
      description: t("消费级AR眼镜", "Consumer AR Glasses"),
      image: "https://res.vrtuoluo.cn/production/admin/uploads/20251023/1761222753801%E5%9B%BE%E7%89%871.png?q=80&w=600" 
    },
    { 
      category: "AR", 
      name: "RayNeo X3 Pro", 
      description: t("企业级解决方案", "Enterprise Solution"),
      image: "https://gw.alicdn.com/imgextra/i2/2212958018674/O1CN014k79ow2DwkXX06dll_!!2212958018674.png_.webp?auto=format&fit=crop&q=80&w=600"
    },
    { 
      category: "AR", 
      name: "XREAL Air 2 Ultra", 
      description: t("空间计算", "Spatial Computing"),
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600"
    },
    { 
      category: "VR", 
      name: "PICO 4 Ultra", 
      description: t("一体机头显", "All-in-One Headset"), 
      highlight: true,
      image: "https://ik.imagekit.io/0ovbtmin9/The-PICO-4-Ultra-How-it-Compares-to-the-PICO-4-XR-Today-News.jpg?q=80&w=600"
    },
    { 
      category: "VR", 
      name: "Apple Vision Pro", 
      description: t("空间计算机", "Spatial Computer"), 
      highlight: true,
      image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&q=80&w=600"
    },
    { 
      category: "VR", 
      name: "Vivo Vision", 
      description: t("概念设备", "Concept Device"), 
      highlight: true,
      image: "https://ik.imagekit.io/0ovbtmin9/vivo-vison_jpg_85.webp?q=80&w=600"
    },
    { 
      category: "VR", 
      name: "Meta Quest 3", 
      description: t("混合现实", "Mixed Reality"), 
      highlight: true,
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=600"
    },
    { 
      category: "VR", 
      name: "HTC Vive XR", 
      description: t("极致性能", "Elite Performance"), 
      highlight: true,
      image: "https://static0.xdaimages.com/wordpress/wp-content/uploads/2023/01/xda-2400-x-1600-2-1.png?q=50&fit=crop&w=825&dpr=1.5auto=format&fit=crop&q=80&w=600"
    },
  ];

  const tabs = [
    { id: 'All', label: t('所有设备', 'All Devices') },
    { id: 'VR', label: t('VR头显', 'VR Headsets') },
    { id: 'AR', label: t('AR眼镜', 'AR Glasses') },
  ];

  const filteredList = activeTab === 'All'
    ? hardwareList
    : hardwareList.filter(item => item.category === activeTab);

  return (
    <section className="bg-white py-24 px-[2%] relative overflow-hidden">
      
      {/* Container widened to max-w-[95%] for a broader look */}
      <div className="max-w-[95%] mx-auto relative z-10">
        
        {/* Light Gray Theme Container with Background Image */}
        <div className="relative bg-gray-100 rounded-[32px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col border border-gray-200 min-h-[900px] transition-all duration-300">
          
          {/* Aegean Sea Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600" 
               alt="Aegean Sea" 
               className="w-full h-full object-cover opacity-50"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white/80"></div>
          </div>
          
          {/* Subtle Light Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-gray-200/50 pointer-events-none z-0 opacity-50" />

          <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
            
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row justify-between items-end mb-10 pb-6 border-b border-gray-200/50">
              <div className="w-full lg:w-auto">
                <div className="flex items-center gap-3 mb-2">
                   <div className="h-[2px] w-8 bg-blue-600"></div>
                   <span className="text-blue-600 font-mono text-xs uppercase tracking-widest">{t('生态系统', 'Ecosystem')}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                  {t('支持的硬件', 'Supported Hardware')}
                </h2>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6 mt-8 lg:mt-0">
                {/* Modern Light Tab Switcher */}
                <div className="flex bg-white/80 backdrop-blur-sm shadow-sm p-1 rounded-full border border-gray-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-black text-white shadow-md'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Spinning Windmill (Colorful) */}
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    className="w-8 h-8 animate-[spin_4s_linear_infinite] hover:scale-110 transition-transform"
                  >
                    <path d="M12 12 L12 2 A 5 5 0 0 1 17 7 Z" fill="#EA4335" />
                    <path d="M12 12 L22 12 A 5 5 0 0 1 17 17 Z" fill="#4285F4" />
                    <path d="M12 12 L12 22 A 5 5 0 0 1 7 17 Z" fill="#34A853" />
                    <path d="M12 12 L2 12 A 5 5 0 0 1 7 7 Z" fill="#FBBC05" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content Grid - Widened cards using aspect-video */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {filteredList.map((item, index) => {
                return (
                  <div
                    key={`${item.name}-${index}`}
                    className="group relative aspect-video rounded-2xl overflow-hidden bg-white cursor-pointer transition-all duration-300
                      shadow-sm hover:shadow-2xl hover:-translate-y-2"
                  >
                    {/* Image */}
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay - Lighter/Smoother for visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-bold text-white leading-tight pr-2 drop-shadow-sm">{item.name}</h3>
                        <span className={`inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border shadow-sm ${item.category === 'AR' ? 'text-purple-100 border-purple-400 bg-purple-500/30 backdrop-blur-md' : 'text-blue-100 border-blue-400 bg-blue-500/30 backdrop-blur-md'}`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-200 text-xs line-clamp-1 opacity-90 group-hover:opacity-100 transition-opacity font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Decoration - Centered & Light Theme */}
            <div className="mt-auto pt-6 flex flex-col items-center justify-center text-gray-500 text-xs font-mono">
               <div className="flex items-center gap-4 mb-2">
                 <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gray-400"></div>
                 <div className="flex gap-1.5">
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"></span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-75"></span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                 </div>
                 <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gray-400"></div>
               </div>
               <div className="tracking-[0.2em] text-gray-600 font-semibold shadow-white drop-shadow-sm">DEVICE_ID: GREECE_V2.0</div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HardwareSection;