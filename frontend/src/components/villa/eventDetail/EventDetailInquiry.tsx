"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const unavailableDates: string[] = ["2025-12-10", "2025-12-11"]

const isDateUnavailable = (d: Date) => {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
    return unavailableDates.includes(key)
}

interface EventDetailInquiryProps {
    showAvailabilityModal: boolean
    setShowAvailabilityModal: (show: boolean) => void
}

export default function EventDetailInquiry({
    showAvailabilityModal,
    setShowAvailabilityModal,
}: EventDetailInquiryProps) {
    const [baseDate, setBaseDate] = useState(new Date())
    const baseMonth = baseDate.getMonth()
    const baseYear = baseDate.getFullYear()

    const goPrevMonth = () => {
        setBaseDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
    }

    const goNextMonth = () => {
        setBaseDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
    }

    const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate()

    const renderMonth = (month: number, year: number) => {
        const days = getDaysInMonth(month, year)
        const firstDay = new Date(year, month, 1).getDay()

        const weeks = []
        let day = 1
        let started = false

        for (let row = 0; row < 6; row++) {
            const cells = []

            for (let col = 0; col < 7; col++) {
                if (row === 0 && col === firstDay) started = true

                if (!started || day > days) {
                    cells.push(
                        <div key={col} className="text-center py-2 text-sm text-transparent">
                            .
                        </div>,
                    )
                } else {
                    const currentDate = new Date(year, month, day)
                    const unavailable = isDateUnavailable(currentDate)

                    cells.push(
                        <div
                            key={col}
                            className={`py-2 text-center text-sm font-medium ${
                                unavailable ? "text-gray-300" : "text-[#2D2A29]"
                            }`}
                        >
                            {day}
                        </div>,
                    )

                    day++
                }
            }

            weeks.push(
                <div key={row} className="grid grid-cols-7">
                    {cells}
                </div>,
            )
        }

        return (
            <div>
                <p className="font-semibold text-[15px] text-[#2D2A29] mb-3 text-center">
                    {new Date(year, month).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                    })}
                </p>

                <div className="grid grid-cols-7 text-[12px] text-gray-500 mb-2">
                    <span className="text-center">S</span>
                    <span className="text-center">M</span>
                    <span className="text-center">T</span>
                    <span className="text-center">W</span>
                    <span className="text-center">T</span>
                    <span className="text-center">F</span>
                    <span className="text-center">S</span>
                </div>

                {weeks}
            </div>
        )
    }

    return (
        <>
            {/* DESKTOP CARD (TIDAK DIUBAH) */}
            <div className="lg:col-span-1 mt-5 hidden lg:block">
                <Card className="sticky top-2/12 py-10 px-10 rounded-xl shadow-xl bg-[#fcfbf7] border-[#E7E6E2] flex flex-col gap-6">
                    <div>
                        <p className="text-[30px] font-primary text-center">We know that</p>
                        <h3 className="text-[30px] text-center font-primary font-semibold text-[#2D2A29] leading-snug">
                            this is inconvenient
                        </h3>
                    </div>

                    <p className="text-sm text-center font-secondary text-[#7E7A76] leading-relaxed">
                        For this type of booking, prices and direct reservations aren't available online due to the many details
                        involved. Please contact us directly so we can assist you with the best available options.
                    </p>

                    <p className="text-[20px] px-13 text-center font-secondary text-[#7E7A76] leading-relaxed">
                        Please make sure that you have checked the{" "}
                        <button
                            type="button"
                            onClick={() => setShowAvailabilityModal(true)}
                            className="underline underline-offset-2 text-black font-semibold"
                        >
                            availability calendar
                        </button>
                        .
                    </p>

                    <Link href="https://wa.me/6281234567890" target="_blank" className="block">
                        <Button className="w-full bg-[#7A3E2C] hover:bg-[#693424] text-white rounded-lg py-8 px-8">
                            <div className="w-full flex items-center justify-between gap-8">
                                <span className="text-3xl font-secondary font-medium">Inquire</span>
                                <Image src="/images/whatsapp.png" alt="whatsapp" width={30} height={30} />
                            </div>
                        </Button>
                    </Link>

                    <p className="text-sm text-center font-secondary font-bold text-black italic">
                        You won't be charged yet
                    </p>
                </Card>
            </div>

            {/* MOBILE STICKY BOTTOM (BARU) */}
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#fcfbf7] border-t border-[#E7E6E2] shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
                    <p className="text-[14px] font-secondary text-[#2D2A29] leading-snug">
                        Booking available via
                        <br />
                        <span className="font-semibold">direct request.</span>
                    </p>

                    <Link href="https://wa.me/6281234567890" target="_blank" className="flex-shrink-0">
                        <Button className="bg-[#7A3E2C] hover:bg-[#693424] text-white rounded-full px-10 md:px-6 py-5 md:py-2 font-secondary font-bold text-sm">
                            <span className="font-secondary text-[16px] font-medium">Inquire</span>
                            <Image src="/images/whatsapp.png" alt="whatsapp" width={20} height={20} />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* PADDING AGAR KONTEN TIDAK KETUTUP */}
            <style>{`
                @media (max-width: 1024px) {
                    body {
                        padding-bottom: 90px;
                    }
                }
            `}</style>

            {/* POPUP AVAILABILITY */}
            {showAvailabilityModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
                    onClick={() => setShowAvailabilityModal(false)}
                >
                    <div
                        className="bg-[#FCFBF7] rounded-3xl shadow-xl border border-gray-200 px-8 py-6 w-[880px] max-w-[95%]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-[28px] font-primary font-semibold mb-6">
                            Availability calendar
                        </h2>

                        <div className="border border-[#E7E6E2] rounded-3xl px-8 py-8">
                            <div className="flex items-center justify-between mb-6">
                                <button onClick={goPrevMonth} className="p-2 rounded-full hover:bg-gray-100">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <div className="flex-1" />

                                <button onClick={goNextMonth} className="p-2 rounded-full hover:bg-gray-100">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {renderMonth(baseMonth, baseYear)}
                                {renderMonth((baseMonth + 1) % 12, baseMonth === 11 ? baseYear + 1 : baseYear)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
