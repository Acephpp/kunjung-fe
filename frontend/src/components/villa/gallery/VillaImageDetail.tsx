"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { villas } from "../../../app/data/villas";

export default function VillaImageDetail() {
    const { id } = useParams();
    const villa = villas.find((v) => v.id === Number(id));

    if (!villa) return <div className="text-center py-20">Villa not found.</div>;

    return (
        <main className="bg-[#FCFBF7] text-[#3A3A3A] font-[var(--font-space-grotesk)]">
            <div className="max-w-9xl mx-auto px-6 md:px-12 pb-24 space-y-24">
                {villa.details.map((detail, index) => {
                    const images = detail.images;

                    return (
                        <section
                            key={index}
                            className="border-t border-gray-200 pt-16 grid grid-cols-1 md:grid-cols-6 gap-12 items-start"
                        >
                            {/* 🧾 Text kiri (sticky) */}
                            <div className="md:col-span-2 flex flex-col justify-start max-w-xl sticky top-24 self-start">
                                <h2 className="text-4xl font-primary mb-6">
                                    {detail.title}
                                </h2>
                                <p className="text-2xl font-secondary leading-relaxed text-[#444] whitespace-pre-line">
                                    {detail.description}
                                </p>
                            </div>

                            {/* 🖼️ Gambar kanan */}
                            <div className="md:col-span-4 space-y-4">
                                {images.length <= 3 ? (
                                    <>
                                        {/* 1 gambar besar */}
                                        <div className="relative h-[600px] w-full overflow-hidden">
                                            <Image
                                                src={images[0]}
                                                alt={`${detail.title}-main`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* 2 gambar kecil */}
                                        <div className="grid grid-cols-2 gap-3">
                                            {images.slice(1, 3).map((img, i) => (
                                                <div
                                                    key={i}
                                                    className="relative h-[500px] overflow-hidden"
                                                >
                                                    <Image
                                                        src={img}
                                                        alt={`${detail.title}-${i}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {images.map((img, i) => {
                                            // Pola 1–2–1–2
                                            if (i % 3 === 0) {
                                                // Gambar besar
                                                return (
                                                    <div
                                                        key={i}
                                                        className="relative h-[600px] w-full overflow-hidden"
                                                    >
                                                        <Image
                                                            src={img}
                                                            alt={`${detail.title}-${i}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                );
                                            } else if (i % 3 === 1) {
                                                // Dua gambar kecil
                                                const nextImages = images.slice(i, i + 2);
                                                if (nextImages.length === 0) return null;
                                                return (
                                                    <div
                                                        key={`pair-${i}`}
                                                        className="grid grid-cols-2 gap-3"
                                                    >
                                                        {nextImages.map((pair, j) => (
                                                            <div
                                                                key={j}
                                                                className="relative h-[500px] overflow-hidden"
                                                            >
                                                                <Image
                                                                    src={pair}
                                                                    alt={`${detail.title}-${i + j}`}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </>
                                )}
                            </div>
                        </section>
                    );
                })}
            </div>
        </main>
    );
}
