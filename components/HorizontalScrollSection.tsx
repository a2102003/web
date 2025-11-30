import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface GalleryItem {
  id: number;
  type: 'model' | 'video';
  title: string;
  desc: string;
  src?: string;      // For models
  color?: string;    // For models
  thumbnail?: string;// For videos
  videoUrl?: string; // For videos
  meta?: string;     // Polygons or Duration
}

const HorizontalScrollSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const { t } = useLanguage();
  const modelContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // Cast custom element to any to avoid TS errors
  const ModelViewer = 'model-viewer' as any;

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const models: GalleryItem[] = [
    {
      id: 1,
      type: 'model',
      src: "https://modelviewer.dev/shared-assets/models/Astronaut.glb", 
      title: t("数字探险家", "Digital Explorer"),
      desc: t("回收文物 01", "Recovered Artifact 01"),
      color: "from-blue-500/10 to-purple-500/10",
      meta: t('240万面', '2.4M Polys')
    },
    {
      id: 2,
      type: 'model',
      src: "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb",
      title: t("古老机器人", "Ancient Automaton"),
      desc: t("回收文物 02", "Recovered Artifact 02"),
      color: "from-orange-500/10 to-red-500/10",
      meta: t('180万面', '1.8M Polys')
    },
    {
      id: 3,
      type: 'model',
      src: "https://modelviewer.dev/shared-assets/models/shishkebab.glb",
      title: t("仪式供品", "Ceremonial Offerings"),
      desc: t("回收文物 03", "Recovered Artifact 03"),
      color: "from-green-500/10 to-teal-500/10",
      meta: t('50万面', '500k Polys')
    },
    {
      id: 4,
      type: 'model',
      src: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb",
      title: t("天鹅绒休闲椅", "Velvet Lounge Chair"),
      desc: t("现代家居艺术", "Modern Home Art"),
      color: "from-orange-500/10 to-stone-500/10",
      meta: t('2万面', '20k Polys')
    },
    {
      id: 5,
      type: 'model',
      src: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
      title: t("斯巴达遗物", "Spartan Relic"),
      desc: t("回收文物 05", "Recovered Artifact 05"),
      color: "from-yellow-500/10 to-orange-500/10",
      meta: t('120万面', '1.2M Polys')
    }
  ];

  const videos: GalleryItem[] = [
    {
      id: 101,
      type: 'video',
      title: t("希腊风情别墅", "Greek-style Villa"),
      desc: t("4K 航拍", "4K Drone Footage"),
      thumbnail: "https://ik.imagekit.io/0ovbtmin9/Snipaste_2025-11-30_23-20-03.png?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://ik.imagekit.io/0ovbtmin9/video-2ddf19bc-a757-4abe-9c69-6e1159f9fbab.mp4",
      meta: "00:06"
    },
    {
      id: 102,
      type: 'video',
      title: t("现代别墅", "Modern Villa"),
      desc: t("历史漫步", "Historical Walk"),
      thumbnail: "https://ik.imagekit.io/0ovbtmin9/Snipaste_2025-11-30_23-21-122.png?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://ik.imagekit.io/0ovbtmin9/video-f0a90e71-7ec7-49d6-a3ef-fccb68b3663f.mp4?updatedAt=1764515808548",
      meta: "00:06"
    },
    {
      id: 103,
      type: 'video',
      title: t("城市风光", "Urban Scenery"),
      desc: t("日落时光", "Sunset Moments"),
      thumbnail: "https://ik.imagekit.io/0ovbtmin9/Snipaste_2025-11-30_23-28-07.png?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://ik.imagekit.io/0ovbtmin9/vid377e0b75-188e-4185-b617-dd528910831a.mp4",
      meta: "00:06"
    },
    {
      id: 104,
      type: 'video',
      title: t("园林独栋", "Garden Detached Villa"),
      desc: t("自然风光", "Nature Scenery"),
      thumbnail: "https://ik.imagekit.io/0ovbtmin9/Snipaste_2025-11-30_23-30-24.png?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://ik.imagekit.io/0ovbtmin9/video-e5c602b7-fdd9-4651-94b3-39c368c79d23.mp4",
      meta: "00:06"
    }
  ];

  // Helper to prevent sub-pixel rendering bugs on border-radius during transform
  // Added transform: translateZ(0) to force hardware acceleration and fix corner distortion
  const clippingFix = {
    WebkitMaskImage: '-webkit-radial-gradient(white, black)',
    maskImage: 'radial-gradient(white, black)',
    transform: 'translateZ(0)',
    willChange: 'transform'
  } as React.CSSProperties;

  return (
    <section className="relative bg-white overflow-hidden">
      
      {/* ================= 3D MODELS SECTION ================= */}
      <div className="py-24 relative">
        {/* Header */}
        <div className="container mx-auto px-[5%] mb-12 relative z-10 flex flex-col items-start">
          <span className="text-accent font-bold tracking-widest text-sm mb-2">{t('数字化重建', 'DIGITAL RECONSTRUCTION')}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-2">{t('沉浸式画廊', 'Immersive Gallery')}</h2>
          <div className="h-1 w-20 bg-accent mt-4"></div>
        </div>

        {/* Scroll Container Wrapper */}
        <div className="relative group">
          {/* Left Button */}
          <button 
            onClick={() => scroll('left', modelContainerRef)}
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg items-center justify-center border border-gray-200 text-gray-800 hover:scale-110 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Scroll Left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Scroll Area */}
          <div ref={modelContainerRef} className="relative w-full overflow-x-auto no-scrollbar pb-16 px-[5%] snap-x snap-mandatory scroll-smooth">
            <div className="flex gap-10 w-max pt-4">
              {models.map((item, index) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative w-[320px] md:w-[400px] h-[540px] flex-shrink-0 snap-center cursor-pointer perspective-1000"
                >
                  {/* Shadow Wrapper: Separate from mask to avoid clipping the shadow */}
                  <div className="w-full h-full rounded-[2.5rem] transition-all duration-500 ease-out shadow-sm hover:shadow-2xl group-hover:-translate-y-2">
                    <div 
                      style={clippingFix}
                      className={`
                        w-full h-full rounded-[2.5rem] bg-gradient-to-br ${item.color} 
                        border border-white/40 relative overflow-hidden
                        transform-gpu
                      `}
                    >
                      {/* Curved Screen Simulation Overlays */}
                      {/* 1. Side Shadows for Curvature Depth - stronger on sides to simulate curvature */}
                      <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_20px_0_60px_-10px_rgba(0,0,0,0.15),inset_-20px_0_60px_-10px_rgba(0,0,0,0.15)] rounded-[2.5rem]"></div>
                      
                      {/* 2. Glassy Shine/Gloss top-down */}
                      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-white/30 via-transparent to-black/20 opacity-60 rounded-[2.5rem]"></div>

                      {/* 3. Subtle Bezel Reflection */}
                      <div className="absolute inset-0 z-30 pointer-events-none rounded-[2.5rem] border border-white/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"></div>

                      {/* Model Viewer Content */}
                      <div className="w-full h-[80%] relative z-10 scale-95 origin-center transition-transform duration-500 group-hover:scale-100">
                        <ModelViewer
                          src={item.src}
                          alt={item.title}
                          auto-rotate
                          camera-controls={false} 
                          shadow-intensity="1"
                          environment-image="neutral"
                          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                        ></ModelViewer>
                      </div>

                      {/* Text Overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-8 pt-16 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
                        <span className="text-white/50 text-xs font-mono mb-2 block tracking-widest">ID: 00{index + 1}</span>
                        <h3 className="text-3xl font-bold text-white mb-1 drop-shadow-md">{item.title}</h3>
                        <p className="text-gray-300 text-sm font-light">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-[5vw] flex-shrink-0"></div>
            </div>
          </div>

          {/* Right Button */}
          <button 
            onClick={() => scroll('right', modelContainerRef)}
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg items-center justify-center border border-gray-200 text-gray-800 hover:scale-110 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Scroll Right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>


      {/* ================= CINEMATIC SECTION ================= */}
      <div className="py-24 relative bg-gray-50">
        <div className="container mx-auto px-[5%] mb-12 relative z-10 flex flex-col items-start">
           <span className="text-accent font-bold tracking-widest text-sm mb-2">{t('现场记录', 'ON SITE FOOTAGE')}</span>
           <h2 className="text-4xl md:text-5xl font-bold text-primary mb-2">{t('电影级体验', 'Cinematic Experience')}</h2>
           <div className="h-1 w-20 bg-accent mt-4"></div>
        </div>

        {/* Cinematic Scroll Wrapper */}
        <div className="relative group">
           {/* Left Button */}
           <button 
             onClick={() => scroll('left', videoContainerRef)}
             className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg items-center justify-center border border-gray-200 text-gray-800 hover:scale-110 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
             aria-label="Scroll Left"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
             </svg>
           </button>

          {/* Cinematic Scroll Area */}
          <div ref={videoContainerRef} className="relative w-full overflow-x-auto no-scrollbar pb-10 px-[5%] snap-x snap-mandatory scroll-smooth">
            <div className="flex gap-8 w-max pt-2">
              {videos.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  // Shadow Wrapper: moved shadow and hover transform here
                  className="group relative w-[400px] md:w-[520px] aspect-video flex-shrink-0 snap-center cursor-pointer 
                    rounded-2xl transition-all duration-300 
                    shadow-sm hover:shadow-2xl hover:-translate-y-2 bg-transparent"
                >
                   {/* Inner container with mask for content */}
                   <div 
                     style={clippingFix}
                     className="w-full h-full rounded-2xl overflow-hidden bg-gray-100 border border-black/5 transform-gpu"
                   >
                     {/* Thumbnail */}
                     <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                      />
                     
                     {/* Play Icon */}
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-2xl">
                          <svg className="w-6 h-6 text-white fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                     </div>

                     {/* Text Overlay */}
                     <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
                       <div className="flex justify-between items-end">
                          <div>
                            <h3 className="text-white font-bold text-xl leading-tight mb-1 drop-shadow-sm">{item.title}</h3>
                            <p className="text-gray-200 text-sm font-light">{item.desc}</p>
                          </div>
                          <div className="bg-white/20 backdrop-blur px-2 py-1 rounded text-xs font-mono text-white border border-white/20">
                            {item.meta}
                          </div>
                       </div>
                     </div>
                   </div>
                </div>
              ))}
              <div className="w-[5vw] flex-shrink-0"></div>
            </div>
          </div>

           {/* Right Button */}
           <button 
             onClick={() => scroll('right', videoContainerRef)}
             className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg items-center justify-center border border-gray-200 text-gray-800 hover:scale-110 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
             aria-label="Scroll Right"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
             </svg>
           </button>
        </div>
      </div>

      {/* Expanded Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-white z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="w-full max-w-6xl h-[85vh] flex flex-col md:flex-row bg-[#000] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {/* View Area (3D or Video) */}
            <div className="flex-[2] relative bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              {selectedItem.type === 'model' ? (
                <>
                  <ModelViewer
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    auto-rotate
                    camera-controls
                    shadow-intensity="1.5"
                    exposure="1"
                    ar
                    style={{ width: '100%', height: '100%' }}
                  ></ModelViewer>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm pointer-events-none">
                    {t('滚动缩放 • 拖动旋转', 'Scroll to Zoom • Drag to Rotate')}
                  </div>
                </>
              ) : (
                <video 
                  src={selectedItem.videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain bg-black"
                />
              )}
            </div>

            {/* Info Panel */}
            <div className="flex-1 p-10 flex flex-col justify-center border-l border-white/5 bg-[#0a0a0a]">
              <span className={`font-bold tracking-widest text-sm mb-4 text-accent`}>
                {selectedItem.type === 'video' ? t('高清影像', 'HD FOOTAGE') : t('交互式视图', 'INTERACTIVE VIEW')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedItem.title}</h2>
              <p className="text-gray-400 leading-relaxed mb-10 text-sm md:text-base">
                {selectedItem.type === 'model' 
                  ? t(`对${selectedItem.title}的详细分析。该数字孪生使用高密度激光扫描和摄影测量重建，为后代保留了原始结构的每一个细节。`, `Detailed analysis of the ${selectedItem.title}. This digital twin was reconstructed using high-density laser scanning and photogrammetry, preserving every detail of the original structure for future generations.`)
                  : t(`关于${selectedItem.title}的沉浸式视频记录。捕捉了独特的环境氛围与光影变化，为您提供身临其境的视觉体验。`, `Immersive video footage of ${selectedItem.title}. Capturing the unique atmosphere and lighting changes to provide you with an immersive visual experience.`)
                }
              </p>
              
              <div className="space-y-6 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-500 uppercase tracking-wider text-xs">{t('来源', 'Origin')}</span>
                  <span className="text-white font-medium">{t('希腊', 'Greece')}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-500 uppercase tracking-wider text-xs">{selectedItem.type === 'video' ? t('拍摄日期', 'Capture Date') : t('扫描日期', 'Scan Date')}</span>
                  <span className="text-white font-medium">{t('2025年', '2025')}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-500 uppercase tracking-wider text-xs">{selectedItem.type === 'video' ? t('时长', 'Duration') : t('面数', 'Polygon Count')}</span>
                  <span className="text-white font-medium">{selectedItem.meta}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HorizontalScrollSection;