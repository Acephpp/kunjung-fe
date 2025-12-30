"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

interface SleepRoom {
    title: string
    description: string
    image: string
}

interface SleepArrangementSectionProps {
    rooms: SleepRoom[]
}

export default function SleepArrangementSection({ rooms }: SleepArrangementSectionProps) {
    const DESKTOP_ITEMS = 2
    const MOBILE_ITEMS = 1

    const [page, setPage] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const ITEMS_PER_PAGE = isMobile ? MOBILE_ITEMS : DESKTOP_ITEMS
    const totalPages = Math.ceil(rooms.length / ITEMS_PER_PAGE)

    const startIndex = page * ITEMS_PER_PAGE
    const visibleRooms = rooms.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const prev = () => page > 0 && setPage(page - 1)
    const next = () => page < totalPages - 1 && setPage(page + 1)

    if (!isClient) {
        return (
            <section className="sm:mt-5 md:mt-16">
                <hr className="my-6 border-gray-300" />

                {/* ================= HEADER (DESKTOP ONLY) ================= */}
                <div className="hidden md:flex items-center justify-between mb-8">
                    <h2 className="text-[40px] font-primary font-semibold">Sleep Arrangement</h2>

                    <div className="flex items-center gap-6 text-[#6F6C67]">
                        <ChevronLeft
                            onClick={prev}
                            className={`w-6 h-6 cursor-pointer ${page === 0 && "opacity-30 pointer-events-none"}`}
                        />
                        <span className="font-secondary text-[18px]">
                            {page + 1}/{totalPages}
                        </span>
                        <ChevronRight
                            onClick={next}
                            className={`w-6 h-6 cursor-pointer ${page === totalPages - 1 && "opacity-30 pointer-events-none"}`}
                        />
                    </div>
                </div>

                {/* ================= TITLE (MOBILE ONLY) ================= */}
                <h2 className="md:hidden text-[26px] font-primary font-semibold mb-2 md:mb-6">Sleep Arrangement</h2>

                {/* ================= ROOMS ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {rooms.slice(0, DESKTOP_ITEMS).map((room, i) => (
                        <div key={i}>
                            <div className="relative h-[200px] md:h-[280px] rounded-md sm:rounded-[28px] overflow-hidden">
                                <Image
                                    src={room.image || "/placeholder.svg"}
                                    alt={room.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>

                            <p className="mt-4 font-primary font-semibold text-[18px] md:text-[22px]">{room.title}</p>
                            <p className="text-[#8B8883] text-[16px] md:text-[18px] mt-1">{room.description}</p>
                        </div>
                    ))}
                </div>

                {/* ================= MOBILE PAGINATION (BOTTOM) ================= */}
                <div className="md:hidden flex items-center justify-center gap-10 mt-4 md:mt-8 text-[#6F6C67]">
                    <ChevronLeft onClick={prev} className={`w-6 h-6 ${page === 0 && "opacity-30 pointer-events-none"}`} />
                    <span className="font-secondary text-[18px]">
                        {page + 1}/{totalPages}
                    </span>
                    <ChevronRight
                        onClick={next}
                        className={`w-6 h-6 ${page === totalPages - 1 && "opacity-30 pointer-events-none"}`}
                    />
                </div>
            </section>
        )
    }

    return (
        <section className="sm:mt-5 md:mt-16">
            <hr className="my-6 border-gray-300" />

            {/* ================= HEADER (DESKTOP ONLY) ================= */}
            <div className="hidden md:flex items-center justify-between mb-8">
                <h2 className="text-[40px] font-primary font-semibold">Sleep Arrangement</h2>

                <div className="flex items-center gap-6 text-[#6F6C67]">
                    <ChevronLeft
                        onClick={prev}
                        className={`w-6 h-6 cursor-pointer ${page === 0 && "opacity-30 pointer-events-none"}`}
                    />
                    <span className="font-secondary text-[18px]">
                        {page + 1}/{totalPages}
                    </span>
                    <ChevronRight
                        onClick={next}
                        className={`w-6 h-6 cursor-pointer ${page === totalPages - 1 && "opacity-30 pointer-events-none"}`}
                    />
                </div>
            </div>

            {/* ================= TITLE (MOBILE ONLY) ================= */}
            <h2 className="md:hidden text-[26px] font-primary font-semibold mb-2 md:mb-6">Sleep Arrangement</h2>

            {/* ================= ROOMS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {visibleRooms.map((room, i) => (
                    <div key={i}>
                        <div className="relative h-[240px] md:h-[280px] rounded-md sm:rounded-[28px] overflow-hidden">
                            <Image
                                src={room.image || "/placeholder.svg"}
                                alt={room.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        <p className="mt-4 font-primary font-semibold text-[18px] md:text-[22px]">{room.title}</p>
                        <p className="text-[#8B8883] text-[16px] md:text-[18px] mt-1">{room.description}</p>
                    </div>
                ))}
            </div>

            {/* ================= MOBILE PAGINATION (BOTTOM) ================= */}
            <div className="md:hidden flex items-center justify-center gap-10 mt-4 md:mt-8 text-[#6F6C67]">
                <ChevronLeft onClick={prev} className={`w-6 h-6 ${page === 0 && "opacity-30 pointer-events-none"}`} />
                <span className="font-secondary text-[18px]">
                    {page + 1}/{totalPages}
                </span>
                <ChevronRight
                    onClick={next}
                    className={`w-6 h-6 ${page === totalPages - 1 && "opacity-30 pointer-events-none"}`}
                />
            </div>
        </section>
    )
}
