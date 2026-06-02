// @ts-nocheck
/// <reference types="@react-three/fiber" />
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import { BiomechanicalAvatar } from './BiomechanicalAvatar';
import { PoseData } from '@formiq/types';

export interface AvatarStageProps {
  modelUrl?: string;
  pose?: PoseData | null;
  formFlags?: Record<string, boolean>;
}

export const AvatarStage: React.FC<AvatarStageProps> = ({ 
  modelUrl = '/models/Soldier.glb',
  pose,
  formFlags
}) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 10 }}>
      <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[-5, 5, 5]} castShadow intensity={1} />
        
        <Suspense fallback={null}>
          <BiomechanicalAvatar modelUrl={modelUrl} pose={pose} formFlags={formFlags} />
          <Environment preset="city" />
          <ContactShadows opacity={0.4} scale={10} blur={2} far={4} />
        </Suspense>
        
        {/* Orbit controls for debugging viewing angles */}
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
};
