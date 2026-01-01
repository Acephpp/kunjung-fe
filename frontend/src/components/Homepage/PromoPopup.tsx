"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

/* ================= PROMO DATA ================= */

type PromoData = {
    id: string
    title: string
    subtitle: string
    description: string
    image: string
    ctaText: string
}

const PROMO_DATA: PromoData = {
    id: "promo-new-year",
    title: "Special Stay Offer",
    subtitle: "Limited Time Only",
    description:
        "Nikmati pengalaman menginap premium dengan harga spesial. Berlaku untuk pemesanan hari ini.",
    image: "/images/villa-1.jpg",
    ctaText: "View Offer",
}

/* ================= COMPONENT ================= */

export default function PromoPopup() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(true)
        const timer = setTimeout(() => setOpen(false), 5000)
        return () => clearTimeout(timer)
    }, [])

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4">
            <div
                className="
                    relative w-full
                    sm:max-w-xl md:max-w-2xl
                    bg-white
                    rounded-t-3xl sm:rounded-2xl
                    shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                    overflow-hidden
                "
                style={{ animation: "popup 0.35s ease-out" }}
            >
                {/* Close */}
                <button
                    onClick={() => setOpen(false)}
                    className="
                        absolute top-4 right-4 z-20
                        w-9 h-9
                        rounded-full
                        bg-white/70 backdrop-blur
                        flex items-center justify-center
                        text-gray-600 hover:text-gray-900
                        transition
                    "
                >
                    ✕
                </button>

                {/* ===== CONTENT ===== */}
                <div className="grid sm:grid-cols-2">
                    {/* LEFT - IMAGE */}
                    <div className="relative h-52 sm:h-full min-h-[240px]">
                        <Image
                            src={PROMO_DATA.image}
                            alt={PROMO_DATA.title}
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                        {/* Badge */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#7A3E2C] text-[11px] font-secondary font-semibold px-3 py-1 rounded-full tracking-wide">
                            PROMO
                        </div>
                    </div>

                    {/* RIGHT - CONTENT */}
                    <div className="p-6 sm:p-7 md:p-9 flex flex-col justify-center">
                        <p className="font-secondary text-[11px] uppercase tracking-[0.18em] text-[#7A3E2C] mb-3">
                            {PROMO_DATA.subtitle}
                        </p>

                        <h3 className="font-primary text-[22px] sm:text-[26px] md:text-[30px] font-semibold text-[#2D2A29] leading-tight mb-4">
                            {PROMO_DATA.title}
                        </h3>

                        <p className="font-secondary text-sm sm:text-base text-[#6E6B69] leading-relaxed mb-7">
                            {PROMO_DATA.description}
                        </p>

                        <button
                            onClick={() => setOpen(false)}
                            className="
                                font-secondary font-semibold
                                w-full sm:w-auto
                                bg-[#7A3E2C] hover:bg-[#693424]
                                text-white
                                px-9 py-3
                                rounded-full
                                transition-all
                                hover:scale-[1.02]
                            "
                        >
                            {PROMO_DATA.ctaText}
                        </button>
                    </div>
                </div>
            </div>

            {/* Animation */}
            <style>{`
                @keyframes popup {
                    from {
                        transform: translateY(28px) scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    )
}
