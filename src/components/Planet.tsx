import { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface PlanetProps {
  start: boolean;
  darkMode: boolean;
  planetName: "LIneA" | "SysMap";
}

const logoTextures = {
  LIneA: "/assets/linea-logo.svg",
  SysMap: "/assets/sysmap-logo.svg",
};

const gradientStops = {
  LIneA: {
    dark: ["#6a0dad", "#0000ff", "#00008b"],
    light: ["#b0e0e6", "#00ffff", "#66cdaa"],
  },
  SysMap: {
    dark:  ['#001f3f', '#0074D9', '#00BFFF'],
    light: ['#E0F7FF', '#B3E5FC', '#81D4FA'],
  },
};

export default function Planet({ start, darkMode, planetName }: PlanetProps) {
  const [scale, setScale] = useState(2);
  const planetRef = useRef<THREE.Mesh>(null!);

  const logoTexture = useLoader(THREE.TextureLoader, logoTextures[planetName]);

  const createGradientTexture = () => {
    const size = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const stops = darkMode
      ? gradientStops[planetName].dark
      : gradientStops[planetName].light;

    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    grad.addColorStop(0, stops[0]);
    grad.addColorStop(0.5, stops[1]);
    grad.addColorStop(1, stops[2]);

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  const planetTexture = createGradientTexture();

  useEffect(() => {
    if (!start || !planetRef.current) return;
    const iv = setInterval(() => {
      setScale((s) => Math.max(s - 0.05, 1));
    }, 20);
    return () => clearInterval(iv);
  }, [start]);

  return (
    <mesh ref={planetRef} scale={[scale, scale, scale]} position={[0, 0, 0]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        map={planetTexture!}
        roughness={0.8}
        metalness={0.2}
      />
      <mesh position={[0, 0, 2.1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={logoTexture} transparent opacity={1} />
      </mesh>
    </mesh>
  );
}
