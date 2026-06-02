// @ts-nocheck
/// <reference types="@react-three/fiber" />
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { PoseData } from '@formiq/types';

interface BiomechanicalAvatarProps {
  modelUrl: string;
  pose?: PoseData | null;
  formFlags?: Record<string, boolean>; // e.g., { 'spine': true } for red glow
}

export const BiomechanicalAvatar: React.FC<BiomechanicalAvatarProps> = ({ modelUrl, pose, formFlags = {} }) => {
  const { scene, nodes, materials } = useGLTF(modelUrl) as any;
  const groupRef = useRef<THREE.Group>(null);

  // Clone materials so we can mutate emissive colors per instance
  const clonedMaterials = useMemo(() => {
    const cloned: Record<string, THREE.Material> = {};
    Object.keys(materials).forEach((key) => {
      cloned[key] = materials[key].clone();
      if ('emissive' in cloned[key]) {
        (cloned[key] as THREE.MeshStandardMaterial).emissive = new THREE.Color(0x000000);
      }
    });
    return cloned;
  }, [materials]);

  // Apply materials to meshes
  useEffect(() => {
    if (!scene) return;
    scene.traverse((child: any) => {
      if (child.isMesh) {
        // Find corresponding cloned material
        const matName = child.material.name;
        if (clonedMaterials[matName]) {
          child.material = clonedMaterials[matName];
        }
      }
    });
  }, [scene, clonedMaterials]);

  // Handle Form Error Glows
  useFrame(() => {
    // Example: If form is bad, glow red
    Object.values(clonedMaterials).forEach((mat: any) => {
      if (mat.emissive) {
         // Reset
        mat.emissive.setHex(0x000000);
        
        // If there's a spine flag and this material belongs to the torso (simplification)
        if (formFlags['spine'] && mat.name.toLowerCase().includes('body')) {
          mat.emissive.setHex(0xff0000); // Red glow
          mat.emissiveIntensity = 0.5;
        }
      }
    });
  });

  // Handle MediaPipe Bone Mapping
  useFrame(() => {
    if (!pose || !nodes) return;

    // TODO: Map pose.landmarks to Mixamo nodes
    // Example skeleton mapping logic using SLERP would go here.
    // For now, we ensure the model loaded and can receive generic rotation updates.
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/models/Soldier.glb'); // Preload fallback
