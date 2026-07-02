"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { distortVertexShader, distortFragmentShader } from "./distortShader";

export interface DistortRefs {
  hoverRef: MutableRefObject<number>;
  mouseRef: MutableRefObject<{ x: number; y: number }>;
}

function useDistortUniforms(hasTexture: boolean, texture: THREE.Texture | null) {
  return useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uHasTexture: { value: hasTexture ? 1 : 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTexture: { value: texture },
    }),
    [hasTexture, texture]
  );
}

function DistortPlane({
  hoverRef,
  mouseRef,
  uniforms,
}: DistortRefs & { uniforms: ReturnType<typeof useDistortUniforms> }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const currentHover = useRef(0);

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;
    currentHover.current += (hoverRef.current - currentHover.current) * 0.08;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uHover.value = currentHover.current;
    material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={distortVertexShader}
        fragmentShader={distortFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function TexturedScene({ src, hoverRef, mouseRef }: DistortRefs & { src: string }) {
  const texture = useLoader(THREE.TextureLoader, src);
  const uniforms = useDistortUniforms(true, texture);
  return <DistortPlane hoverRef={hoverRef} mouseRef={mouseRef} uniforms={uniforms} />;
}

function ProceduralScene({ hoverRef, mouseRef }: DistortRefs) {
  const uniforms = useDistortUniforms(false, null);
  return <DistortPlane hoverRef={hoverRef} mouseRef={mouseRef} uniforms={uniforms} />;
}

/**
 * Plano WebGL con shader de distorsión (ripple + chromatic shift) que sigue al
 * cursor. Sin `src`, dibuja un patrón procedural coherente con el placeholder
 * rayado; con `src`, distorsiona la textura real. Se monta/desmonta con el
 * hover de la card (ver ProjectCard) para no mantener contextos WebGL de más.
 */
export default function DistortCard({ src, hoverRef, mouseRef }: DistortRefs & { src?: string }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 1], fov: 50 }}
      frameloop="always"
    >
      {src ? (
        <TexturedScene src={src} hoverRef={hoverRef} mouseRef={mouseRef} />
      ) : (
        <ProceduralScene hoverRef={hoverRef} mouseRef={mouseRef} />
      )}
    </Canvas>
  );
}
