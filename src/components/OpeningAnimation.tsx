import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from 'sonner';

export const OpeningAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [dataStream, setDataStream] = useState<string[]>([]);

  // Generate random binary stream
  useEffect(() => {
    const interval = setInterval(() => {
      setDataStream(prev => {
        const newStream = [...prev];
        if (newStream.length > 20) newStream.shift();
        return [...newStream, Math.random().toString(2).substr(2, 8)];
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create neural network structure
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];
    const layers = [4, 6, 6, 4];
    const nodeGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    
    const nodeMaterial = new THREE.MeshPhongMaterial({
      color: theme === 'dark' ? 0x4a9eff : 0x2563eb,
      shininess: 100,
      emissive: theme === 'dark' ? 0x1a365d : 0x3b82f6,
      emissiveIntensity: 0.5
    });

    // Create nodes in layers
    let xOffset = -(layers.length - 1) * 2;
    layers.forEach((nodeCount, layerIndex) => {
      const ySpacing = 5 / (nodeCount - 1);
      for (let i = 0; i < nodeCount; i++) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.x = xOffset + layerIndex * 4;
        node.position.y = (i * ySpacing) - 2.5;
        node.position.z = 0;
        nodes.push(node);
        scene.add(node);
      }
    });

    // Create connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: theme === 'dark' ? 0x4a9eff : 0x2563eb,
      transparent: true,
      opacity: 0.3
    });

    let currentLayerStart = 0;
    for (let layer = 0; layer < layers.length - 1; layer++) {
      const nextLayerStart = currentLayerStart + layers[layer];
      for (let i = currentLayerStart; i < currentLayerStart + layers[layer]; i++) {
        for (let j = nextLayerStart; j < nextLayerStart + layers[layer + 1]; j++) {
          const points = [nodes[i].position, nodes[j].position];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, lineMaterial);
          connections.push(line);
          scene.add(line);
        }
      }
      currentLayerStart += layers[layer];
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x4a9eff, 2);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4a9eff, 2);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    camera.position.z = 10;

    // Animation
    let frame = 0;
    const animate = () => {
      frame++;
      
      // Rotate camera slightly
      camera.position.x = Math.sin(frame * 0.001) * 2;
      camera.lookAt(0, 0, 0);

      // Animate nodes
      nodes.forEach((node, i) => {
        const time = frame * 0.02;
        node.position.y += Math.sin(time + i) * 0.002;
        const scale = 1 + Math.sin(time * 2 + i) * 0.1;
        node.scale.set(scale, scale, scale);
      });

      // Animate connections
      connections.forEach((line, i) => {
        const opacity = (Math.sin(frame * 0.02 + i) + 1) * 0.3;
        (line.material as THREE.LineBasicMaterial).opacity = opacity;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Trigger completion after animation
    setTimeout(() => {
      onComplete();
      toast.success("Welcome to my portfolio!");
    }, 3000);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="flex flex-wrap gap-4 p-4">
          {dataStream.map((binary, index) => (
            <div
              key={index}
              className="text-primary/60 font-mono text-sm animate-fade-up"
              style={{
                animationDelay: `${index * 50}ms`,
                opacity: 0
              }}
            >
              {binary}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};