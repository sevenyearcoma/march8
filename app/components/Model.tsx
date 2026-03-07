import { useRef } from "react";
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
}: ModelProps) {
    const { scene } = useGLTF(url);
    const group = useRef<THREE.Group>(null);
    const scroll = useScroll();
    const { viewport } = useThree();

    // Calculate dynamic Y position based on viewport
    // preserve any custom offset the user had relative to the -5 grid
    const customOffsetY = position[1] - (-5 * index);

    const isMobile = viewport.aspect < 1;
    // Shift model up to top 20% of screen on mobile (offset 0.3 * height)
    const mobileYOffset = viewport.height * 0.3;
    const actualY = isMobile
        ? -index * viewport.height + customOffsetY + mobileYOffset
        : -index * viewport.height + customOffsetY;

    // Make models significantly smaller on mobile to avoid overlap
    const responsiveScale = isMobile ? scale * 1 : scale;

    useFrame((state) => {
        if (!group.current) return;

        // Smooth continuous floating
        const t = state.clock.getElapsedTime();
        group.current.position.y = actualY + Math.sin(t * floatSpeed) * floatAmplitude;
        group.current.position.x = position[0];
        group.current.position.z = position[2];

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
