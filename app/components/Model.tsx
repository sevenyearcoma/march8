import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useScroll } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
    url: string;
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    scrollPageStart: number;
    scrollPageEnd: number;
    floatSpeed?: number;
    floatAmplitude?: number;
    index: number;
    mobileZ?: number; // Optional Z-position override for mobile screens
}

export function Model({
    url,
    position,
    rotation = [0, 0, 0],
    scale = 1,
    scrollPageStart,
    scrollPageEnd,
    floatSpeed = 1.5,
    floatAmplitude = 0.2,
    index,
    mobileZ,
}: ModelProps) {
    const { scene } = useGLTF(url, "https://www.gstatic.com/draco/versioned/decoders/1.5.5/");
    const group = useRef<THREE.Group>(null);
    const scroll = useScroll();
    const { viewport } = useThree();

    // Calculate dynamic Y position based on viewport
    // use 4.65 as average spacing to match the modelsData distribution and avoid drift
    const customOffsetY = position[1] - (-4.65 * index);

    const isMobile = viewport.aspect < 1;
    // Shift model up on mobile to avoid overlap with text, but keep it within viewport
    const mobileYOffset = viewport.height * 0.2;
    const actualY = isMobile
        ? -index * viewport.height + customOffsetY + mobileYOffset
        : -index * viewport.height + customOffsetY;

    // Determine actual Z position, overriding with mobileZ if provided and on a mobile screen
    const actualZ = (isMobile && mobileZ !== undefined) ? mobileZ : position[2];

    // Make models slightly smaller on mobile to avoid overlap with cards
    const responsiveScale = isMobile ? scale * 0.8 : scale;

    useFrame((state) => {
        if (!group.current) return;

        // Smooth continuous floating
        const t = state.clock.getElapsedTime();
        group.current.position.y = actualY + Math.sin(t * floatSpeed) * floatAmplitude;
        group.current.position.x = position[0];
        group.current.position.z = actualZ;

        // Scroll-based rotation
        const r1 = scroll.range(scrollPageStart, scrollPageEnd - scrollPageStart);
        group.current.rotation.y = rotation[1] + r1 * Math.PI * 2;
        group.current.rotation.x = rotation[0] + r1 * Math.PI * 0.5;
    });

    return (
        <group ref={group} position={position} rotation={rotation} scale={responsiveScale}>
            <primitive object={scene} />
        </group>
    );
}
