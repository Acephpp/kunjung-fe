"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type Villa = {
    name: string;
    description: string;
    image: string;
};

const villas: Villa[] = [
    {
        name: "Silas House",
        description: "A Tranquil Stay In The Heart of Bandung",
        image: "/images/villa-1.jpg",
    },
    {
        name: "Aurora Villa",
        description: "Modern Comfort Surrounded by Nature",
        image: "/images/villa-2.jpg",
    },
    {
        name: "Elysium Retreat",
        description: "Luxury Living in The Hills of Bandung",
        image: "/images/villa-3.jpg",
    },
    {
        name: "Luna Cottage",
        description: "Cozy Escape with Scenic Views",
        image: "/images/villa-4.jpg",
    },
];

export default function HeroSection() {
    return (
        <section className="max-w-9xl mx-auto mt-4 sm:mt-5 md:mt-5 px-4 flex flex-col md:px-10 md:h-[720px] md:grid md:grid-cols-3 md:gap-5">

            {/* SLIDER */}
            <div className="relative w-full h-[350px] sm:h-[420px] font-primary md:h-[720px] md:col-span-2">
                <Swiper
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop
                    modules={[Pagination, Autoplay]}
                    className="w-full h-full"
                >
                    {villas.map((villa, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="relative w-full h-full">
                                <img
                                    src={villa.image}
                                    alt={villa.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* TEXT OVERLAY */}
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <h2 className="text-base sm:text-lg md:text-xl font-semibold">
                                        {villa.name}
                                    </h2>

                                    <p className="mt-1 sm:mt-2 max-w-md text-xs sm:text-sm md:text-base leading-snug opacity-90">
                                        {villa.description}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <style jsx global>{`
                    /* Desktop */
                    .swiper-pagination {
                        text-align: right !important;
                        padding-right: 1.5rem;
                        bottom: 1.5rem !important;
                    }
                    .swiper-pagination-bullet {
                        width: 24px;
                        height: 3px;
                        border-radius: 2px;
                        background: white;
                        opacity: 0.4;
                        transition: all 0.3s ease;
                        margin: 0 3px !important;
                    }
                    .swiper-pagination-bullet-active {
                        opacity: 1;
                        background: white;
                        width: 48px;
                    }

                    /* Mobile */
                    @media (max-width: 768px) {
                        .swiper-pagination {
                            padding-right: 1rem !important;
                            bottom: 0.8rem !important;
                        }
                        .swiper-pagination-bullet {
                            width: 14px;
                            height: 2px;
                            margin: 0 2px !important;
                        }
                        .swiper-pagination-bullet-active {
                            width: 28px;
                            height: 2px;
                        }
                    }
                `}</style>
            </div>

            {/* PANEL COKLAT */}
            <div className="bg-[#7A3E2C] text-white flex flex-col justify-between p-4 font-primary w-full md:p-9 md:col-start-3 md:col-span-1">
                <div>
                    <h1 className="text-[20px] md:text-[40px] font-bold leading-snug">
                        Discover Your Most Comfortable Curated Villas
                    </h1>
                    <p className="max-w-sm mt-2 md:mt-6 text-[10px] md:text-[18px] md:max-w-xl">
                        Your insider guides of curated boutique villas in Bandung, Indonesia.
                    </p>
                </div>

                <span className="mt-25 text-[12px] md:text-xl font-medium tracking-wide">
                    KUNJUNG Family
                </span>
            </div>
        </section>
    );
}
