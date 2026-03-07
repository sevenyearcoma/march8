"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Float, Preload, Sparkles, useGLTF } from "@react-three/drei";
import { Model } from "./Model";
import styles from "../page.module.css";

const modelsData = [
    {
        url: "/models/heart.glb",
        position: [0, -0.5, 0],
        scale: 1.2,
        rotation: [0.1, 0.2, -0.1],
        heading: "с 8 марта",
        text: "наши дорогие девочки от всей души поздравляем вас!",
    },
    {
        url: "/models/sakura-flower.glb",
        position: [1.5, -4.5, -4],
        scale: 5,
        rotation: [0.2, 0.5, 0.15],
        heading: "приглашение",
        text: "мы хотим пригласить вас на наш праздник восьмого марта (восьмиклассное марта)",
    },
    {
        url: "/models/giftbox.glb",
        position: [-1.5, -10.5, -3],
        scale: 1,
        rotation: [0.15, -0.6, 0.25],
        heading: "подарки",
        text: "мы подготовили для вас подарочки исходя из ваших пожеланий, поэтому вам точно понравится",
    },
    {
        url: "/models/pastel_house.glb",
        position: [1, -14.5, 0],
        scale: 0.4,
        rotation: [0.05, -0.8, 0.1],
        heading: "где и когда?",
        text: "праздник пройдет в 18:00 у Андрея дома по адресу Толе би 273А/5A, кв. 198, обязательно приходите (лучше вовремя)",
        link: "https://go.2gis.com/ygTzV",
        linkText: "Посмотреть в 2GIS"
    },
    {
        url: "/models/shiba_inu.glb",
        position: [-1, -20, 0],
        scale: 10,
        rotation: [0.05, 0.6, -0.05],
        heading: "отличная компания",
        text: "соберемся восьмяшами и будем общаться и смеяться (опционально)",
    },
    {
        url: "/models/cute_milkshake.glb",
        position: [1, -24.7, -1],
        scale: 0.7,
        rotation: [0.15, -0.3, 0.1],
        heading: "вкусности",
        text: "мы закажем много разных вкусностей, чтобы порадовать вас и нас",
    },
    {
        url: "/models/sushi_set.glb",
        position: [-1, -28.5, -1],
        scale: 0.2,
        rotation: [0.3, 0.7, 0.25],
        heading: "суши сет",
        text: "пока не выбрали чо кушать, но было бы круто если бы суши поели",
    },
    {
        url: "/models/board_game_boxes.glb",
        position: [1, -33, 0],
        scale: 0.8,
        rotation: [0.1, -0.6, 0.1],
        heading: "настолки",
        text: "а еще мы будем играть в интересные и веселые настолки (если принесете) (пж адина)",
    },
    {
        url: "/models/playing_cards.glb",
        position: [-2, -37.5, 0],
        scale: 0.8,
        rotation: [0.4, 0.6, -0.25],
        heading: "круто проведем время",
        text: "будет очень душевно, можем в карты поиграть (пж адина)",
    },
    {
        url: "/models/cute_mocha_cat_3.glb",
        position: [1, -41.7, 0],
        scale: 0.7,
        rotation: [0.05, -0.8, 0.1],
        heading: "очень ждем",
        text: "все кто может и хочет приходите, мы будем рады вас видеть",
    },
    {
        urls: [
            { url: "/models/girls3dmodels/adina.glb", position: [-2.1, -50, -0.4], scale: 1.2, rotation: [0.1, -1.2, 0], mobileZ: -8.4 },
            { url: "/models/girls3dmodels/aknur.glb", position: [-1.4, -50, -0.1], scale: 1.2, rotation: [0.1, -1.4, 0], mobileZ: -8.1 },
            { url: "/models/girls3dmodels/gulya.glb", position: [-0.7, -50, 0.1], scale: 1.2, rotation: [0.1, -1.5, 0], mobileZ: -7.9 },
            { url: "/models/girls3dmodels/arai.glb", position: [0, -50, 0.2], scale: 1.2, rotation: [0.1, -1.6, 0], mobileZ: -7.8 },
            { url: "/models/girls3dmodels/inkar.glb", position: [0.7, -50, 0.1], scale: 1.2, rotation: [0.1, -1.7, 0], mobileZ: -7.9 },
            { url: "/models/girls3dmodels/laura.glb", position: [1.4, -50, -0.1], scale: 1.2, rotation: [0.1, -1.8, 0], mobileZ: -8.1 },
            { url: "/models/girls3dmodels/sabina.glb", position: [2.1, -50, -0.4], scale: 1.2, rotation: [0.1, -1.9, 0], mobileZ: -8.4 },
        ],
        heading: "с 8 марта!",
        text: "крепко обнимаем! ❤️",
    }
] as any[];

const BackgroundBubbles = () => {
    return (
        <>
            {Array.from({ length: 80 }).map((_, i) => (
                <Float
                    key={i}
                    speed={1 + Math.random()}
                    rotationIntensity={1}
                    floatIntensity={2}
                    position={[
                        (Math.random() - 0.5) * 30, // Spread wider in X
                        Math.random() * -100 + 10,   // Spread along Y scroll from Top to Bottom
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
            {Array.from({ length: 120 }).map((_, i) => (
                <Float
                    key={`petal-${i}`}
                    speed={2 + Math.random() * 2} // Faster falling speed
                    rotationIntensity={2.5}
                    floatIntensity={2}
                    position={[
                        (Math.random() - 0.5) * 30, // Spread wider in X
                        Math.random() * -100 + 15,   // Spread along Y scroll
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
                <ScrollControls pages={11} damping={0.25}>
                    <Scroll>
                        {modelsData.map((data, index) => {
                            if ('urls' in data) {
                                return data.urls.map((u: any, i: number) => (
                                    <Model
                                        key={`group-${index}-${i}`}
                                        index={index}
                                        url={u.url}
                                        position={u.position as [number, number, number]}
                                        scale={u.scale}
                                        rotation={u.rotation as [number, number, number]}
                                        mobileZ={u.mobileZ}
                                        scrollPageStart={index - 0.5}
                                        scrollPageEnd={index + 1}
                                    />
                                ));
                            }
                            return (
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
                            );
                        })}
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
                                                    {'link' in data && data.link && (
                                                        <a href={data.link} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                                                            {data.linkText}
                                                        </a>
                                                    )}
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
    if ('urls' in data) {
        data.urls.forEach((u: any) => useGLTF.preload(u.url));
    } else {
        useGLTF.preload(data.url);
    }
});

