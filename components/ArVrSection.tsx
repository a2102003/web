import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ArVrSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ar-vr-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: t('虚拟现实 (VR)', 'Virtual Reality (VR)'),
      subtitle: t('打破时空界限', 'Break Boundaries'),
      description: t(
        'VR技术创造完全沉浸式的数字环境，让用户无需移动即可体验远方的风景。对于房地产和旅游业，这意味着客户可以在决定购买或出行前，以第一人称视角深度体验空间，大幅降低决策成本。',
        'VR technology creates fully immersive digital environments, allowing users to experience distant landscapes without moving. For real estate and tourism, this means clients can experience spaces in first-person before deciding to buy or travel, significantly reducing decision costs.'
      ),
      image: " https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=1000",
      points: [
        t('身临其境的漫游体验', 'Immersive walkthrough experience'),
        t('1:1 真实空间还原', '1:1 True-to-scale restoration'),
        t('远程即时访问', 'Instant remote access')
      ]
    },
    {
      title: t('增强现实 (AR)', 'Augmented Reality (AR)'),
      subtitle: t('丰富现实世界', 'Enrich Reality'),
      description: t(
        'AR将数字层叠加在物理世界上。在古迹遗址，AR可以复原千年前的辉煌景象；在博物馆，它可以让静止的文物"开口说话"。这不仅是信息的传递，更是对现实体验的深度增强。',
        'AR overlays a digital layer onto the physical world. At heritage sites, AR can restore the glory of thousands of years ago; in museums, it makes static artifacts "speak". This is not just information delivery, but a deep enhancement of the real-world experience.'
      ),
      image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=1000",
      points: [
        t('历史场景即时复原', 'Instant historical restoration'),
        t('交互式信息导览', 'Interactive information guide'),
        t('虚实融合的视觉奇观', 'Mixed reality visual spectacle')
      ]
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-[5%] bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent font-bold tracking-widest text-sm mb-2 block">{t('技术核心', 'CORE TECHNOLOGY')}</span>
          <h2 className="text-4xl font-bold text-primary mb-4">{t('为何选择 AR & VR ?', 'Why Choose AR & VR?')}</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            {t('通过前沿的空间计算技术，我们重新定义了人与空间的互动方式。', 'Redefining how humans interact with space through cutting-edge spatial computing technology.')}
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div key={index} className={`ar-vr-card flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-accent/10 translate-x-4 translate-y-4 rounded-3xl transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full inline-block mb-2 border border-white/30">
                      {feature.subtitle}
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2">
                <h3 className="text-3xl font-bold mb-6 text-primary">{feature.title}</h3>
                <p className="text-secondary leading-relaxed mb-8 text-lg">
                  {feature.description}
                </p>
                <div className="space-y-4">
                  {feature.points.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                         <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                         </svg>
                      </div>
                      <span className="text-primary font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArVrSection;