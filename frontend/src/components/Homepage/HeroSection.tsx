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
        description: "Luxury Living in the Hills of Bandung",
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
        <section className="max-w-9xl mx-auto px-10 h-[842px] grid grid-cols-3 gap-5 mt-8">
            <div className="relative w-full h-full col-span-2 font-primary">
                <Swiper
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
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
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h2 className="text-[32px] md:text-xl font-semibold">
                                        {villa.name}
                                    </h2>
                                    <p className="mt-5 text-xl md:text-base">
                                        {villa.description}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <style jsx global>{`
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
                        width: 48px; /* 🔥 aktif lebih panjang */
                    }
                `}</style>
            </div>

            <div className="bg-[#7A3E2C] text-white flex flex-col justify-between p-9 col-start-3 col-span-1 font-primary">
                <div>
                    <h1 className="text-[40px] font-bold leading-snug">
                        Discover Your Most Comfortable Curated Villas
                    </h1>
                    <p className="mt-6 text-[18px] max-w-xl">
                        Your insider guides of curated boutique villas in Bandung, Indonesia.
                    </p>
                </div>

                <span className="text-xl font-medium tracking-wide">
                    KUNJUNG Family
                </span>
            </div>
        </section>
    );
}
