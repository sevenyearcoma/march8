"use client";

import dynamic from "next/dynamic";
import { Loader } from "@react-three/drei";

const Experience = dynamic(
  () => import("./components/Experience").then((mod) => mod.Experience),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <Experience />
      <Loader
        containerStyles={{ background: '#fdf2f2' }}
        innerStyles={{ background: '#fdf2f2', width: '300px' }}
        barStyles={{ background: '#b25d5d', height: '4px' }}
        dataStyles={{ color: '#b25d5d', fontFamily: 'inherit', fontSize: '18px', fontWeight: '500' }}
        dataInterpolation={(p) => `Загружается: ${p.toFixed(0)}%`}
      />
    </main>
  );
}
