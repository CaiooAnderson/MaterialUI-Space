import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

interface AnimatedStarsProps {
  darkMode: boolean;
}

export default function AnimatedStars({ darkMode }: AnimatedStarsProps) {
  const starsGroup = useRef<THREE.Group>(null);

  useFrame(() => {
    if (starsGroup.current) {
      starsGroup.current.rotation.y += darkMode ? 0.0005 : 0.0002;
    }
  });

  return (
    <group ref={starsGroup}>
      <Stars radius={100} depth={50} count={10000} factor={darkMode ? 4 : 2} />
    </group>
  );
}
