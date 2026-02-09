import React, { useRef, useMemo, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

// Improved Teddy Bear with wink animation
const TeddyBear = ({ onClick, onWink }) => {
  const groupRef = useRef();
  const envelopeRef = useRef();
  const leftEyelidRef = useRef();
  const rightEyelidRef = useRef();
  const [isWinking, setIsWinking] = useState(false);
  const [hoveringEnvelope, setHoveringEnvelope] = useState(false);

  // Teddy color - warm, fuzzy tones
  const teddyColor = "#D4A574";
  const darkTeddyColor = "#A67C52";
  const envelopeColor = "#FFFDD0";
  const envelopeFlapColor = "#FFE4B5";
  const footPadColor = "#8B6F47";

  // Combined animation logic
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      // Gentle bobbing breathing animation
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;
    }

    // Envelope floating and glowing effect
    if (envelopeRef.current) {
      const t = state.clock.elapsedTime;
      envelopeRef.current.position.y = Math.sin(t * 1.2) * 0.04 + 0.15;
      // Subtle rotation on hover
      if (hoveringEnvelope) {
        envelopeRef.current.rotation.z = Math.sin(t * 2) * 0.05;
      } else {
        envelopeRef.current.rotation.z = Math.sin(t * 0.8) * 0.02;
      }
    }

    // Wink animation
    if (isWinking && leftEyelidRef.current && rightEyelidRef.current) {
      const t = state.clock.elapsedTime;
      const winkCycle = (t * 3) % 1; // Wink cycle

      if (winkCycle < 0.3) {
        // Closing
        const closeFraction = winkCycle / 0.3;
        leftEyelidRef.current.position.y = -0.08 * closeFraction;
        rightEyelidRef.current.position.y = 0.08 * closeFraction;
      } else if (winkCycle < 0.7) {
        // Fully closed
        leftEyelidRef.current.position.y = -0.08;
        rightEyelidRef.current.position.y = 0.08;
      } else {
        // Opening
        const openFraction = 1 - (winkCycle - 0.7) / 0.3;
        leftEyelidRef.current.position.y = -0.08 * openFraction;
        rightEyelidRef.current.position.y = 0.08 * openFraction;
      }
    }
  });

  const handleEnvelopeClick = (e) => {
    e.stopPropagation();
    setIsWinking(true);
    if (onWink) onWink();
    setTimeout(() => onClick?.(), 400);
  };

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Body - larger and more proportional */}
      <mesh position={[0, -0.35, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={teddyColor}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Body pads (belly details) */}
      <mesh position={[0, -0.35, 0.5]}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial
          color={darkTeddyColor}
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshStandardMaterial
          color={teddyColor}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Snout - more pronounced */}
      <mesh position={[0, 0.42, 0.48]}>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshStandardMaterial
          color={darkTeddyColor}
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* Nose - larger and shinier */}
      <mesh position={[0, 0.52, 0.68]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#3D3D3D" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Left Ear */}
      <mesh position={[-0.45, 1.15, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={teddyColor} roughness={0.85} />
      </mesh>
      <mesh position={[-0.45, 1.15, 0.08]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={footPadColor} roughness={0.9} />
      </mesh>

      {/* Right Ear */}
      <mesh position={[0.45, 1.15, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={teddyColor} roughness={0.85} />
      </mesh>
      <mesh position={[0.45, 1.15, 0.08]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={footPadColor} roughness={0.9} />
      </mesh>

      {/* Left Eye */}
      <mesh position={[-0.22, 0.78, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#2D2D2D" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[-0.2, 0.8, 0.58]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>

      {/* Right Eye */}
      <mesh position={[0.22, 0.78, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#2D2D2D" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0.2, 0.8, 0.58]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>

      {/* Left Eyelid */}
      <mesh ref={leftEyelidRef} position={[-0.22, 0.88, 0.62]}>
        <boxGeometry args={[0.12, 0.08, 0.01]} />
        <meshStandardMaterial color={teddyColor} roughness={0.85} />
      </mesh>

      {/* Right Eyelid */}
      <mesh ref={rightEyelidRef} position={[0.22, 0.68, 0.62]}>
        <boxGeometry args={[0.12, 0.08, 0.01]} />
        <meshStandardMaterial color={teddyColor} roughness={0.85} />
      </mesh>

      {/* Left Arm - holding envelope posture */}
      <mesh position={[-0.75, 0.1, 0.4]} rotation={[0.4, 0.2, 0.6]}>
        <capsuleGeometry args={[0.17, 0.5, 8, 16]} />
        <meshStandardMaterial color={teddyColor} roughness={0.85} />
      </mesh>

      {/* Left Paw */}
      <mesh position={[-0.95, -0.15, 0.55]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={teddyColor} roughness={0.85} />
      </mesh>
      <mesh position={[-0.95, -0.15, 0.68]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color={footPadColor} roughness={0.9} />
      </mesh>

      {/* Right Arm - holding envelope posture */}
      <mesh position={[0.75, 0.1, 0.4]} rotation={[0.4, -0.2, -0.6]}>
        <capsuleGeometry args={[0.17, 0.5, 8, 16]} />
        <meshStandardMaterial color={teddyColor} roughness={0.85} />
      </mesh>

      {/* Right Paw */}
      <mesh position={[0.95, -0.15, 0.55]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={teddyColor} roughness={0.85} />
      </mesh>
      <mesh position={[0.95, -0.15, 0.68]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color={footPadColor} roughness={0.9} />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.35, -1.1, 0.2]}>
        <capsuleGeometry args={[0.2, 0.35, 8, 16]} />
        <meshStandardMaterial color={teddyColor} roughness={0.85} />
      </mesh>

      {/* Left Foot Pad */}
      <mesh position={[-0.35, -1.35, 0.4]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={footPadColor} roughness={0.9} />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.35, -1.1, 0.2]}>
        <capsuleGeometry args={[0.2, 0.35, 8, 16]} />
        <meshStandardMaterial color={teddyColor} roughness={0.85} />
      </mesh>

      {/* Right Foot Pad */}
      <mesh position={[0.35, -1.35, 0.4]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={footPadColor} roughness={0.9} />
      </mesh>

      {/* Interactive Envelope in arms */}
      <group
        ref={envelopeRef}
        position={[0, 0.0, 0.8]}
        onPointerEnter={() => setHoveringEnvelope(true)}
        onPointerLeave={() => setHoveringEnvelope(false)}
        onClick={handleEnvelopeClick}
        style={{ cursor: "pointer" }}
      >
        {/* Glow effect on hover */}
        {hoveringEnvelope && (
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[0.8, 0.55, 0.04]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.3}
              transparent
              opacity={0.3}
            />
          </mesh>
        )}

        {/* Envelope body */}
        <mesh>
          <boxGeometry args={[0.75, 0.5, 0.03]} />
          <meshStandardMaterial
            color={envelopeColor}
            roughness={0.7}
            metalness={0}
            emissive={hoveringEnvelope ? "#FFFACD" : "#000000"}
            emissiveIntensity={hoveringEnvelope ? 0.2 : 0}
          />
        </mesh>

        {/* Envelope flap */}
        <mesh position={[0, 0.25, 0.015]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.38, 0.28, 4]} />
          <meshStandardMaterial
            color={envelopeFlapColor}
            roughness={0.7}
            metalness={0}
          />
        </mesh>

        {/* Heart seal */}
        <mesh position={[0, 0.08, 0.025]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color="#FF6B6B"
            roughness={0.4}
            emissive="#FF6B6B"
            emissiveIntensity={hoveringEnvelope ? 0.3 : 0.1}
          />
        </mesh>

        {/* "click me" text on envelope */}
        <Text
          position={[0, -0.05, 0.04]}
          fontSize={0.15}
          color="#FF6B6B"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v28/GFDsqA8srg92pnMV4lHz2KzWcyta.woff"
        >
          click me
        </Text>
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
      meshRef.current.position.y =
        position[1] + Math.sin(t * rotationSpeed) * 0.3;
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
        -2 - Math.random() * 3,
      ],
      scale: 0.05 + Math.random() * 0.1,
      rotationSpeed: 0.5 + Math.random() * 0.5,
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

export const TeddyScene = ({ onTeddyClick, onWink, reducedMotion = false }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
        <directionalLight
          position={[-5, 3, 3]}
          intensity={0.4}
          color="#FFD1DC"
        />
        <pointLight position={[0, 2, 2]} intensity={0.3} color="#FFFDD0" />

        {!reducedMotion && <FloatingHearts3D />}

        <TeddyBear onClick={onTeddyClick} onWink={onWink} />
      </Suspense>
    </Canvas>
  );
};

export default TeddyScene;
