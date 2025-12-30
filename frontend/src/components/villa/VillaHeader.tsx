"use client";

import Image from "next/image";
import { villas } from "@/app/data/villas";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function VillaHeader() {
    const params = useParams();
    const id = Number(params?.id);
    const villa = villas.find((v) => v.id === id);
    const [activeIndex, setActiveIndex] = useState(0);

    if (!villa) {
        return notFound();
    }

    return (
        <section className="max-w-9xl mx-auto px-6 md:px-10 py-5 bg-[#FCFBF7] ">

            {/* ================= TITLE (DESKTOP SAJA) ================= */}
            <h1 className="hidden md:block font-primary text-[80px] text-center mb-8">
                {villa.name}
            </h1>

            {/* ================= MOBILE SLIDER ================= */}
            <div className="md:hidden">
                <div
                    className="
                        relative
                        flex
                        overflow-x-auto
                        snap-x
                        snap-mandatory
                        scroll-smooth
                        touch-pan-x
                        overscroll-x-contain
                        no-scrollbar
                        aspect-square
                    "
                    onScroll={(e) => {
                        const scrollLeft = e.currentTarget.scrollLeft;
                        const width = e.currentTarget.offsetWidth;
                        setActiveIndex(Math.round(scrollLeft / width));
                    }}
                >
                    {villa.descImages.map((img, idx) => (
                        <div
                            key={idx}
                            className="relative w-full flex-shrink-0 snap-center"
                        >
                            <Image
                                src={img}
                                alt={`${villa.name} mobile ${idx}`}
                                fill
                                priority={idx === 0}
                                className="object-cover"
                            />

                            {/* CAMERA BADGE (ADA DI SETIAP IMAGE) */}
                            <Link href={`/houses/villa/${id}/photos`}>
                                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-full text-xs font-medium shadow">
                                    {/* OUTLINE CAMERA ICON */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        className="w-4 h-4"
                                    >
                                        <path d="M3 7h3l2-3h8l2 3h3v13H3z" />
                                        <circle cx="12" cy="13" r="3" />
                                    </svg>

                                    <span>
                                        {idx + 1}/{villa.descImages.length}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= DESKTOP (ASLI, TIDAK DIUBAH) ================= */}
            <div className="hidden md:grid grid-cols-3 gap-4">
                <div className="relative w-full h-[800px] md:col-span-2">
                    <Image
                        src={villa.descImages[0]}
                        alt={`${villa.name} main`}
                        fill
                        className="object-cover"
                    />

                    <Link href={`/houses/villa/${id}/photos`}>
                        <button className="absolute bottom-6 left-6 flex items-center gap-2 bg-gray-500/50 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                className="w-4 h-4"
                            >
                                <circle cx="2" cy="2" r="1.5" />
                                <circle cx="8" cy="2" r="1.5" />
                                <circle cx="14" cy="2" r="1.5" />
                                <circle cx="2" cy="8" r="1.5" />
                                <circle cx="8" cy="8" r="1.5" />
                                <circle cx="14" cy="8" r="1.5" />
                                <circle cx="2" cy="14" r="1.5" />
                                <circle cx="8" cy="14" r="1.5" />
                                <circle cx="14" cy="14" r="1.5" />
                            </svg>
                            see all photos
                        </button>
                    </Link>
                </div>

                <div className="flex flex-col gap-4 h-[800px]">
                    {villa.descImages.slice(1, 3).map((img, idx) => (
                        <div key={idx} className="relative w-full flex-1">
                            <Image
                                src={img}
                                alt={`${villa.name} side ${idx}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
