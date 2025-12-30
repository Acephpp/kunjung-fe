"use client"

import {
    Star,
    User,
    Bed,
    Bath,
    Image as ImageIcon,
    DoorOpen,
} from "lucide-react"
import type { villas } from "@/app/data/villas"
import Image from "next/image"
import { div } from "framer-motion/client"

type Villa = (typeof villas)[number]

interface StaysDetailIntroProps {
    villa: Villa
}

export default function StaysDetailIntro({ villa }: StaysDetailIntroProps) {
    return (
        <div>
            <h1 className="sm:hidden text-[28px] font-primary font-semibold text-[#2D2A29]">{villa.name}</h1>
            <h2 className="font-primary font-semibold text-[#2D2A29]
                text-[18px] sm:text-[28px] md:text-[40px] mb-5 sm:mb-10">
                A tranquil stay in the city
            </h2>
            <div className="space-y-6">
                {/* TITLE */}


                {/* RATING */}
                <div className="inline-flex flex-wrap items-center gap-3
                border border-[#D6D3CE] rounded-xl
                px-4 py-2 text-sm text-[#2D2A29] font-secondary">
                    <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-black text-black" />
                        <span className="font-semibold">{villa.rating}</span>
                    </div>

                    <span className="hidden sm:block h-4 w-px bg-[#D6D3CE]" />

                    <span>{villa.reviews} reviews</span>
                </div>

                {/* GUEST / BEDROOM / BATHROOM */}
                <div
                    className="
        flex flex-wrap sm:grid sm:grid-cols-3
        items-center
        border border-[#D6D3CE] rounded-xl
        px-4 sm:px-8 py-4 sm:py-5
        font-secondary text-[#2D2A29]
        text-[14px] sm:text-[16px] md:text-[18px]
        gap-y-3
    "
                >
                    {/* GUEST — LEFT */}
                    <div className="flex items-center gap-2 w-1/2 sm:w-auto sm:justify-self-start">
                        <User className="w-5 h-5" />
                        <span>{villa.guests} Guest</span>
                    </div>

                    {/* BEDROOM — CENTER */}
                    <div className="flex items-center gap-2 w-1/2 sm:w-auto sm:justify-self-center">
                        <Bed className="w-5 h-5" />
                        <span>{villa.bedrooms} Bedrooms</span>
                    </div>

                    {/* BATHROOM — RIGHT */}
                    <div className="flex items-center gap-2 w-full sm:w-auto sm:justify-self-end">
                        <Bath className="w-5 h-5" />
                        <span>{villa.bathrooms} Bathrooms</span>
                    </div>
                </div>


                {/* VIRTUAL TOUR CARD */}
                <div
                    className="
                        relative flex flex-col sm:flex-row
                        border border-[#D6D3CE] rounded-2xl
                        p-4 bg-[#FAF9F5]
                    "
                >
                    {/* ICON — DESKTOP ONLY (pojok kanan) */}
                    <div className="hidden sm:block absolute top-4 right-4 text-[#2D2A29]">
                        <ImageIcon className="w-8 h-8" strokeWidth={1.5} />
                    </div>

                    {/* IMAGE */}
                    <div className="w-full sm:w-1/2 sm:pr-4">
                        <div
                            className="
                                relative h-[200px] sm:h-full sm:min-h-[220px]
                                rounded-xl overflow-hidden bg-[#EDEBE6]
                            "
                        >
                            <Image
                                src="/images/villa-1.jpg"
                                alt="Silas House"
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="w-full sm:w-1/2 sm:pl-2 flex flex-col justify-between mt-4 sm:mt-0">
                        <div>
                            {/* TITLE ROW (MOBILE ICON DI SINI) */}
                            <div className="flex items-center justify-between gap-3">
                                <p
                                    className="
                                        font-primary font-semibold
                                        text-[22px] sm:text-[24px] md:text-[28px]
                                        leading-tight text-[#2D2A29]
                                    "
                                >
                                    Silas House
                                </p>

                                {/* ICON — MOBILE ONLY */}
                                <div className="sm:hidden text-[#2D2A29]">
                                    <ImageIcon className="w-7 h-7" strokeWidth={1.5} />
                                </div>
                            </div>

                            <p
                                className="
                                    text-[14px] sm:text-[16px] md:text-[18px]
                                    font-primary text-[#8B8883] mt-1
                                "
                            >
                                Virtual tour available
                            </p>
                        </div>

                        <button
                            className="
                                w-full bg-[#E6E4DE] hover:bg-[#DCDAD4]
                                text-[16px] md:text-[18px]
                                py-3 md:py-4 rounded-xl
                                font-secondary text-[#2D2A29]
                                mt-4 sm:mt-0
                            "
                        >
                            Take virtual tour
                        </button>
                    </div>
                </div>


                {/* SELF CHECK-IN */}
                <div className="flex items-start gap-4 border-y border-[#E4E1DC] py-5">
                    <DoorOpen className="w-6 h-6 mt-1 text-[#2D2A29]" />
                    <div>
                        <p className="font-primary font-semibold text-[#2D2A29]
                        text-[18px] md:text-xl">
                            Self check-in
                        </p>
                        <p className="font-primary text-[#6F6C67]
                        text-[14px] md:text-lg">
                            You can check in with building staff
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}
