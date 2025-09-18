"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const images = [
    "/images/villa-1.jpg",
    "/images/villa-2.jpg",
    "/images/villa-3.jpg",
];

export default function ScrollGallery() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    let index = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            if (containerRef.current) {
                index = (index + 1) % images.length;
                const child = containerRef.current.children[index] as HTMLElement;
                if (child) {
                    containerRef.current.scrollTo({
                        left: child.offsetLeft - (containerRef.current.clientWidth - child.clientWidth) / 2,
                        behavior: "smooth",
                    });
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory w-full h-[500px] mt-10"
        >
            {images.map((src, i) => (
                <div
                    key={i}
                    className="flex-shrink-0 w-[60%] h-full mx-2 snap-center"
                >
                    <Image
                        src={src}
                        alt={`Image ${i + 1}`}
                        width={800}
                        height={500}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
        </div>
    );
}
