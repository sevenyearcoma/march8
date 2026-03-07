"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Float, Preload, Sparkles, useGLTF } from "@react-three/drei";
import { Model } from "./Model";
import styles from "../page.module.css";

const modelsData = [
    {
        url: "/models/heart.glb",
        position: [0, -1.5, 0],
        scale: 0.8,
        rotation: [0.1, 0.2, -0.1],
        heading: "с 8 марта",
        text: "наши дорогие девочки от всей души поздравляем вас!",
    },
    {
        url: "/models/sakura-flower.glb",
        position: [1.5, -5, -2],
        scale: 2.5,
        rotation: [0.2, 0.5, 0.15],
        heading: "приглашение",
        text: "мы хотим пригласить вас на наш праздник восьмого марта (восьмиклассное марта)",
    },
    {
        url: "/models/giftbox.glb",
        position: [-1.2, -11, -1],
        scale: 0.7,
        rotation: [0.15, -0.6, 0.25],
        heading: "подарки",
        text: "мы подготовили для вас подарочки исходя из ваших поделаний, поэтому вам точно понравится",
    },
    {
        url: "/models/cute_mocha_cat_3.glb",
        position: [1.2, -15, 0],
        scale: 0.7,
        rotation: [0.05, -0.8, 0.1],
        heading: "где и когда?",
        text: "праздник пройдет в 18:00 у Андрея дома по адресу Толе би 273А/5A, кв. 198, обязательно приходите (лучше вовремя)",
    },
    {
        url: "/models/shiba_inu.glb",
        position: [-1.2, -21, 0],
        scale: 8,
        rotation: [0.05, 0.6, -0.05],
        heading: "отличная компания",
        text: "соберемся восьмяшами и будем общаться и смеяться (опционально)",
    },
    {
        url: "/models/cute_milkshake.glb",
        position: [1.5, -26, -1],
        scale: 0.6,
        rotation: [0.15, -0.3, 0.1],
        heading: "вкусности",
        text: "мы закажем много разных вкусностей, чтобы порадовать вас и нас",
    },
    {
        url: "/models/sushi_set.glb",
        position: [-1.5, -30, -1],
        scale: 0.2,
        rotation: [0.3, 0.7, 0.25],
        heading: "суши сет",
        text: "пока не выбрали чо кушать, но было бы круто если бы суши поели",
    },
    {
        url: "/models/board_game_boxes.glb",
        position: [1.2, -35, 0],
        scale: 0.6,
        rotation: [0.1, -0.6, 0.1],
        heading: "настолки",
        text: "а еще мы будем играть в интересные и веселые настолки (если принесете)",
    },
    {
        url: "/models/playing_cards.glb",
        position: [-2, -40, 0],
        scale: 0.6,
        rotation: [0.4, 0.6, -0.25],
        heading: "круто проведем время",
        text: "будет очень весело, расслабленно и душевно",
    },
    {
        url: "/models/sushi-roll.glb",
        position: [0, -28, 0],
        scale: 1.2,
        rotation: [0.6, 0.4, -0.15],
        heading: "очень ждем вас!",
        text: "до встречи на празднике! ждем с нетерпением!",
    }
] as const;

const BackgroundBubbles = () => {
    return (
        <>
            {Array.from({ length: 40 }).map((_, i) => (
                <Float
                    key={i}
                    speed={1 + Math.random()}
                    rotationIntensity={1}
                    floatIntensity={2}
                    position={[
                        (Math.random() - 0.5) * 30, // Spread wider in X
                        Math.random() * -50 + 10,   // Spread along Y scroll from Top to Bottom
                        (Math.random() - 0.5) * 15 - 5 // Spread in Z (depth)
                    ]}
                >
                    <mesh>
                        <sphereGeometry args={[Math.random() * 0.4 + 0.1, 16, 16]} />
                        <meshStandardMaterial
                            color={Math.random() > 0.5 ? '#f4dada' : '#d49a9a'}
                            transparent
                            opacity={0.6}
                            roughness={0.2}
                        />
                    </mesh>
                </Float>
            ))}
        </>
    );
};

const FallingPetals = () => {
    return (
        <>
            {Array.from({ length: 60 }).map((_, i) => (
                <Float
                    key={`petal-${i}`}
                    speed={2 + Math.random() * 2} // Faster falling speed
                    rotationIntensity={2.5}
                    floatIntensity={2}
                    position={[
                        (Math.random() - 0.5) * 30, // Spread wider in X
                        Math.random() * -60 + 15,   // Spread along Y scroll
                        (Math.random() - 0.5) * 15 - 5 // Spread in Z (depth)
                    ]}
                >
                    <mesh scale={[1, 1.2, 0.1]} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                        {/* Squashed sphere for petal look */}
                        <sphereGeometry args={[Math.random() * 0.15 + 0.1, 16, 16]} />
                        <meshStandardMaterial
                            color={Math.random() > 0.5 ? '#ffb6c1' : '#ffc0cb'} // Pinkish petal colors
                            transparent
                            opacity={0.85}
                            roughness={0.3}
                        />
                    </mesh>
                </Float>
            ))}
        </>
    );
};

export function Experience() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
            }}
        >
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} />

            <BackgroundBubbles />
            <FallingPetals />

            <Sparkles count={150} scale={12} size={3} speed={0.4} opacity={0.4} color="#f4dada" />
            <Sparkles count={50} scale={12} size={5} speed={0.2} opacity={0.2} color="#b25d5d" />

            <Suspense fallback={null}>
                <ScrollControls pages={10} damping={0.25}>
                    <Scroll>
                        {modelsData.map((data, index) => (
                            <Model
                                key={index}
                                index={index}
                                url={data.url}
                                position={data.position as [number, number, number]}
                                scale={data.scale}
                                rotation={data.rotation as [number, number, number]}
                                scrollPageStart={index === 0 ? 0 : index - 0.5}
                                scrollPageEnd={index + 1}
                            />
                        ))}
                    </Scroll>

                    <Scroll html style={{ width: "100%", height: "100%" }}>
                        <div className={styles.htmlContainer}>
                            {modelsData.map((data, index) => {
                                let sectionClass = styles.section;
                                let cardClass = "";

                                if (index === 0) {
                                    sectionClass = styles.section;
                                    cardClass = "";
                                } else if (index === modelsData.length - 1) {
                                    sectionClass = styles.sectionCenter;
                                    cardClass = styles.cardMain;
                                } else {
                                    sectionClass = index % 2 === 1 ? styles.sectionLeft : styles.sectionRight;
                                    cardClass = styles.card;
                                }

                                return (
                                    <section key={index} className={sectionClass}>
                                        <div className={cardClass || undefined}>
                                            {index === 0 || index === modelsData.length - 1 ? (
                                                <>
                                                    <h1 className={styles.heading}>{data.heading}</h1>
                                                    <p className={styles.subtext}>{data.text}</p>
                                                </>
                                            ) : (
                                                <>
                                                    <h2 className={styles.cardHeading}>{data.heading}</h2>
                                                    <p className={styles.cardText}>{data.text}</p>
                                                </>
                                            )}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                    </Scroll>
                </ScrollControls>
                <Preload all />
            </Suspense>
        </Canvas>
    );
}

modelsData.forEach((data) => {
    useGLTF.preload(data.url);
});

