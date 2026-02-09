import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState, useEffect, useRef } from "react";

const IphoneModel = () => {
  const gltf = useLoader(GLTFLoader, "/models/Iphone14.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    dracoLoader.setDecoderConfig({ type: "wasm" });
    loader.setDRACOLoader(dracoLoader);
  });
  return <primitive object={gltf.scene} scale={10} />;
};

export default function IphoneViewer() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: "300px" }}>
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 3], fov: 50 }}
          style={{ width: "100%", height: "auto" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 5]} intensity={1} />
          <IphoneModel />
          <OrbitControls
            target={[0, 0.7, 0]}
            enableZoom={false}
            enablePan={false}
            rotateSpeed={1}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      )}
    </div>
  );
}
