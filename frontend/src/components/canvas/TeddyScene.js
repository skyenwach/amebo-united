import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// Teddy Bear built with primitives
const TeddyBear = ({ onClick }) => {
  const groupRef = useRef();
  const envelopeRef = useRef();
  
  // Teddy color
  const teddyColor = '#D7B59C';
  const darkTeddyColor = '#B8956E';
  const envelopeColor = '#FFFDD0';
  const envelopeFlapColor = '#FFE4B5';
  
  // Breathing animation
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.05;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;
    }
    if (envelopeRef.current) {
      const t = state.clock.elapsedTime;
      envelopeRef.current.position.y = Math.sin(t * 1.2) * 0.03 + 0.1;
    }
  });

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Body */}
      <mesh position={[0, -0.3, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color={teddyColor} roughness={1} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color={teddyColor} roughness={1} />
      </mesh>
      
      {/* Snout */}
      <mesh position={[0, 0.45, 0.4]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color={darkTeddyColor} roughness={1} />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 0.5, 0.58]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#4A4A4A" roughness={0.3} />
      </mesh>
      
      {/* Left Ear */}
      <mesh position={[-0.4, 1.0, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={teddyColor} roughness={1} />
      </mesh>
      <mesh position={[-0.4, 1.0, 0.05]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={darkTeddyColor} roughness={1} />
      </mesh>
      
      {/* Right Ear */}
      <mesh position={[0.4, 1.0, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={teddyColor} roughness={1} />
      </mesh>
      <mesh position={[0.4, 1.0, 0.05]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={darkTeddyColor} roughness={1} />
      </mesh>
      
      {/* Left Eye */}
      <mesh position={[-0.18, 0.7, 0.42]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#2D2D2D" roughness={0.2} />
      </mesh>
      <mesh position={[-0.16, 0.72, 0.48]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
      </mesh>
      
      {/* Right Eye */}
      <mesh position={[0.18, 0.7, 0.42]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#2D2D2D" roughness={0.2} />
      </mesh>
      <mesh position={[0.2, 0.72, 0.48]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
      </mesh>
      
      {/* Left Arm */}
      <mesh position={[-0.65, -0.1, 0.3]} rotation={[0.3, 0, 0.5]}>
        <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
        <meshStandardMaterial color={teddyColor} roughness={1} />
      </mesh>
      
      {/* Right Arm */}
      <mesh position={[0.65, -0.1, 0.3]} rotation={[0.3, 0, -0.5]}>
        <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
        <meshStandardMaterial color={teddyColor} roughness={1} />
      </mesh>
      
      {/* Left Leg */}
      <mesh position={[-0.3, -0.95, 0.1]}>
        <capsuleGeometry args={[0.18, 0.3, 8, 16]} />
        <meshStandardMaterial color={teddyColor} roughness={1} />
      </mesh>
      
      {/* Right Leg */}
      <mesh position={[0.3, -0.95, 0.1]}>
        <capsuleGeometry args={[0.18, 0.3, 8, 16]} />
        <meshStandardMaterial color={teddyColor} roughness={1} />
      </mesh>
      
      {/* Envelope in arms */}
      <group ref={envelopeRef} position={[0, -0.15, 0.65]}>
        {/* Envelope body */}
        <mesh>
          <boxGeometry args={[0.7, 0.45, 0.02]} />
          <meshStandardMaterial color={envelopeColor} roughness={0.8} />
        </mesh>
        
        {/* Envelope flap (triangle) */}
        <mesh position={[0, 0.22, 0.01]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.35, 0.25, 4]} />
          <meshStandardMaterial color={envelopeFlapColor} roughness={0.8} />
        </mesh>
        
        {/* Heart seal */}
        <mesh position={[0, 0.05, 0.02]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};

// Floating hearts in 3D - simple version
const FloatingHeart = ({ position, scale, rotationSpeed }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(t * rotationSpeed) * 0.3;
      meshRef.current.rotation.z = Math.sin(t * rotationSpeed * 0.5) * 0.2;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial 
        color="#FFD1DC" 
        transparent 
        opacity={0.4}
        roughness={1}
      />
    </mesh>
  );
};

const FloatingHearts3D = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        -2 - Math.random() * 3
      ],
      scale: 0.05 + Math.random() * 0.1,
      rotationSpeed: 0.5 + Math.random() * 0.5
    }));
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <FloatingHeart
          key={heart.id}
          position={heart.position}
          scale={heart.scale}
          rotationSpeed={heart.rotationSpeed}
        />
      ))}
    </>
  );
};

export const TeddyScene = ({ onTeddyClick, reducedMotion = false }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
        <directionalLight position={[-5, 3, 3]} intensity={0.4} color="#FFD1DC" />
        <pointLight position={[0, 2, 2]} intensity={0.3} color="#FFFDD0" />
        
        {!reducedMotion && <FloatingHearts3D />}
        
        <TeddyBear onClick={onTeddyClick} />
      </Suspense>
    </Canvas>
  );
};

export default TeddyScene;
