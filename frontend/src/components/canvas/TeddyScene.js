import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Html } from '@react-three/drei';

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
    <group ref={groupRef} onClick={onClick} style={{ cursor: 'pointer' }}>
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
        
        {/* Click me text */}
        <Text
          position={[0, -0.05, 0.03]}
          fontSize={0.08}
          color="#5D4037"
          font="https://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSo3Sup6hNX6plRP.woff"
          anchorX="center"
          anchorY="middle"
        >
          Click me
        </Text>
      </group>
    </group>
  );
};

// Floating hearts in 3D
const FloatingHearts3D = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        -2 - Math.random() * 3
      ],
      scale: 0.05 + Math.random() * 0.1,
      speed: 0.5 + Math.random() * 0.5
    }));
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <Float
          key={heart.id}
          speed={heart.speed}
          rotationIntensity={0.5}
          floatIntensity={1}
          position={heart.position}
        >
          <mesh scale={heart.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial 
              color="#FFD1DC" 
              transparent 
              opacity={0.4}
              roughness={1}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

export const TeddyScene = ({ onTeddyClick, reducedMotion = false }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ background: 'transparent' }}
      aria-label="3D teddy bear holding an envelope"
      role="img"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, 3]} intensity={0.3} color="#FFD1DC" />
      
      {!reducedMotion && <FloatingHearts3D />}
      
      <TeddyBear onClick={onTeddyClick} />
      
      <Environment preset="apartment" />
    </Canvas>
  );
};

export default TeddyScene;
