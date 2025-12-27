"use client";

import Image from "next/image";

export default function HeroAbout() {
    return (
        <div className="w-full md:mt-5">
            {/* HERO */}
            <section className="relative w-full h-[450px] md:h-[80vh] lg:h-[800px]">
                <Image
                    src="/images/hotel.jpg"
                    alt="About Kunjung"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Content */}
                <div className="
                    absolute inset-0 
                    flex items-end justify-end
                    px-5 sm:px-8 md:px-12 lg:px-[100px]
                    pb-5 sm:pb-16 md:pb-24 lg:pb-[200px]
                ">
                    <div className="max-w-xl lg:max-w-2xl text-white font-primary">
                        <h2 className="
                            text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                            font-bold mb-3 md:mb-4
                        ">
                            Our Story
                        </h2>

                        <p className="
                            text-sm sm:text-base md:text-lg lg:text-[28px]
                            leading-relaxed lg:leading-tight
                        ">
                            Begins with a simple idea: the belief that a stay can be more
                            than just a temporary escape—it can be a journey of discovery,
                            connection, and inspiration.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer Text */}
            <p className="
                mt-6 sm:mt-8 md:mt-10
                text-base sm:text-lg md:text-xl
                font-medium font-secondary
            ">
                KUNJUNG Family
            </p>
        </div>
    );
}
