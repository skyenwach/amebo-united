import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Interactive 3D Bear with image texture
const InteractiveBear = ({ onHeartClick, bearImageUrl }) => {
  const meshRef = useRef();
  const [isHovering, setIsHovering] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  let texture;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    texture = useTexture(bearImageUrl);
  } catch (e) {
    console.warn("Could not load bear image:", e);
    texture = null;
  }

  // Handle mouse movement for rotation
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Calculate target rotation based on mouse position
      targetRotationRef.current.y = mouseRef.current.x * Math.PI * 0.3;
      targetRotationRef.current.x = mouseRef.current.y * Math.PI * 0.2;
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    gl.domElement.addEventListener("mousemove", handleMouseMove);
    gl.domElement.addEventListener("mouseenter", handleMouseEnter);
    gl.domElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
      gl.domElement.removeEventListener("mouseenter", handleMouseEnter);
      gl.domElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [gl.domElement]);

  // Smooth rotation animation
  useFrame(() => {
    if (meshRef.current) {
      if (isHovering) {
        meshRef.current.rotation.x +=
          (targetRotationRef.current.x - meshRef.current.rotation.x) * 0.1;
        meshRef.current.rotation.y +=
          (targetRotationRef.current.y - meshRef.current.rotation.y) * 0.1;
      } else {
        // Gentle auto-rotate when not hovering
        const t = Date.now() * 0.0003;
        meshRef.current.rotation.x +=
          (Math.sin(t * 0.5) * 0.05 - meshRef.current.rotation.x) * 0.05;
        meshRef.current.rotation.y +=
          (Math.sin(t) * 0.2 - meshRef.current.rotation.y) * 0.05;
      }

      // Gentle bob animation
      const t = Date.now() * 0.0005;
      meshRef.current.position.y = Math.sin(t) * 0.2;
    }
  });

  if (!texture) return null;

  return (
    <mesh
      ref={meshRef}
      onClick={onHeartClick}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
    >
      {/* Use a plane geometry for the bear image */}
      <planeGeometry args={[3, 4]} />
      <meshStandardMaterial
        map={texture}
        transparent={true}
        side={THREE.DoubleSide}
        roughness={0.7}
        metalness={0}
      />
    </mesh>
  );
};

// Heart clickable area component
const HeartHitbox = ({ onHeartClick }) => {
  const meshRef = useRef();
  const [isHoveringHeart, setIsHoveringHeart] = useState(false);

  return (
    <mesh
      ref={meshRef}
      position={[0.8, 0.3, 0.05]}
      onClick={(e) => {
        e.stopPropagation();
        onHeartClick();
      }}
      onPointerEnter={() => setIsHoveringHeart(true)}
      onPointerLeave={() => setIsHoveringHeart(false)}
      style={{ cursor: isHoveringHeart ? "pointer" : "grab" }}
    >
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial transparent={true} opacity={0} />
    </mesh>
  );
};

export const InteractiveBearScene = ({
  onHeartClick,
  reducedMotion = false,
  bearImageUrl = "/bear-heart.svg",
}) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 3, 3]} intensity={0.4} color="#FFD1DC" />
      <pointLight position={[0, 2, 2]} intensity={0.5} color="#FFFDD0" />

      {/* Interactive bear and heart */}
      <InteractiveBear
        onHeartClick={onHeartClick}
        bearImageUrl={bearImageUrl}
      />
      <HeartHitbox onHeartClick={onHeartClick} />
    </Canvas>
  );
};

export default InteractiveBearScene;
