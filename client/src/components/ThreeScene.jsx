import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Cube() {
  return (
    <mesh rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <Canvas style={{ height: "100vh", width: "100%" }}>
      
      {/* Light */}
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 5]} />

      {/* Cube */}
      <Cube />

      {/* Mouse Control */}
      <OrbitControls />

    </Canvas>
  );
}