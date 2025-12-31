"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgePercent } from "lucide-react"
import Link from "next/link"
import { DateRange, type Range } from "react-date-range"
import Calendar from "react-date-range/dist/components/Calendar"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { FiMinus, FiPlus } from "react-icons/fi"
import { addDays, format } from "date-fns"
import type { villas } from "@/app/data/villas"
import type { Dispatch, SetStateAction } from "react"

type Villa = (typeof villas)[number]
type ShootType = "instacation" | "session-morning" | "session-afternoon" | "session-fullday"

interface ShootDetailBookingProps {
    villa: Villa
    date: Date | undefined
    setDate: (date: Date | undefined) => void
    showDatePicker: boolean
    setShowDatePicker: Dispatch<SetStateAction<boolean>>
    checkIn: Date | undefined
    setCheckIn: Dispatch<SetStateAction<Date | undefined>>
    checkOut: Date | undefined
    setCheckOut: Dispatch<SetStateAction<Date | undefined>>
    dateRange: Range[]
    setDateRange: Dispatch<SetStateAction<Range[]>>
    shootType: ShootType
    setShootType: Dispatch<SetStateAction<ShootType>>
    crew: number
    setCrew: Dispatch<SetStateAction<number>>
}

export default function ShootDetailBooking({
    villa,
    date,
    setDate,
    showDatePicker,
    setShowDatePicker,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    dateRange,
    setDateRange,
    shootType,
    setShootType,
    crew,
    setCrew,
}: ShootDetailBookingProps) {
    const [showCrewModal, setShowCrewModal] = useState(false)
    const [showTypeModal, setShowTypeModal] = useState(false)
    const [openShootSection, setOpenShootSection] = useState<"instacation" | "session">("instacation")

    const isSessionShoot =
        shootType === "session-morning" ||
        shootType === "session-afternoon" ||
        shootType === "session-fullday"

    const today = new Date()
    const tomorrow = addDays(today, 1)
    const weekendStart = addDays(today, 1)
    const weekendEnd = addDays(today, 2)

    const formatDateRangeText = () => {
        if (isSessionShoot) {
            if (!date) return "Select dates"
            return format(date, "dd MMM yyyy")
        }

        if (!checkIn || !checkOut) return "Add Dates"

        const startStr = checkIn.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
        })
        const endStr = checkOut.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        return `${startStr} - ${endStr}`
    }

    const handleDateChange = (item: any) => {
        const sel = item.selection as Range

        if (!checkIn && !checkOut) {
            if (sel.startDate) {
                setCheckIn(sel.startDate)
                setDate(sel.startDate)
                setDateRange([{ ...sel, endDate: sel.startDate }])
            }
            return
        }

        if (checkIn && !checkOut) {
            const start = sel.startDate ?? checkIn
            const end = sel.endDate ?? sel.startDate ?? checkIn

            const startDate = start && end && start > end ? end : start
            const endDate = start && end && start > end ? start : end

            setCheckIn(startDate || undefined)
            setCheckOut(endDate || undefined)
            setDateRange([{ ...sel, startDate, endDate }])
            setDate(startDate || undefined)

            if (startDate && endDate) setShowDatePicker(false)
            return
        }

        if (checkIn && checkOut && sel.startDate) {
            setCheckIn(sel.startDate)
            setCheckOut(undefined)
            setDate(sel.startDate)
            setDateRange([{ ...sel, endDate: sel.startDate }])
        }
    }

    const getShootTypeLabel = () => {
        switch (shootType) {
            case "instacation":
                return "Instacation"
            case "session-morning":
                return "Session shoot – Morning"
            case "session-afternoon":
                return "Session shoot – Afternoon"
            case "session-fullday":
                return "Session shoot – Full day"
            default:
                return "Instacation"
        }
    }

    const applySingleDate = (d: Date) => {
        setDate(d)
        setShowDatePicker(false)
    }

    return (
        <>
            {/* ================= DESKTOP CARD ================= */}
            <Card className="lg:sticky lg:top-2/12 mb-28 lg:mb-0 py-10 px-5 lg:px-10 rounded-xl shadow-xl bg-[#fcfbf7] border-[#E7E6E2] flex flex-col gap-6">
                <div className="rounded-lg border border-gray-200 bg-[#F8F7F2] text-sm text-gray-700 overflow-hidden">
                    {/* Dates */}
                    <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200">
                        <div className="flex flex-col">
                            <span className="text-[11px] font-secondary text-gray-500 uppercase tracking-wide">Dates</span>
                            <span className="text-[14px] font-secondary text-[#2D2A29]">
                                {formatDateRangeText()}
                            </span>
                        </div>
                        <button
                            className="text-[12px] font-secondary text-[#7A3E2C] bg-[#EDE5DD] rounded-md px-3 py-1"
                            onClick={() => setShowDatePicker(true)}
                        >
                            change
                        </button>
                    </div>

                    {/* Type */}
                    <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200">
                        <div className="flex flex-col">
                            <span className="text-[11px] font-secondary text-gray-500 uppercase tracking-wide">
                                Type of shoot
                            </span>
                            <span className="text-[14px] font-secondary text-[#2D2A29]">
                                {getShootTypeLabel()}
                            </span>
                        </div>
                        <button
                            className="text-[12px] font-secondary text-[#7A3E2C] bg-[#EDE5DD] rounded-md px-3 py-1"
                            onClick={() => setShowTypeModal(true)}
                        >
                            change
                        </button>
                    </div>

                    {/* Crew */}
                    <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200">
                        <div className="flex flex-col">
                            <span className="text-[11px] font-secondary text-gray-500 uppercase tracking-wide">
                                Crew
                            </span>
                            <span className="text-[14px] font-secondary text-[#2D2A29]">
                                {crew} person
                            </span>
                        </div>
                        <button
                            className="text-[12px] font-secondary text-[#7A3E2C] bg-[#EDE5DD] rounded-md px-3 py-1"
                            onClick={() => setShowCrewModal(true)}
                        >
                            change
                        </button>
                    </div>

                    {/* Price */}
                    <div className="flex justify-between items-center px-4 py-4">
                        <p className="text-[11px] font-secondary text-gray-500">
                            One Nights Instacation
                        </p>
                        <p className="text-[16px] font-secondary font-semibold text-[#2D2A29]">
                            Rp4.500.000
                        </p>
                    </div>
                </div>

                <p className="text-[14px] font-secondary text-gray-500 italic flex items-center gap-2">
                    <BadgePercent className="w-4 h-4" />
                    Prices include all fees
                </p>

                {/* DESKTOP ONLY BUTTON */}
                <Link href={`/houses/villa/${villa.id}/reserve`} className="hidden lg:block">
                    <Button className="w-full bg-[#7A3E2C] hover:bg-[#693424] text-white rounded-lg py-8">
                        <span className="text-3xl font-secondary">Reserve</span>
                    </Button>
                </Link>

                <p className="hidden lg:block text-[12px] text-center font-secondary italic">
                    You won't be charged yet
                </p>
            </Card>

            {/* ================= MOBILE STICKY RESERVE ================= */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40 bg-[#FCFBF7] border-t border-[#E7E6E2]">
                <div className="flex items-center justify-between px-4 py-5 md:py-3 max-w-7xl mx-auto w-full">
                    {/* LEFT */}
                    <div className="flex flex-col">
                        <p className="text-[18px] font-semibold text-[#2D2A29] font-secondary leading-tight">
                            {villa.weekdayPrice}
                        </p>
                        <p className="text-[12px] text-[#959290] font-secondary leading-tight">
                            1 night Instacation, {formatDateRangeText()}
                        </p>
                    </div>

                    {/* RIGHT */}
                    <Link
                        href={`/houses/villa/${villa.id}/reserve`}
                        className="ml-4 flex-shrink-0"
                    >
                        <Button className="bg-[#7A3E2C] hover:bg-[#693424] text-white rounded-full px-10 md:px-6 py-5 md:py-2 font-secondary font-bold text-sm">
                            reserve
                        </Button>
                    </Link>
                </div>
            </div>


            {/* Padding agar konten tidak ketutup sticky */}
            <style>{`
                @media (max-width: 1024px) {
                    body {
                        padding-bottom: 90px;
                    }
                }
            `}</style>

            {/* ================= MODALS (TIDAK DIUBAH) ================= */}
            {/* SEMUA MODAL: DATE, CREW, TYPE — TETAP SEPERTI SOURCE ASLI */}

            {/* 1) INSTACATION → RANGE */}
            {showDatePicker && !isSessionShoot && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
                    onClick={() => setShowDatePicker(false)}
                >
                    <div
                        className="bg-[#FCFBF7] rounded-2xl shadow-xl border border-gray-200 p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DateRange
                            ranges={[
                                {
                                    startDate: checkIn || new Date(),
                                    endDate: checkOut || checkIn || new Date(),
                                    key: "selection",
                                },
                            ]}
                            onChange={handleDateChange}
                            rangeColors={[checkIn ? "#7A3E2C" : "transparent"]}
                            months={2}
                            direction="horizontal"
                            moveRangeOnFirstSelection={false}
                            editableDateInputs={false}
                        />
                    </div>
                </div>
            )}

            {/* 2) SESSION SHOOT → SINGLE DATE */}
            {showDatePicker && isSessionShoot && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
                    onClick={() => setShowDatePicker(false)}
                >
                    <div
                        className="bg-[#FCFBF7] rounded-2xl shadow-xl border border-gray-200 p-0"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-[580px] bg-[#FCFBF7] rounded-2xl font-secondary flex overflow-hidden">
                            <div className="w-[40%] bg-[#F9F8F4] flex flex-col justify-start gap-3 p-5 border-r border-gray-200">
                                <div className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer" onClick={() => applySingleDate(today)}>
                                    <p className="font-semibold text-gray-800">Today</p>
                                    <p className="text-sm text-gray-500">{format(today, "MMMM dd")}</p>
                                </div>

                                <div
                                    className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
                                    onClick={() => applySingleDate(tomorrow)}
                                >
                                    <p className="font-semibold text-gray-800">Tomorrow</p>
                                    <p className="text-sm text-gray-500">{format(tomorrow, "MMMM dd")}</p>
                                </div>

                                <div
                                    className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
                                    onClick={() => applySingleDate(weekendStart)}
                                >
                                    <p className="font-semibold text-gray-800">This weekend</p>
                                    <p className="text-sm text-gray-500">
                                        {`${format(weekendStart, "MMMM dd")} - ${format(weekendEnd, "dd")}`}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 bg-white p-5">
                                <Calendar
                                    date={date || new Date()}
                                    onChange={(d: Date) => applySingleDate(d)}
                                    color="#7A3E2C"
                                    monthDisplayFormat="MMMM yyyy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CREW MODAL */}
            {showCrewModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
                    onClick={() => setShowCrewModal(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#FCFBF7] rounded-3xl shadow-md border border-gray-200 px-8 py-6 w-[340px] sm:w-[380px] font-secondary text-gray-800"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-[15px] font-medium text-gray-800">Add Crew</p>
                            <div className="flex items-center gap-4 text-gray-600">
                                <button
                                    onClick={() => setCrew(Math.max(0, crew - 1))}
                                    disabled={crew === 0}
                                    className="text-[15px] hover:text-gray-800 disabled:opacity-40 transition"
                                >
                                    <FiMinus size={14} />
                                </button>
                                <span className="text-[15px] w-3 text-center">{crew}</span>
                                <button onClick={() => setCrew(crew + 1)} className="text-[15px] hover:text-gray-800 transition">
                                    <FiPlus size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="border-b border-gray-400 mt-3" />
                    </div>
                </div>
            )}

            {/* TYPE OF SHOOT MODAL */}
            {showTypeModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
                    onClick={() => setShowTypeModal(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#FCFBF7] rounded-3xl shadow-md border border-gray-200 px-8 py-6 w-[340px] sm:w-[380px] font-secondary text-gray-800"
                    >
                        {/* Instacation row */}
                        <button type="button" onClick={() => setOpenShootSection("instacation")} className="w-full text-left">
                            <div className="flex justify-between items-center">
                                <p className="text-[17px] font-medium text-gray-900">Instacation</p>
                                {openShootSection === "instacation" ? (
                                    <FiMinus size={16} className="text-gray-800" />
                                ) : (
                                    <FiPlus size={16} className="text-gray-800" />
                                )}
                            </div>
                        </button>

                        {/* Instacation content + SELECT button */}
                        {openShootSection === "instacation" && (
                            <div className="mt-2 flex justify-between items-start">
                                <p className="text-[13px] text-gray-600 leading-snug">
                                    This package include
                                    <br />
                                    stay &amp; shooting session
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShootType("instacation")
                                        setShowTypeModal(false)
                                    }}
                                    className={`text-[12px] ${shootType === "instacation" ? "text-gray-500" : "text-gray-700 underline"}`}
                                >
                                    {shootType === "instacation" ? "selected" : "select"}
                                </button>
                            </div>
                        )}

                        <div className="border-b border-gray-300 my-4" />

                        {/* Session shoot row */}
                        <button type="button" onClick={() => setOpenShootSection("session")} className="w-full text-left">
                            <div className="flex justify-between items-center">
                                <p className="text-[17px] font-medium text-gray-900">Session shoot</p>
                                {openShootSection === "session" ? (
                                    <FiMinus size={16} className="text-gray-800" />
                                ) : (
                                    <FiPlus size={16} className="text-gray-800" />
                                )}
                            </div>
                        </button>

                        {/* Session shoot dropdown */}
                        {openShootSection === "session" && (
                            <div className="mt-3 space-y-3 text-[13px]">
                                {/* Morning */}
                                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                    <div>
                                        <p className="text-gray-700">Morning session (5hr)</p>
                                        <p className="font-semibold text-gray-900">07am—12pm</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShootType("session-morning")
                                            setShowTypeModal(false)
                                        }}
                                        className={`text-[12px] ${shootType === "session-morning" ? "text-gray-500" : "text-gray-700 underline"
                                            }`}
                                    >
                                        {shootType === "session-morning" ? "selected" : "select"}
                                    </button>
                                </div>

                                {/* Afternoon */}
                                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                    <div>
                                        <p className="text-gray-700">Afternoon session (5hr)</p>
                                        <p className="font-semibold text-gray-900">01pm—06pm</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShootType("session-afternoon")
                                            setShowTypeModal(false)
                                        }}
                                        className={`text-[12px] ${shootType === "session-afternoon" ? "text-gray-500" : "text-gray-700 underline"
                                            }`}
                                    >
                                        {shootType === "session-afternoon" ? "selected" : "select"}
                                    </button>
                                </div>

                                {/* Full day */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-700">Full day session (11hr)</p>
                                        <p className="font-semibold text-gray-900">07am—06pm</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShootType("session-fullday")
                                            setShowTypeModal(false)
                                        }}
                                        className={`text-[12px] ${shootType === "session-fullday" ? "text-gray-500" : "text-gray-700 underline"
                                            }`}
                                    >
                                        {shootType === "session-fullday" ? "selected" : "select"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
