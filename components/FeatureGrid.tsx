import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const FeatureGrid: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();

  const cards = [
    {
      tag: t("VR 游览", "VR TOUR"),
      image: "https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=800",
      title: t("卫城博物馆", "The Acropolis Museum"),
      description: t("位于雅典市上方岩石露头上的古老城堡的数字孪生。", "A digital twin of the ancient citadel located on a rocky outcrop above the city of Athens."),
      meta: t("12.5k 扫描 • 8K 分辨率", "12.5k Scans • 8K Resolution")
    },
    {
      tag: t("房地产", "REAL ESTATE"),
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800",
      title: t("爱琴海悬崖别墅", "Aegean Cliff Villa"),
      description: t("豪华房产观看体验。漫步于室内及海景露台。", "Luxury property viewing experience. Walk through the interior and terrace with sea view."),
      meta: t("350 平方米 • 可交互", "350 m² • Interactive")
    },
    {
      tag: t("文化遗产", "HERITAGE"),
      image: "https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=800",
      title: t("米克诺斯老城", "Mykonos Old Town"),
      description: t("穿梭在乔拉迷宫般的街道。照片级纹理映射。", "Navigate the labyrinthine streets of Chora. Photorealistic texture mapping."),
      meta: t("户外 • 4.2公里路径", "Outdoor • 4.2km Path")
    }
  ];

  useEffect(() => {
    if (sectionRef.current) {
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { y: 50, opacity: 0 },
            {
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
              },
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.1,
              ease: "power2.out"
            }
          );
        }
      });
    }
  }, [cards]); // Re-animate if cards change (e.g. language switch, though unlikely to trigger full re-mount animation usually desired, it's fine)

  return (
    <section ref={sectionRef} className="py-24 px-[5%] bg-white">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold mb-4 text-primary">{t('精选合集', 'Featured Collections')}</h2>
        <p className="text-lg text-secondary max-w-2xl mx-auto">
          {t('探索希腊最具标志性的地点，利用激光扫描技术进行毫米级精度的重建。', 'Explore the most iconic locations in Greece, reconstructed with millimeter-level precision using laser scanning technology.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div 
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <div className="h-64 overflow-hidden relative">
              <span className="absolute top-5 left-5 bg-white/95 text-primary px-3 py-1.5 rounded-md text-xs font-bold shadow-sm z-10">
                {card.tag}
              </span>
              <img 
                src={card.image} 
                alt={card.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-3 text-primary">{card.title}</h3>
              <p className="text-secondary text-sm leading-relaxed mb-6">{card.description}</p>
              <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                {card.meta}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;