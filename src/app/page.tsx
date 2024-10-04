"use client";

import Link from "next/link";

import * as THREE from "three";
import { useRef, useState } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";

function StyledLink({ value }: { value: string }) {
  return (
    <motion.div
      className="cursor-pointer w-full"
      whileHover={"hover"}
      whileTap={{ scale: 1.1 }}
    >
      <motion.span className="relative">
        <Link href={"/"}>{value}</Link>
        <motion.span
          className="absolute left-0 bottom-0 w-full h-px bg-zinc-800"
          initial={{ scaleX: 0 }}
          variants={{
            hover: {
              scaleX: 1,
              originX: 0,
              transition: { duration: 0.3 },
            },
          }}
        />
      </motion.span>
    </motion.div>
  );
}

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

  return <primitive ref={ref} object={scene} scale={[1, 1, 1]} />;
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="flex flex-col h-screen justify-between items-center">
      <div className="grid grid-cols-2 place-items-center h-1/4 gap-x-12 w-2/3">
        <div className="w-max flex flex-col justify-center mx-auto">
          <h1 className="text-3xl font-bold border-b py-2">New Project</h1>
          <div className="py-4">
            <p className="flex gap-x-2 items-center text-lg">
              Development server hosted at{" "}
              <span className="font-mono rounded-md text-xs bg-zinc-100 px-2 py-1">
                localhost:3000
              </span>
            </p>
            <p className="text-sm py-2">
              © 2024 Lucas Liu. All rights reserved.
            </p>
          </div>
        </div>

        <nav className="flex gap-x-12">
          <div className="flex items-center gap-x-8">
            <ul className="flex flex-col gap-y-1">
              <h2 className="font-bold text-lg">Navigations</h2>
              {["Home", "About", "Contacts"].map((value, index) => (
                <li key={index}>
                  <StyledLink value={value} />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-x-8">
            <ul className="flex flex-col gap-y-1">
              <h2 className="font-bold text-lg">Table of Contents</h2>
              {["Getting Started", "Documentation", "Projects"].map(
                (value, index) => (
                  <li key={index}>
                    <StyledLink value={value} />
                  </li>
                ),
              )}
            </ul>
          </div>
        </nav>
      </div>

      <motion.div
        className="h-3/4 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Canvas onCreated={() => setIsLoaded(true)}>
          <ambientLight intensity={Math.PI / 3} />
          <directionalLight position={[5, 5, 5]} intensity={Math.PI} />
          <Model url="monkey.glb" start={isLoaded} />
          <Environment preset="dawn" background />
          <OrbitControls />
        </Canvas>
      </motion.div>
    </main>
  );
}
