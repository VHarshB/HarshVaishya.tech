'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Simple deterministic PRNG to keep circuit paths consistent across refreshes
const createSeededRandom = (seed: number) => {
  return () => {
    seed = (seed ^ 0x6d2b79f5) + 0x6d2b79f5 | 0;
    seed = Math.imul(seed ^ seed >>> 15, seed | 1);
    seed ^= seed + Math.imul(seed ^ seed >>> 7, seed | 61);
    return ((seed ^ seed >>> 14) >>> 0) / 4294967296;
  };
};

const CircuitAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const rng = createSeededRandom(12345);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    let animationId: number | null = null;

    const setRendererSize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    setRendererSize();
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 50;

    // Circuit line colors
    const colors = {
      cyan: 0x75B3C2,
      green: 0x6092B3,
      blue: 0x1D3A46,
      teal: 0x23294a,
      purple: 0x5f264a
    };

    // Create circuit paths
    const paths: { points: THREE.Vector3[], color: number, progress: number, speed: number }[] = [];

    // Check if mobile
    const isMobile = window.innerWidth < 768;

    // Generate multiple circuit paths
    for (let i = 0; i < 25; i++) {
      // Bias circuits toward the right on desktop, more centered on mobile
      const startX = isMobile ? (-10 + rng() * 50) : (50 + rng() * 60); // mobile: [-10, 40], desktop: [50, 120]
      const startY = (rng() - 0.5) * 50;
      const points: THREE.Vector3[] = [];
      
      let x = startX;
      let y = startY;
      const segments = Math.floor(rng() * 5) + 3;
      
      points.push(new THREE.Vector3(x, y, 0));
      
      for (let j = 0; j < segments; j++) {
        const horizontal = rng() > 0.5;
        const length = rng() * 15 + 5;
        
        if (horizontal) {
          x += (rng() > 0.5 ? 1 : -1) * length;
        } else {
          y += (rng() > 0.5 ? 1 : -1) * length;
        }
        
        points.push(new THREE.Vector3(x, y, 0));
      }
      
      const colorKeys = Object.keys(colors);
      const randomColor = colors[colorKeys[Math.floor(rng() * colorKeys.length)] as keyof typeof colors];
      
      paths.push({
        points,
        color: randomColor,
        progress: 0,
        speed: rng() * 0.3 + 0.1
      });
    }

    // Create lines and animated segments
    const lines: THREE.Line[] = [];
    const animatedLines: { line: THREE.Line, path: typeof paths[0] }[] = [];

    paths.forEach(path => {
      const geometry = new THREE.BufferGeometry().setFromPoints(path.points);
      const material = new THREE.LineBasicMaterial({ 
        color: path.color, 
        transparent: true, 
        opacity: 0.4 
      });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      lines.push(line);

      const animGeometry = new THREE.BufferGeometry();
      const animMaterial = new THREE.LineBasicMaterial({ 
        color: path.color, 
        transparent: true, 
        opacity: 1,
        linewidth: 2
      });
      const animLine = new THREE.Line(animGeometry, animMaterial);
      scene.add(animLine);
      animatedLines.push({ line: animLine, path });
    });

    // These nodes represent connection points along the circuit paths
    const nodeGeometry = new THREE.CircleGeometry(0.3, 16);
    paths.forEach(path => {
      path.points.forEach((point, idx) => {
        if (idx > 0 && idx < path.points.length - 1) {
          const nodeMaterial = new THREE.MeshBasicMaterial({ 
            color: path.color,
            transparent: true,
            opacity: 0.8
          });
          const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
          node.position.copy(point);
          scene.add(node);
        }
      });
    });

    // Add stars
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
      starVertices.push(
        (rng() - 0.5) * 200,
        (rng() - 0.5) * 120,
        (rng() - 0.5) * 100 - 50
      );
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3, transparent: true, opacity: 0.6 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Animation
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      animatedLines.forEach(({ line, path }) => {
        path.progress += path.speed;
        
        if (path.progress > path.points.length) {
          path.progress = 0;
        }

        const currentIndex = Math.floor(path.progress);
        const nextIndex = Math.min(currentIndex + 1, path.points.length - 1);
        const fraction = path.progress - currentIndex;

        const animPoints: THREE.Vector3[] = [];
        
        for (let i = 0; i <= currentIndex && i < path.points.length; i++) {
          animPoints.push(path.points[i].clone());
        }
        
        if (currentIndex < path.points.length - 1) {
          const interpolated = new THREE.Vector3().lerpVectors(
            path.points[currentIndex],
            path.points[nextIndex],
            fraction
          );
          animPoints.push(interpolated);
        }

        line.geometry.setFromPoints(animPoints);
      });

      stars.rotation.z += 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => setRendererSize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', minHeight: '100vh', position: 'absolute', inset: 0, background: '#00051084' }}
    />
  );
};

export default CircuitAnimation;