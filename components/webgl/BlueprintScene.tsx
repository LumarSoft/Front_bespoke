"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface VolumeSpec {
  x: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  /** Progreso global (0-1) en el que empieza/termina de levantarse este volumen. */
  startAt: number;
  endAt: number;
}

const VOLUMES: VolumeSpec[] = [
  { x: -1.7, z: -0.5, width: 1.8, height: 1.6, depth: 1.4, startAt: 0.06, endAt: 0.32 },
  { x: 0.4, z: 0.7, width: 2.3, height: 2.5, depth: 1.7, startAt: 0.28, endAt: 0.58 },
  { x: 2.2, z: -0.4, width: 1.3, height: 3.3, depth: 1.3, startAt: 0.52, endAt: 0.8 },
];

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function Volume({ spec, progressRef }: { spec: VolumeSpec; progressRef: MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  const geometry = useMemo(() => new THREE.BoxGeometry(spec.width, 1, spec.depth), [spec.width, spec.depth]);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useFrame(() => {
    const eased = smoothstep(spec.startAt, spec.endAt, progressRef.current);
    const scaleY = Math.max(eased, 0.001) * spec.height;

    if (meshRef.current) {
      meshRef.current.scale.y = scaleY;
      meshRef.current.position.y = scaleY / 2;
    }
    if (edgesRef.current) {
      edgesRef.current.scale.y = scaleY;
      edgesRef.current.position.y = scaleY / 2;
    }
    if (materialRef.current) {
      materialRef.current.opacity = 0.06 + eased * 0.24;
    }
  });

  return (
    <group position={[spec.x, 0, spec.z]}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial ref={materialRef} color="#f4efe6" transparent opacity={0.06} depthWrite={false} />
      </mesh>
      <lineSegments ref={edgesRef} geometry={edgesGeometry}>
        <lineBasicMaterial color="#d99a63" transparent opacity={0.85} />
      </lineSegments>
    </group>
  );
}

function GroundGrid({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(() => {
    const material = gridRef.current?.material;
    if (!material) return;
    const mat = Array.isArray(material) ? material[0] : material;
    mat.transparent = true;
    mat.opacity = THREE.MathUtils.lerp(0.85, 0.3, progressRef.current);
  });

  return <gridHelper ref={gridRef} args={[14, 28, "#b5652b", "#57524a"]} />;
}

function CameraRig({ progressRef }: { progressRef: MutableRefObject<number> }) {
  useFrame(({ camera }) => {
    const p = progressRef.current;
    const angle = THREE.MathUtils.lerp(Math.PI * 0.46, Math.PI * 0.24, p);
    const radius = THREE.MathUtils.lerp(9.5, 6.5, p);
    const height = THREE.MathUtils.lerp(9, 3.2, p);
    camera.position.set(Math.sin(angle) * radius, height, Math.cos(angle) * radius);
    camera.lookAt(0.3, 1.1, 0);
  });

  return null;
}

export interface BlueprintSceneProps {
  progressRef: MutableRefObject<number>;
}

/**
 * Escena local (no la capa WebGL global): un plano/blueprint del que se
 * levantan volúmenes arquitectónicos procedurales a medida que
 * `progressRef` avanza (0→1), escrito por el ScrollTrigger pinneado de
 * Proceso.tsx. Sin assets externos — todo geometría/material de Three.js.
 */
export default function BlueprintScene({ progressRef }: BlueprintSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 38, position: [0, 9, 9.5] }}
      frameloop="always"
    >
      <CameraRig progressRef={progressRef} />
      <GroundGrid progressRef={progressRef} />
      {VOLUMES.map((spec, index) => (
        <Volume key={index} spec={spec} progressRef={progressRef} />
      ))}
    </Canvas>
  );
}
