"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const images = [
    "/images/villa-1.jpg",
    "/images/villa-2.jpg",
    "/images/villa-3.jpg",
    "/images/villa-1.jpg",
    "/images/villa-2.jpg",
    "/images/villa-3.jpg",
];

export default function ScrollGallery() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const indexRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!containerRef.current) return;

            indexRef.current = (indexRef.current + 1) % images.length;
            const child =
                containerRef.current.children[indexRef.current] as HTMLElement;

            if (child) {
                containerRef.current.scrollTo({
                    left:
                        child.offsetLeft -
                        (containerRef.current.clientWidth - child.clientWidth) / 2,
                    behavior: "smooth",
                });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={containerRef}
            className="
                flex w-full
                mt-10 md:mt-20
                snap-x snap-mandatory
                overflow-x-auto md:overflow-x-hidden
                scroll-smooth touch-pan-x
                scrollbar-hide
            "
        >
            {images.map((src, i) => (
                <div
                    key={i}
                    className="
                        flex-shrink-0 mx-2 snap-center relative
                        w-[250px] md:w-[800px]
                        h-[250px] md:h-[500px]
                    "
                >
                    {/* MOBILE (250x250) */}
                    <div className="block md:hidden w-full h-full relative">
                        <Image
                            src={src}
                            alt={`Image ${i + 1}`}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* DESKTOP (800x500) */}
                    <div className="hidden md:block w-full h-full">
                        <Image
                            src={src}
                            alt={`Image ${i + 1}`}
                            width={800}
                            height={500}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
