'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sphere, MeshDistortMaterial, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingOrb() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <Float
            speed={2} // Animation speed, defaults to 1
            rotationIntensity={1} // XYZ rotation intensity, defaults to 1
            floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[-0.2, 0.2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
            {/* Reduced segments for performance */}
            <Sphere args={[1, 48, 48]} ref={meshRef} scale={1.8}>
                <MeshDistortMaterial
                    color="#ffffff"
                    envMapIntensity={1.5} // Brighter holographic effect
                    clearcoat={1}
                    clearcoatRoughness={0}
                    metalness={0.4} // Increased metalness for more reflection
                    roughness={0}
                    distort={0.4}
                    speed={2}
                />
            </Sphere>
            {/* Reflective Floor - Optimized */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
                <planeGeometry args={[50, 50]} />
                <MeshReflectorMaterial
                    blur={[400, 100]}
                    resolution={512} // Drastically reduced for performance (was 2048)
                    mixBlur={1}
                    mixStrength={15}
                    roughness={1}
                    depthScale={1}
                    minDepthThreshold={0.5}
                    maxDepthThreshold={1.4}
                    color="#050505"
                    metalness={0.5}
                    mirror={1} // Mirror 1 = 100%
                />
            </mesh>
        </Float>
    );
}

export default function Orb() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full">
            {/* Moved camera back to 8 to zoom out */}
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: false, powerPreference: "high-performance" }} dpr={[1, 1.5]}>
                <Environment preset="city" />
                <ambientLight intensity={0.8} />
                {/* Stronger, more colorful lights */}
                <pointLight position={[10, 10, 10]} intensity={2} color="#c026d3" /> {/* Strong Purple */}
                <pointLight position={[-10, 5, 8]} intensity={2} color="#06b6d4" /> {/* Strong Cyan */}
                <pointLight position={[0, -8, 5]} intensity={1.5} color="#db2777" /> {/* Pink */}
                <FloatingOrb />
            </Canvas>
        </div>
    );
}
