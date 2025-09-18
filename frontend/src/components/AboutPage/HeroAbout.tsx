"use client";

import Image from "next/image";
import { Libre_Baskerville } from "next/font/google";

const libre = Libre_Baskerville({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function HeroAbout() {
    return (
        <div className="w-full mt-5">
            <section className="relative w-full h-[800px]">
                <Image
                    src="/images/hotel.jpg"
                    alt="About Kunjung"
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute inset-0 flex items-end justify-end px-[100px] pb-[200px]">
                    <div className={`max-w-2xl text-white ${libre.className}`}>
                        <h2 className="text-5xl font-bold mb-4">
                            Kunjung’s story
                        </h2>
                        <p className="text-[28px] leading-tight">
                            Begins with a simple idea: the belief that a stay can be more
                            than just a temporary escape—it can be a journey of discovery,
                            connection, and inspiration.
                        </p>
                    </div>
                </div>
            </section>

            <p className="mt-10 text-xl font-medium">
                KUNJUNG Family
            </p>
        </div>
    );
}
