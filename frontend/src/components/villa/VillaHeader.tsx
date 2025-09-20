"use client";

import Image from "next/image";
import { villas } from "@/app/data/villas";
import { useParams, notFound } from "next/navigation";

export default function VillaHeader() {
    const params = useParams();
    const id = Number(params?.id);
    const villa = villas.find((v) => v.id === id);

    if (!villa) {
        return notFound();
    }

    return (
        <section className="">
            <h1 className="font-primary text-[80px] text-center mb-8 mt-5">
                {villa.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative w-full h-[800px] md:col-span-2">
                    <Image
                        src={villa.descImages[0]}
                        alt={`${villa.name} main`}
                        fill
                        className="object-cover"
                    />
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
