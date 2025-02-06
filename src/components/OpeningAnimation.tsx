import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/components/ThemeProvider';

export const OpeningAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create neural network nodes
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const nodeMaterial = new THREE.MeshPhongMaterial({
      color: theme === 'dark' ? 0x4a9eff : 0x2563eb,
      shininess: 100
    });

    // Create nodes in a network pattern
    for (let i = 0; i < 20; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.x = (Math.random() - 0.5) * 10;
      node.position.y = (Math.random() - 0.5) * 10;
      node.position.z = (Math.random() - 0.5) * 10;
      nodes.push(node);
      scene.add(node);
    }

    // Create connections between nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: theme === 'dark' ? 0x4a9eff : 0x2563eb,
      transparent: true,
      opacity: 0.3
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < 5) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position,
            nodes[j].position
          ]);
          const line = new THREE.Line(geometry, lineMaterial);
          connections.push(line);
          scene.add(line);
        }
      }
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 15;

    // Animation
    let frame = 0;
    const animate = () => {
      frame++;
      
      // Rotate the entire network
      nodes.forEach((node, i) => {
        node.rotation.x += 0.01;
        node.rotation.y += 0.01;
        node.position.x += Math.sin(frame * 0.02 + i) * 0.01;
        node.position.y += Math.cos(frame * 0.02 + i) * 0.01;
      });

      // Update connections
      connections.forEach((line, i) => {
        const positions = line.geometry.attributes.position.array;
        line.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);

      // Complete animation after 3 seconds
      if (frame === 180) {
        onComplete();
      } else {
        requestAnimationFrame(animate);
      }
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      style={{ animation: 'fadeOut 0.5s ease-out 2.5s forwards' }}
    />
  );
};