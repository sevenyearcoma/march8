"use client";

import dynamic from "next/dynamic";
import { Loader, useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";

const Experience = dynamic(
  () => import("./components/Experience").then((mod) => mod.Experience),
  { ssr: false }
);

export default function Home() {
  const { active, progress } = useProgress();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) {
      setHasStarted(true);
    }
  }, [active, progress]);

  return (
    <main>
      <Experience />
      {!hasStarted && (
        <Loader
          containerStyles={{ background: '#fdf2f2' }}
          innerStyles={{ background: '#fdf2f2', width: '300px' }}
          barStyles={{ background: '#b25d5d', height: '4px' }}
          dataStyles={{ color: '#b25d5d', fontFamily: 'inherit', fontSize: '18px', fontWeight: '500' }}
          dataInterpolation={(p) => `Загружается: ${p.toFixed(0)}%`}
        />
      )}
    </main>
  );
}
