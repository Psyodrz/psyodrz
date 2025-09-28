"use client"

import type React from "react"

import { Canvas, useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { useMemo, useRef, useState, useEffect } from "react"

function WireScene({ animate = true }: { animate?: boolean }) {
  const group = useRef<THREE.Group>(null)
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "white",
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      }),
    [],
  )

  useFrame((_, delta) => {
    if (!animate || !group.current) return
    group.current.rotation.y += delta * 0.2
    group.current.rotation.x += delta * 0.1
  })

  return (
    <group ref={group}>
      <mesh material={material}>
        <torusKnotGeometry args={[2.0, 0.5, 180, 32]} />
      </mesh>
      <mesh position={[0, 0, -1.5]} material={material}>
        <icosahedronGeometry args={[1.25, 0]} />
      </mesh>
    </group>
  )
}

function Stars({ count = 600 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.randFloat(6, 18)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2))
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return positions
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} itemSize={3} array={points} />
      </bufferGeometry>
      <pointsMaterial color={"#00e5ff"} size={0.02} transparent opacity={0.35} />
    </points>
  )
}

export default function Hero3D({ children }: { children: React.ReactNode }) {
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = () => setAnimate(!media.matches)
    handler()
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["transparent"]} />
        <fog attach="fog" args={[new THREE.Color("black"), 12, 24]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 4, 5]} intensity={0.7} color={"#00e5ff"} />
        <Stars />
        <WireScene animate={animate} />
        <Html center>{/* keeps Canvas layout stable */}</Html>
      </Canvas>

      {/* Overlay content */}
      <div className="pointer-events-auto absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background/80" />

      <div className="pointer-events-none absolute inset-0">
        {/* Allow children to be interactive */}
        <div className="pointer-events-auto">{children}</div>
      </div>
    </div>
  )
}
