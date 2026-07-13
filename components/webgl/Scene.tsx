"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollState";
import { vertexShader, fragmentShader } from "./shaders";

function NoisePlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      targetMouse.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color("#f4efe6") },
    }),
    []
  );

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;
    mouse.current.lerp(targetMouse.current, 0.04);
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uScroll.value = scrollState.progress;
    material.uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * Mismo lenguaje visual que BlueprintScene (Proceso): un plano/blueprint del
 * que asoma un volumen arquitectónico, acá ya "construido" y flotando en
 * idle, con leve parallax de mouse. Conecta el fondo del Hero con el momento
 * firma de Proceso sin repetir la narrativa de construcción por pasos.
 */
function HeroVolume() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const gridMaterialRef = useRef<THREE.Material | null>(null);
  const targetTilt = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => new THREE.BoxGeometry(1.6, 1.3, 1.2), []);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      targetTilt.current = {
        x: (event.clientY / window.innerHeight) * 2 - 1,
        y: (event.clientX / window.innerWidth) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (group) {
      group.rotation.y += delta * 0.06;
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetTilt.current.x * 0.12, 0.03);
      group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, -targetTilt.current.y * 0.08, 0.03);
      group.position.y = -0.3 + Math.sin(state.clock.elapsedTime * 0.4) * 0.06;
    }

    const fadeOut = 1 - THREE.MathUtils.smoothstep(scrollState.progress, 0, 0.16);
    if (materialRef.current) materialRef.current.opacity = 0.1 * fadeOut;
    if (gridMaterialRef.current) {
      const mat = gridMaterialRef.current as THREE.Material & { opacity: number };
      mat.opacity = 0.3 * fadeOut;
    }
  });

  return (
    <group ref={groupRef} position={[0.6, -0.3, -0.4]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial ref={materialRef} color="#f4efe6" transparent opacity={0.1} depthWrite={false} />
      </mesh>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color="#d99a63" transparent opacity={0.6} />
      </lineSegments>
      <gridHelper
        ref={(grid) => {
          if (grid) {
            const mat = Array.isArray(grid.material) ? grid.material[0] : grid.material;
            mat.transparent = true;
            gridMaterialRef.current = mat;
          }
        }}
        args={[6, 12, "#b5652b", "#57524a"]}
        position={[0, -0.65, 0]}
      />
    </group>
  );
}

export default function Scene({ lowPower }: { lowPower: boolean }) {
  return (
    <Canvas
      dpr={lowPower ? 1 : [1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 45, position: [0, 0, 5] }}
      frameloop="always"
    >
      <NoisePlane />
      <HeroVolume />
    </Canvas>
  );
}
