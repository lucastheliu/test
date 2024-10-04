"use client";

import * as THREE from "three";
import { useRef, useState } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import { motion } from "framer-motion";

interface ModelProps {
  url: string;
  start: boolean;
}

function Model({ url, start }: ModelProps) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>();

  useFrame((_state, delta) => {
    if (start && ref.current) {
      ref.current.rotation.x -= delta;
      ref.current.rotation.y += delta;
      ref.current.rotation.z += delta;
    }
  });

  return <primitive ref={ref} object={scene} scale={[2.5, 2.5, 2.5]} />;
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="flex flex-col h-screen justify-center items-center">
      <div className="w-5/12 mx-auto">
        <h1 className="text-3xl font-bold border-b py-2">Hello, world!</h1>
        <p className="text-lg py-4">
          The development server is hosted at
          <span className="font-mono rounded-md text-sm bg-zinc-200 mx-2 px-2 py-1">
            localhost:3000
          </span>
        </p>
      </div>

      <motion.div
        className="h-1/2 w-1/2 m-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Canvas onCreated={() => setIsLoaded(true)}>
          <ambientLight intensity={Math.PI / 3} />
          <directionalLight position={[5, 5, 5]} intensity={Math.PI} />
          <directionalLight position={[-5, -5, -5]} intensity={Math.PI / 2} />
          <Model url="monkey.glb" start={isLoaded} />
          <OrbitControls />
        </Canvas>
      </motion.div>
    </main>
  );
}
