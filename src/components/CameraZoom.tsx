import { useFrame } from '@react-three/fiber';

export default function CameraZoom({ start }: { start: boolean }) {
  useFrame(({ camera }) => {
    if (!start) {
      camera.position.set(0, 0, 3);
    } else if (camera.position.z < 10) { 
      camera.position.z += 0.08;
    }
  });
  return null;
}
