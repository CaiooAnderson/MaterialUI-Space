import { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface PlanetProps {
  start: boolean;
  darkMode: boolean;
}

export default function Planet({ start, darkMode }: PlanetProps) {
  const [scale, setScale] = useState(2);
  const planetRef = useRef<THREE.Mesh>(null);

  const logoTexture = useLoader(THREE.TextureLoader, "/src/assets/linea-logo.svg");

  const createGradientTexture = (isDarkMode: boolean) => {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);

    if (isDarkMode) {
      gradient.addColorStop(0, '#6a0dad');
      gradient.addColorStop(0.5, '#0000ff');
      gradient.addColorStop(1, '#00008b');
    } else {
      gradient.addColorStop(0, '#b0e0e6');
      gradient.addColorStop(0.5, '#00ffff');
      gradient.addColorStop(1, '#66cdaa');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  const planetTexture = createGradientTexture(darkMode);

  useEffect(() => {
    if (start && planetRef.current) {
      const interval = setInterval(() => {
        setScale((prev) => Math.max(prev - 0.05, 1));
      }, 20);

      return () => clearInterval(interval);
    }
  }, [start]);

  return (
    <mesh ref={planetRef} scale={[scale, scale, scale]} position={[0, 0, 0]}>
      <sphereGeometry args={[2, 32, 32]} />
      
      <meshStandardMaterial map={planetTexture} roughness={0.8} metalness={0.2} />

      <mesh position={[0, 0, 2.1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={logoTexture} transparent={true} opacity={1} />
      </mesh>
    </mesh>
  );
}
