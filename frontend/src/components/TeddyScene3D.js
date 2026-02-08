import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

export function TeddyScene3D({ onTeddyClick }) {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const cleanupRef = useRef(null);

  const onClickRef = useRef(onTeddyClick);
  onClickRef.current = onTeddyClick;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId;
    let renderer;
    let scene;
    let camera;
    let teddyGroup;
    let envelopeGroup;

    const init = () => {
      // Check container has size
      if (container.clientWidth === 0 || container.clientHeight === 0) {
        animationId = requestAnimationFrame(init);
        return;
      }

      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0.8, 5.8);
      camera.lookAt(0, 0.5, 0);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      
      const dirLight1 = new THREE.DirectionalLight(0xffffff, 1);
      dirLight1.position.set(5, 5, 5);
      scene.add(dirLight1);
      
      const dirLight2 = new THREE.DirectionalLight(0xFFE4C4, 0.4);
      dirLight2.position.set(-3, 3, 2);
      scene.add(dirLight2);
      
      const pointLight = new THREE.PointLight(0xFFF5EE, 0.3);
      pointLight.position.set(0, 2, 3);
      scene.add(pointLight);

      // Materials
      const furMat = new THREE.MeshStandardMaterial({ color: 0xC4A484, roughness: 0.9 });
      const furDarkMat = new THREE.MeshStandardMaterial({ color: 0xA67B5B, roughness: 0.95 });
      const noseMat = new THREE.MeshStandardMaterial({ color: 0x3D2914, roughness: 0.3 });
      const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2 });
      const eyeHighMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.3 });
      const envMat = new THREE.MeshStandardMaterial({ color: 0xFFF8E7, roughness: 0.7 });
      const envDarkMat = new THREE.MeshStandardMaterial({ color: 0xE8D5C4, roughness: 0.7 });
      const heartMat = new THREE.MeshStandardMaterial({ color: 0xE74C3C, roughness: 0.4, emissive: 0xE74C3C, emissiveIntensity: 0.2 });

      // Teddy Bear
      teddyGroup = new THREE.Group();
      teddyGroup.position.y = -0.2;

      // Body
      const body = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), furMat);
      teddyGroup.add(body);
      
      // Belly
      const belly = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 32), furDarkMat);
      belly.position.set(0, 0, 0.85);
      teddyGroup.add(belly);

      // Head
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.75, 32, 32), furMat);
      head.position.set(0, 1.35, 0.3);
      teddyGroup.add(head);

      // Snout
      const snout = new THREE.Mesh(new THREE.SphereGeometry(0.32, 32, 32), furDarkMat);
      snout.position.set(0, 1.15, 0.95);
      teddyGroup.add(snout);

      // Nose
      const nose = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), noseMat);
      nose.position.set(0, 1.22, 1.22);
      teddyGroup.add(nose);

      // Ears
      const earGeo = new THREE.SphereGeometry(0.28, 16, 16);
      const earInGeo = new THREE.SphereGeometry(0.15, 16, 16);
      
      const leftEar = new THREE.Mesh(earGeo, furMat);
      leftEar.position.set(-0.55, 1.95, 0.15);
      teddyGroup.add(leftEar);
      const leftEarIn = new THREE.Mesh(earInGeo, furDarkMat);
      leftEarIn.position.set(-0.55, 1.95, 0.25);
      teddyGroup.add(leftEarIn);
      
      const rightEar = new THREE.Mesh(earGeo, furMat);
      rightEar.position.set(0.55, 1.95, 0.15);
      teddyGroup.add(rightEar);
      const rightEarIn = new THREE.Mesh(earInGeo, furDarkMat);
      rightEarIn.position.set(0.55, 1.95, 0.25);
      teddyGroup.add(rightEarIn);

      // Eyes
      const eyeGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const eyeHighGeo = new THREE.SphereGeometry(0.04, 16, 16);
      
      const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
      leftEye.position.set(-0.25, 1.45, 0.85);
      teddyGroup.add(leftEye);
      const leftEyeHigh = new THREE.Mesh(eyeHighGeo, eyeHighMat);
      leftEyeHigh.position.set(-0.22, 1.48, 0.95);
      teddyGroup.add(leftEyeHigh);
      
      const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
      rightEye.position.set(0.25, 1.45, 0.85);
      teddyGroup.add(rightEye);
      const rightEyeHigh = new THREE.Mesh(eyeHighGeo, eyeHighMat);
      rightEyeHigh.position.set(0.28, 1.48, 0.95);
      teddyGroup.add(rightEyeHigh);

      // Arms
      const armGeo = new THREE.CapsuleGeometry(0.22, 0.5, 8, 16);
      const leftArm = new THREE.Mesh(armGeo, furMat);
      leftArm.position.set(-0.95, 0.3, 0.4);
      leftArm.rotation.set(0.4, 0.3, 0.6);
      teddyGroup.add(leftArm);
      const rightArm = new THREE.Mesh(armGeo, furMat);
      rightArm.position.set(0.95, 0.3, 0.4);
      rightArm.rotation.set(0.4, -0.3, -0.6);
      teddyGroup.add(rightArm);

      // Legs
      const legGeo = new THREE.CapsuleGeometry(0.28, 0.35, 8, 16);
      const footGeo = new THREE.SphereGeometry(0.2, 16, 16);
      
      const leftLeg = new THREE.Mesh(legGeo, furMat);
      leftLeg.position.set(-0.45, -0.9, 0.3);
      teddyGroup.add(leftLeg);
      const leftFoot = new THREE.Mesh(footGeo, furDarkMat);
      leftFoot.position.set(-0.45, -1.1, 0.5);
      teddyGroup.add(leftFoot);
      
      const rightLeg = new THREE.Mesh(legGeo, furMat);
      rightLeg.position.set(0.45, -0.9, 0.3);
      teddyGroup.add(rightLeg);
      const rightFoot = new THREE.Mesh(footGeo, furDarkMat);
      rightFoot.position.set(0.45, -1.1, 0.5);
      teddyGroup.add(rightFoot);

      // Envelope
      envelopeGroup = new THREE.Group();
      envelopeGroup.position.set(0, -0.3, 1.3);
      
      const envBody = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.6, 0.04), envMat);
      envelopeGroup.add(envBody);
      
      const envFlap = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.32, 4), envDarkMat);
      envFlap.position.set(0, 0.3, 0.02);
      envFlap.rotation.z = Math.PI;
      envelopeGroup.add(envFlap);
      
      const heartSeal = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), heartMat);
      heartSeal.position.set(0, 0.03, 0.04);
      envelopeGroup.add(heartSeal);
      
      teddyGroup.add(envelopeGroup);
      scene.add(teddyGroup);

      // Animation
      const clock = new THREE.Clock();
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        
        teddyGroup.position.y = -0.2 + Math.sin(t * 0.8) * 0.08;
        teddyGroup.rotation.z = Math.sin(t * 0.5) * 0.03;
        envelopeGroup.rotation.z = Math.sin(t * 1.2) * 0.05;
        envelopeGroup.position.y = -0.3 + Math.sin(t * 1.5) * 0.02;
        
        renderer.render(scene, camera);
      };
      animate();
      setIsLoaded(true);

      // Click handler
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      
      const handleClick = (e) => {
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        if (raycaster.intersectObjects(teddyGroup.children, true).length > 0) {
          onClickRef.current?.();
        }
      };
      container.addEventListener('click', handleClick);

      // Resize
      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      // Store cleanup
      cleanupRef.current = () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('click', handleClick);
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    };

    init();

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full cursor-pointer"
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s' }}
    />
  );
}

export default TeddyScene3D;
