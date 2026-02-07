import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Teddy Bear built from primitives
function TeddyBear({ onClick }) {
  const groupRef = useRef();
  const envelopeGroupRef = useRef();
  
  // Colors
  const furColor = '#C4A484';
  const furDark = '#A67B5B';
  const nose = '#3D2914';
  const eyes = '#1a1a1a';
  const envelopeColor = '#FFF8E7';
  const envelopeDark = '#E8D5C4';
  const heartColor = '#E74C3C';
  
  // Breathing animation
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;
    }
    if (envelopeGroupRef.current) {
      envelopeGroupRef.current.rotation.z = Math.sin(t * 1.2) * 0.05;
      envelopeGroupRef.current.position.y = Math.sin(t * 1.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} onClick={onClick} position={[0, -0.2, 0]}>
      {/* === BODY === */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={furColor} roughness={0.9} />
      </mesh>
      
      {/* Belly patch */}
      <mesh position={[0, 0, 0.85]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color={furDark} roughness={0.95} />
      </mesh>
      
      {/* === HEAD === */}
      <mesh position={[0, 1.35, 0.2]}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial color={furColor} roughness={0.9} />
      </mesh>
      
      {/* Snout */}
      <mesh position={[0, 1.15, 0.85]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color={furDark} roughness={0.95} />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 1.22, 1.12]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={nose} roughness={0.3} />
      </mesh>
      
      {/* === EARS === */}
      {/* Left ear */}
      <mesh position={[-0.55, 1.95, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color={furColor} roughness={0.9} />
      </mesh>
      <mesh position={[-0.55, 1.95, 0.1]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={furDark} roughness={0.95} />
      </mesh>
      
      {/* Right ear */}
      <mesh position={[0.55, 1.95, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color={furColor} roughness={0.9} />
      </mesh>
      <mesh position={[0.55, 1.95, 0.1]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={furDark} roughness={0.95} />
      </mesh>
      
      {/* === EYES === */}
      {/* Left eye */}
      <mesh position={[-0.25, 1.45, 0.65]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={eyes} roughness={0.2} />
      </mesh>
      <mesh position={[-0.22, 1.48, 0.75]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Right eye */}
      <mesh position={[0.25, 1.45, 0.65]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={eyes} roughness={0.2} />
      </mesh>
      <mesh position={[0.28, 1.48, 0.75]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>
      
      {/* === ARMS === */}
      {/* Left arm */}
      <mesh position={[-0.95, 0.3, 0.4]} rotation={[0.4, 0.3, 0.6]}>
        <capsuleGeometry args={[0.22, 0.5, 8, 16]} />
        <meshStandardMaterial color={furColor} roughness={0.9} />
      </mesh>
      
      {/* Right arm */}
      <mesh position={[0.95, 0.3, 0.4]} rotation={[0.4, -0.3, -0.6]}>
        <capsuleGeometry args={[0.22, 0.5, 8, 16]} />
        <meshStandardMaterial color={furColor} roughness={0.9} />
      </mesh>
      
      {/* === LEGS === */}
      {/* Left leg */}
      <mesh position={[-0.45, -0.9, 0.3]}>
        <capsuleGeometry args={[0.28, 0.35, 8, 16]} />
        <meshStandardMaterial color={furColor} roughness={0.9} />
      </mesh>
      <mesh position={[-0.45, -1.1, 0.5]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={furDark} roughness={0.95} />
      </mesh>
      
      {/* Right leg */}
      <mesh position={[0.45, -0.9, 0.3]}>
        <capsuleGeometry args={[0.28, 0.35, 8, 16]} />
        <meshStandardMaterial color={furColor} roughness={0.9} />
      </mesh>
      <mesh position={[0.45, -1.1, 0.5]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={furDark} roughness={0.95} />
      </mesh>
      
      {/* === ENVELOPE === */}
      <group ref={envelopeGroupRef} position={[0, 0.1, 1.15]}>
        {/* Envelope body */}
        <mesh>
          <boxGeometry args={[1.0, 0.65, 0.04]} />
          <meshStandardMaterial color={envelopeColor} roughness={0.7} />
        </mesh>
        
        {/* Envelope flap (top triangle) */}
        <mesh position={[0, 0.32, 0.02]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.5, 0.35, 4]} />
          <meshStandardMaterial color={envelopeDark} roughness={0.7} />
        </mesh>
        
        {/* Heart seal */}
        <mesh position={[0, 0.05, 0.04]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={heartColor} roughness={0.4} emissive={heartColor} emissiveIntensity={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// Loading fallback
function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#C4A484" />
    </mesh>
  );
}

// Main 3D Scene
export function TeddyScene({ onTeddyClick }) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.5], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={<Loader />}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-3, 3, 2]} intensity={0.4} color="#FFE4C4" />
        <pointLight position={[0, 2, 3]} intensity={0.3} color="#FFF5EE" />
        
        {/* The 3D Teddy Bear */}
        <TeddyBear onClick={onTeddyClick} />
      </Suspense>
    </Canvas>
  );
}

export default TeddyScene;
