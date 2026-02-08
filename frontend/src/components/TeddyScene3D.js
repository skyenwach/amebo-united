import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function TeddyScene3D({ onTeddyClick }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Wait for container to have size
    const initScene = () => {
      const container = containerRef.current;
      if (!container || container.clientWidth === 0 || container.clientHeight === 0) {
        requestAnimationFrame(initScene);
        return;
      }

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.8, 5.8);
    camera.lookAt(0, 0.5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xFFE4C4, 0.4);
    directionalLight2.position.set(-3, 3, 2);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xFFF5EE, 0.3);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    // Materials
    const furMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xC4A484, 
      roughness: 0.9 
    });
    const furDarkMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xA67B5B, 
      roughness: 0.95 
    });
    const noseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3D2914, 
      roughness: 0.3 
    });
    const eyeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a, 
      roughness: 0.2 
    });
    const eyeHighlightMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      roughness: 0.1,
      emissive: 0xffffff,
      emissiveIntensity: 0.3
    });
    const envelopeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFF8E7, 
      roughness: 0.7 
    });
    const envelopeDarkMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xE8D5C4, 
      roughness: 0.7 
    });
    const heartMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xE74C3C, 
      roughness: 0.4,
      emissive: 0xE74C3C,
      emissiveIntensity: 0.2
    });

    // Teddy Bear Group
    const teddyGroup = new THREE.Group();
    teddyGroup.position.y = -0.2;

    // Body
    const bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
    const body = new THREE.Mesh(bodyGeometry, furMaterial);
    teddyGroup.add(body);

    // Belly patch
    const bellyGeometry = new THREE.SphereGeometry(0.55, 32, 32);
    const belly = new THREE.Mesh(bellyGeometry, furDarkMaterial);
    belly.position.set(0, 0, 0.85);
    teddyGroup.add(belly);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.75, 32, 32);
    const head = new THREE.Mesh(headGeometry, furMaterial);
    head.position.set(0, 1.35, 0.3);
    teddyGroup.add(head);

    // Snout
    const snoutGeometry = new THREE.SphereGeometry(0.32, 32, 32);
    const snout = new THREE.Mesh(snoutGeometry, furDarkMaterial);
    snout.position.set(0, 1.15, 0.95);
    teddyGroup.add(snout);

    // Nose
    const noseGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 1.22, 1.22);
    teddyGroup.add(nose);

    // Ears
    const earGeometry = new THREE.SphereGeometry(0.28, 16, 16);
    const earInnerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    
    const leftEar = new THREE.Mesh(earGeometry, furMaterial);
    leftEar.position.set(-0.55, 1.95, 0.15);
    teddyGroup.add(leftEar);
    
    const leftEarInner = new THREE.Mesh(earInnerGeometry, furDarkMaterial);
    leftEarInner.position.set(-0.55, 1.95, 0.25);
    teddyGroup.add(leftEarInner);
    
    const rightEar = new THREE.Mesh(earGeometry, furMaterial);
    rightEar.position.set(0.55, 1.95, 0.15);
    teddyGroup.add(rightEar);
    
    const rightEarInner = new THREE.Mesh(earInnerGeometry, furDarkMaterial);
    rightEarInner.position.set(0.55, 1.95, 0.25);
    teddyGroup.add(rightEarInner);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const eyeHighlightGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.25, 1.45, 0.85);
    teddyGroup.add(leftEye);
    
    const leftEyeHighlight = new THREE.Mesh(eyeHighlightGeometry, eyeHighlightMaterial);
    leftEyeHighlight.position.set(-0.22, 1.48, 0.95);
    teddyGroup.add(leftEyeHighlight);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.25, 1.45, 0.85);
    teddyGroup.add(rightEye);
    
    const rightEyeHighlight = new THREE.Mesh(eyeHighlightGeometry, eyeHighlightMaterial);
    rightEyeHighlight.position.set(0.28, 1.48, 0.95);
    teddyGroup.add(rightEyeHighlight);

    // Arms
    const armGeometry = new THREE.CapsuleGeometry(0.22, 0.5, 8, 16);
    
    const leftArm = new THREE.Mesh(armGeometry, furMaterial);
    leftArm.position.set(-0.95, 0.3, 0.4);
    leftArm.rotation.set(0.4, 0.3, 0.6);
    teddyGroup.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, furMaterial);
    rightArm.position.set(0.95, 0.3, 0.4);
    rightArm.rotation.set(0.4, -0.3, -0.6);
    teddyGroup.add(rightArm);

    // Legs
    const legGeometry = new THREE.CapsuleGeometry(0.28, 0.35, 8, 16);
    const footGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    
    const leftLeg = new THREE.Mesh(legGeometry, furMaterial);
    leftLeg.position.set(-0.45, -0.9, 0.3);
    teddyGroup.add(leftLeg);
    
    const leftFoot = new THREE.Mesh(footGeometry, furDarkMaterial);
    leftFoot.position.set(-0.45, -1.1, 0.5);
    teddyGroup.add(leftFoot);
    
    const rightLeg = new THREE.Mesh(legGeometry, furMaterial);
    rightLeg.position.set(0.45, -0.9, 0.3);
    teddyGroup.add(rightLeg);
    
    const rightFoot = new THREE.Mesh(footGeometry, furDarkMaterial);
    rightFoot.position.set(0.45, -1.1, 0.5);
    teddyGroup.add(rightFoot);

    // Envelope Group
    const envelopeGroup = new THREE.Group();
    envelopeGroup.position.set(0, -0.3, 1.3);
    
    const envelopeBodyGeometry = new THREE.BoxGeometry(0.9, 0.6, 0.04);
    const envelopeBody = new THREE.Mesh(envelopeBodyGeometry, envelopeMaterial);
    envelopeGroup.add(envelopeBody);
    
    const envelopeFlapGeometry = new THREE.ConeGeometry(0.45, 0.32, 4);
    const envelopeFlap = new THREE.Mesh(envelopeFlapGeometry, envelopeDarkMaterial);
    envelopeFlap.position.set(0, 0.3, 0.02);
    envelopeFlap.rotation.set(0, 0, Math.PI);
    envelopeGroup.add(envelopeFlap);
    
    const heartSealGeometry = new THREE.SphereGeometry(0.09, 16, 16);
    const heartSeal = new THREE.Mesh(heartSealGeometry, heartMaterial);
    heartSeal.position.set(0, 0.03, 0.04);
    envelopeGroup.add(heartSeal);
    
    teddyGroup.add(envelopeGroup);
    scene.add(teddyGroup);

    // Animation
    let animationId;
    const clock = new THREE.Clock();
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      
      // Breathing animation
      teddyGroup.position.y = -0.2 + Math.sin(t * 0.8) * 0.08;
      teddyGroup.rotation.z = Math.sin(t * 0.5) * 0.03;
      
      // Envelope animation
      envelopeGroup.rotation.z = Math.sin(t * 1.2) * 0.05;
      envelopeGroup.position.y = 0.1 + Math.sin(t * 1.5) * 0.02;
      
      renderer.render(scene, camera);
    };
    
    animate();
    setIsLoaded(true);

    // Click handler
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const handleClick = (event) => {
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(teddyGroup.children, true);
      
      if (intersects.length > 0) {
        onTeddyClick?.();
      }
    };
    
    containerRef.current.addEventListener('click', handleClick);

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('click', handleClick);
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onTeddyClick]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full cursor-pointer"
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s' }}
    />
  );
}

export default TeddyScene3D;
