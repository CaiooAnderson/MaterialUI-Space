import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DirectionalLight } from 'three';

interface AnimatedLightProps {
  darkMode: boolean;
}

export default function AnimatedLight({ darkMode }: AnimatedLightProps) {
  const lightRef = useRef<DirectionalLight>(null);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(Date.now() * 0.001) * 10;
      lightRef.current.position.z = Math.cos(Date.now() * 0.001) * 10;
    }
  });

  return <directionalLight ref={lightRef} intensity={darkMode ? 1 : 0.6} />;
}
