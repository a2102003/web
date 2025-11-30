import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useLanguage } from '../contexts/LanguageContext';

const PlayerSection: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    const bgColor = 0xF7F8FA; 
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.Fog(bgColor, 5, 30); // Seamless blend

    const camera = new THREE.PerspectiveCamera(35, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(10, 8, 10); // Isometric-style angle

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent going under floor
    controls.minDistance = 5;
    controls.maxDistance = 20;

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(5, 10, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xEEF2FF, 0.5);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // --- OBJECTS: DIGITAL TWIN ROOM ---
    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // 1. Floor
    const floorGeo = new THREE.PlaneGeometry(100, 100);
    const floorMat = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      roughness: 0.8,
      metalness: 0.1 
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // 2. Corner Walls
    const wallHeight = 4;
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xF0F0F0, roughness: 0.9 });
    
    const wallThickness = 0.2;
    const roomSize = 6;
    
    // Back Wall
    const w1 = new THREE.Mesh(new THREE.BoxGeometry(roomSize, 4, wallThickness), wallMat);
    w1.position.set(0, 2, -roomSize/2);
    w1.receiveShadow = true;
    w1.castShadow = true;
    roomGroup.add(w1);

    // Side Wall
    const w2 = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, 4, roomSize), wallMat);
    w2.position.set(-roomSize/2, 2, 0);
    w2.receiveShadow = true;
    w2.castShadow = true;
    roomGroup.add(w2);

    // 3. Furniture: Minimalist Sofa
    const sofaGroup = new THREE.Group();
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 });
    
    const seat = new THREE.Mesh(new THREE.BoxGeometry(3, 0.4, 1.2), sofaMat);
    seat.position.y = 0.4;
    seat.castShadow = true;
    seat.receiveShadow = true;
    sofaGroup.add(seat);

    const back = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 0.3), sofaMat);
    back.position.set(0, 0.9, -0.45);
    back.castShadow = true;
    back.receiveShadow = true;
    sofaGroup.add(back);

    sofaGroup.position.set(0, 0, -1.5);
    roomGroup.add(sofaGroup);

    // 4. Furniture: Modern Coffee Table
    const tableGroup = new THREE.Group();
    const tableTopGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.05, 32);
    const tableTopMat = new THREE.MeshPhysicalMaterial({ 
      color: 0xffffff, 
      metalness: 0.1, 
      roughness: 0.1, 
      transmission: 0.6, // Glass-like
      thickness: 0.5,
    });
    const tableTop = new THREE.Mesh(tableTopGeo, tableTopMat);
    tableTop.position.y = 0.5;
    tableTop.castShadow = true;
    tableGroup.add(tableTop);

    const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.5, 16);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
    const legPositions = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
    legPositions.forEach(angle => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(Math.cos(angle) * 0.5, 0.25, Math.sin(angle) * 0.5);
      leg.castShadow = true;
      tableGroup.add(leg);
    });
    
    tableGroup.position.set(0.5, 0, 0.5);
    roomGroup.add(tableGroup);

    // 5. Decor: Abstract Sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0xFFA500, metalness: 0.5, roughness: 0.2 })
    );
    sphere.position.set(0.5, 0.7, 0.5);
    sphere.castShadow = true;
    roomGroup.add(sphere);

    // 6. Rug
    const rug = new THREE.Mesh(
      new THREE.CircleGeometry(2, 64),
      new THREE.MeshStandardMaterial({ color: 0x2D68FF, roughness: 1 })
    );
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.01, 0);
    rug.receiveShadow = true;
    roomGroup.add(rug);


    // --- SPATIAL COMPUTING EFFECTS ---
    
    // Scanning Grid Plane
    const gridHelper = new THREE.GridHelper(6, 20, 0x2D68FF, 0x2D68FF);
    gridHelper.position.y = 0;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.3;
    roomGroup.add(gridHelper);

    // Scanning Plane (Solid transparent)
    const scanPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      new THREE.MeshBasicMaterial({ 
        color: 0x2D68FF, 
        transparent: true, 
        opacity: 0.1, 
        side: THREE.DoubleSide 
      })
    );
    scanPlane.rotation.x = -Math.PI / 2;
    roomGroup.add(scanPlane);

    // Floating UI Points
    const pointsGroup = new THREE.Group();
    const pointGeo = new THREE.SphereGeometry(0.03, 8, 8);
    const pointMat = new THREE.MeshBasicMaterial({ color: 0x2D68FF });
    
    for(let i=0; i<10; i++) {
        const p = new THREE.Mesh(pointGeo, pointMat);
        p.position.set(
            (Math.random() - 0.5) * 4,
            Math.random() * 3,
            (Math.random() - 0.5) * 4
        );
        pointsGroup.add(p);
    }
    roomGroup.add(pointsGroup);


    // --- ANIMATION LOOP ---
    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;
      
      controls.update();

      // Animate Scan Effect
      const scanY = 1.5 + Math.sin(time) * 1.5; // Oscillate between 0 and 3
      gridHelper.position.y = scanY;
      scanPlane.position.y = scanY;

      // Animate Points
      pointsGroup.children.forEach((child, i) => {
          child.position.y += Math.sin(time + i) * 0.005;
      });

      // Camera gentle float if autoRotate is off, but autoRotate handles most
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // Simple disposal of common materials
      floorGeo.dispose(); floorMat.dispose();
    };
  }, []);

  return (
    <section className="flex flex-col lg:flex-row min-h-[80vh] bg-bgLight">
      {/* Text Content */}
      <div className="w-full lg:flex-1 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-bgLight z-10">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 md:mb-8 text-primary">
          {t('房地产空间计算', 'Spatial Computing for Real Estate')}
        </h2>
        <p className="text-secondary mb-8 md:mb-10 leading-relaxed">
          {t('将物理空间转化为沉浸式数字资产。我们的技术使远程访问感觉像身临其境一样真实。', 'Turn physical spaces into immersive digital assets. Our technology enables remote visits that feel as real as being there.')}
        </p>
        <ul className="space-y-6">
          {[
            { title: t("娃娃屋视角", "Dollhouse View"), desc: t("完整的3D结构理解。", "Complete 3D structural understanding.") },
            { title: t("激光测量", "Laser Measurement"), desc: t("精度在±5mm范围内。", "Accuracy within ±5mm range.") },
            { title: t("AI增强", "AI Enhancement"), desc: t("自动移除移动物体。", "Auto-removal of moving objects.") }
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <span className="text-accent text-xl font-bold">✓</span>
              <div>
                <strong className="block text-primary text-lg">{item.title}</strong>
                <span className="text-sm text-secondary">{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <button className="px-8 py-3 bg-accent text-white rounded-full font-semibold shadow-lg shadow-accent/30 hover:-translate-y-1 transition-all">
            {t('了解解决方案', 'Learn Solution')}
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-[50vh] min-h-[400px] lg:h-auto lg:flex-[1.5] relative bg-bgLight">
        <div ref={mountRef} className="w-full h-full outline-none cursor-move" />
        
        {/* Player UI Overlay */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
          <div className="text-shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold mb-1 text-primary">{t('数字孪生概念', 'Digital Twin Concept')}</h3>
            <span className="opacity-60 text-sm text-secondary">Real-time Rendering</span>
          </div>
          <div className="pointer-events-auto bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs md:text-sm whitespace-nowrap shadow-sm text-gray-600 border border-white">
            {t('拖动旋转 • 滚动缩放', 'Drag to Rotate • Scroll to Zoom')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerSection;