"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgePercent, ChevronLeft, MapPin, Star } from "lucide-react"
import Link from "next/link"
import { DateRange, type Range } from "react-date-range"
import Calendar from "react-date-range/dist/components/Calendar"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { FiMinus, FiPlus } from "react-icons/fi"
import { addDays, format } from "date-fns"
import type { villas } from "@/app/data/villas"
import type { Dispatch, SetStateAction } from "react"
import Image from "next/image"

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
    const [showMobilePanel, setShowMobilePanel] = useState(false)

    const isSessionShoot =
        shootType === "session-morning" || shootType === "session-afternoon" || shootType === "session-fullday"

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
                            <span className="text-[14px] font-secondary text-[#2D2A29]">{formatDateRangeText()}</span>
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
                            <span className="text-[11px] font-secondary text-gray-500 uppercase tracking-wide">Type of shoot</span>
                            <span className="text-[14px] font-secondary text-[#2D2A29]">{getShootTypeLabel()}</span>
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
                            <span className="text-[11px] font-secondary text-gray-500 uppercase tracking-wide">Crew</span>
                            <span className="text-[14px] font-secondary text-[#2D2A29]">{crew} person</span>
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
                        <p className="text-[11px] font-secondary text-gray-500">One Nights Instacation</p>
                        <p className="text-[16px] font-secondary font-semibold text-[#2D2A29]">Rp4.500.000</p>
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

                <p className="hidden lg:block text-[12px] text-center font-secondary italic">You won't be charged yet</p>
            </Card>

            {/* ================= MOBILE STICKY RESERVE ================= */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40 bg-[#FCFBF7] border-t border-[#E7E6E2]">
                <div className="flex items-center justify-between px-4 py-4 md:py-3 max-w-7xl mx-auto w-full">
                    {/* LEFT */}
                    <div className="flex flex-col">
                        <p className="text-[18px] font-semibold text-[#2D2A29] font-secondary leading-tight">
                            {villa.weekdayPrice}
                        </p>
                        <p className="text-[12px] text-[#959290] font-secondary leading-tight">
                            1 night Instacation, {formatDateRangeText()}
                        </p>
                    </div>

                    {/* RIGHT - Changed from Link to button to show panel instead */}
                    <button
                        onClick={() => setShowMobilePanel(true)}
                        className="ml-4 flex-shrink-0 bg-[#7A3E2C] hover:bg-[#693424]
                       text-white rounded-full px-12 md:px-6 py-3 md:py-2
                       font-secondary font-bold text-sm transition"
                    >
                        reserve
                    </button>
                </div>
            </div>

            {/* ================= MOBILE PANEL (NEW) ================= */}
            {showMobilePanel && (
                <div className="fixed inset-0 lg:hidden z-50 bg-white flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#E7E6E2] sticky top-0 bg-white">
                        {/* LEFT - BACK BUTTON */}
                        <button
                            onClick={() => setShowMobilePanel(false)}
                            className="text-[#2D2A29] hover:bg-gray-100
                   py-2 pr-2 pl-0 
                   rounded-full transition"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        {/* RIGHT - LOGO ICON */}
                        <Image src="/images/kunjung.svg" alt="Kunjung" width={130} height={28} priority />
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 pb-32 font-secondary">
                        {/* MAIN CARD */}
                        <div className="border border-[#E7E6E2] rounded-2xl p-4 mb-6">
                            {/* Villa Info */}
                            <div className="flex gap-4 mb-4">
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image src={villa.image || "/placeholder.svg"} alt={villa.name} fill className="object-cover" />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    {/* TOP: Name & Location */}
                                    <div>
                                        <h3 className="font-primary font-semibold text-[22px] text-[#2D2A29] mb-1">{villa.name}</h3>

                                        <p className="text-sm text-[#959290] flex items-center gap-1">
                                            <MapPin size={14} className="text-[#959290]" />
                                            {villa.location}
                                        </p>
                                    </div>

                                    {/* BOTTOM: Rating */}
                                    <div className="flex items-center gap-1 text-[#2D2A29] mt-2">
                                        <Star size={14} className="fill-[#2D2A29]" />
                                        <span className="text-sm font-medium">
                                            {villa.rating} ({villa.reviews})
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-[#7A7A75] leading-relaxed mb-6">{villa.description}</p>

                            <div className="border-t border-[#E7E6E2] my-2" />

                            {/* Dates */}
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-[#2D2A29]">Dates</h4>
                                <button
                                    onClick={() => setShowDatePicker(true)}
                                    className="text-sm font-medium bg-[#E7E6E2] px-8 py-1.5 rounded-full"
                                >
                                    change
                                </button>
                            </div>

                            <p className="text-[#959290] mb-4">
                                {isSessionShoot && date
                                    ? format(date, "dd MMM yyyy")
                                    : checkIn && checkOut
                                        ? `${checkIn.toLocaleDateString("id-ID", {
                                            day: "2-digit",
                                            month: "short",
                                        })} - ${checkOut.toLocaleDateString("id-ID", {
                                            day: "2-digit",
                                            month: "short",
                                        })}, ${checkOut.getFullYear()}`
                                        : "Add dates"}
                            </p>

                            <div className="border-t border-[#E7E6E2] my-2" />

                            {/* Type of Shoot */}
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-[#2D2A29]">Type of shoot</h4>
                                <button
                                    onClick={() => setShowTypeModal(true)}
                                    className="text-sm font-medium bg-[#E7E6E2] px-8 py-1.5 rounded-full"
                                >
                                    change
                                </button>
                            </div>

                            <p className="text-[#959290] mb-4">{getShootTypeLabel()}</p>

                            <div className="border-t border-[#E7E6E2] my-2" />

                            {/* Crew */}
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-[#2D2A29]">Crew</h4>
                                <button
                                    onClick={() => setShowCrewModal(true)}
                                    className="text-sm font-medium bg-[#E7E6E2] px-8 py-1.5 rounded-full"
                                >
                                    change
                                </button>
                            </div>

                            <p className="text-[#959290] mb-4">{crew > 0 ? `${crew} person` : "Add crew"}</p>

                            <div className="border-t border-[#E7E6E2] my-2" />

                            {/* Price */}
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-[#2D2A29]">Price</span>
                                <span className="font-medium text-[#2D2A29]">Rp4.500.000</span>
                            </div>
                        </div>

                        {/* PRICE DETAILS (OUTSIDE CARD) */}
                        <div className="px-1">
                            <p className="text-[16px] font-medium text-[#2D2A29] mb-1">Price details</p>

                            <div className="flex items-center justify-between text-[16px] mb-4 text-[#2D2A29]">
                                <span>1 night x Rp4.500.000</span>
                                <span>Rp4.500.000</span>
                            </div>

                            <div className="border-t border-[#E7E6E2] pt-4 flex items-center justify-between">
                                <span className="font-bold text-[20px] text-[#2D2A29]">TOTAL</span>
                                <span className="font-bold text-[20px] text-[#2D2A29]">Rp4.500.000</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer with Buttons */}
                    <div className="fixed bottom-0 left-0 right-0 lg:hidden flex gap-3 p-4 bg-white border-t border-[#E7E6E2] z-50">
                        {/* Cancel */}
                        <Button
                            variant="outline"
                            onClick={() => setShowMobilePanel(false)}
                            className="flex-1 h-12 border-[#2D2A29] text-[#2D2A29] font-secondary font-bold"
                        >
                            cancel
                        </Button>

                        {/* Next */}
                        <Button asChild className="flex-1 h-12 bg-[#7A3E2C] hover:bg-[#693424] text-white font-secondary font-bold">
                            <Link href={`/houses/villa/${villa.id}/reserve`}>next</Link>
                        </Button>
                    </div>
                </div>
            )}

            {/* Padding agar konten tidak ketutup sticky */}
            <style>{`
                @media (max-width: 1024px) {
                    body {
                        padding-bottom: 90px;
                    }
                }
            `}</style>

            {/* ================= MODALS (DESKTOP & MOBILE) ================= */}

            {/* ===================== */}
            {/* DATE PICKER MODAL */}
            {/* ===================== */}
            {showDatePicker && !isSessionShoot && (
                <div
                    className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
                    onClick={() => setShowDatePicker(false)} // backdrop close
                >
                    <div
                        className="
                relative
                w-full md:w-auto
                bg-white md:bg-[#FCFBF7]
                rounded-t-3xl md:rounded-2xl
                shadow-xl
                border border-gray-200
                p-4 md:p-6 md:px-10

                h-[85vh] md:h-auto
                min-h-[70vh] md:min-h-[20vh]
                max-h-[90vh]

                overflow-y-auto
                pb-24
            "
                        onClick={(e) => e.stopPropagation()} // prevent close on content click
                    >
                        {/* ===================== */}
                        {/* DRAG INDICATOR – MOBILE */}
                        {/* ===================== */}
                        <div className="md:hidden flex justify-center mb-3">
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        {/* ===================== */}
                        {/* MOBILE – 2 MONTHS (VERTICAL) */}
                        {/* ===================== */}
                        <div className="md:hidden flex justify-center">
                            <DateRange
                                ranges={[
                                    {
                                        startDate: checkIn || new Date(),
                                        endDate: checkOut || checkIn || new Date(),
                                        key: "selection",
                                    },
                                ]}
                                onChange={(item) => {
                                    setCheckIn(item.selection.startDate)
                                    setCheckOut(item.selection.endDate)
                                    // ❌ JANGAN TUTUP MODAL DI SINI
                                }}
                                rangeColors={[checkIn ? "#7A3E2C" : "transparent"]}
                                months={2}
                                direction="vertical"
                                moveRangeOnFirstSelection={false}
                                editableDateInputs={false}
                            />
                        </div>

                        {/* ===================== */}
                        {/* DESKTOP – CENTER MODAL */}
                        {/* ===================== */}
                        <div className="hidden md:flex justify-center calendar-wrapper">
                            <DateRange
                                ranges={[
                                    {
                                        startDate: checkIn || new Date(),
                                        endDate: checkOut || checkIn || new Date(),
                                        key: "selection",
                                    },
                                ]}
                                onChange={(item) => {
                                    setCheckIn(item.selection.startDate)
                                    setCheckOut(item.selection.endDate)
                                }}
                                rangeColors={[checkIn ? "#7A3E2C" : "transparent"]}
                                months={2}
                                direction="horizontal"
                                moveRangeOnFirstSelection={false}
                                editableDateInputs={false}
                            />

                            {/* FIX BACKGROUND DESKTOP */}
                            <style jsx global>{`
                    .calendar-wrapper .rdrCalendarWrapper {
                        background-color: #FCFBF7;
                    }
                `}</style>
                        </div>

                        {/* ===================== */}
                        {/* MOBILE FOOTER */}
                        {/* ===================== */}
                        <div className="fixed bottom-0 left-0 right-0 md:hidden flex gap-3 p-4 bg-white border-t border-[#E7E6E2] z-50">
                            {/* Cancel */}
                            <button
                                onClick={() => setShowDatePicker(false)}
                                className="flex-1 h-12 border border-[#2D2A29] text-[#2D2A29] font-secondary font-bold rounded-ms text-sm"
                            >
                                cancel
                            </button>

                            {/* Next */}
                            <button
                                disabled={!checkIn}
                                onClick={() => setShowDatePicker(false)}
                                className="
                        flex-1 h-12 rounded-md text-sm
                        bg-[#7A3E2C] hover:bg-[#693424]
                        text-white font-secondary font-bold
                        disabled:opacity-40 disabled:cursor-not-allowed
                    "
                            >
                                next
                            </button>
                        </div>
                    </div>
                </div>
            )}



            {/* ===================== */}
            {/* 2) SESSION SHOOT → SINGLE DATE */}
            {/* ===================== */}
            {showDatePicker && isSessionShoot && (
                <div
                    className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
                    onClick={() => setShowDatePicker(false)} // backdrop close
                >
                    <div
                        className="
                relative
                w-full md:w-auto
                bg-white md:bg-[#FCFBF7]
                rounded-t-3xl md:rounded-2xl
                shadow-[0_12px_40px_rgba(0,0,0,0.18)]
                border border-gray-200

                h-[88vh] md:h-auto
                min-h-[72vh] md:min-h-[20vh]
                max-h-[92vh]

                overflow-hidden
                pb-28 md:pb-0
            "
                        onClick={(e) => e.stopPropagation()} // prevent close on content click
                    >
                        {/* ===================== */}
                        {/* DRAG INDICATOR – MOBILE */}
                        {/* ===================== */}
                        <div className="md:hidden flex justify-center py-3 border-b border-gray-200 bg-white">
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        {/* ===================== */}
                        {/* MOBILE LAYOUT */}
                        {/* ===================== */}
                        <div className="md:hidden flex flex-col h-full bg-white">
                            {/* QUICK SELECT */}
                            <div className="px-4 pt-4 pb-3 space-y-3 border-b border-gray-200">
                                {[
                                    {
                                        label: "Today",
                                        date: today,
                                        subtitle: format(today, "MMMM dd"),
                                    },
                                    {
                                        label: "Tomorrow",
                                        date: tomorrow,
                                        subtitle: format(tomorrow, "MMMM dd"),
                                    },
                                    {
                                        label: "This weekend",
                                        date: weekendStart,
                                        subtitle: `${format(
                                            weekendStart,
                                            "MMMM dd"
                                        )} - ${format(weekendEnd, "dd")}`,
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        onClick={() => setDate(item.date)} // ❌ JANGAN CLOSE
                                        className="
                                p-4 rounded-2xl
                                border border-gray-200
                                bg-white
                                hover:bg-gray-50
                                transition
                                cursor-pointer
                            "
                                    >
                                        <p className="font-semibold text-gray-900">
                                            {item.label}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* CALENDAR */}
                            <div className="flex-1 bg-white px-4 py-4 overflow-y-auto">
                                <div className="w-full rounded-2xl border border-gray-200 bg-white py-4">
                                    <div className="flex justify-center">
                                        <div className="inline-block">
                                            <Calendar
                                                date={date || new Date()}
                                                onChange={(d: Date) => setDate(d)} // ❌ JANGAN CLOSE
                                                color="#7A3E2C"
                                                monthDisplayFormat="MMMM yyyy"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ===================== */}
                        {/* DESKTOP LAYOUT */}
                        {/* ===================== */}
                        <div className="hidden md:flex w-[600px] bg-[#FCFBF7] rounded-2xl font-secondary overflow-hidden">
                            {/* LEFT */}
                            <div className="w-[42%] bg-[#F9F8F4] flex flex-col gap-3 p-6 border-r border-gray-200">
                                <p className="text-sm font-semibold text-gray-600 mb-1">
                                    Quick select
                                </p>

                                <div
                                    className="p-4 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer transition"
                                    onClick={() => setDate(today)}
                                >
                                    <p className="font-semibold text-gray-900">Today</p>
                                    <p className="text-sm text-gray-500">
                                        {format(today, "MMMM dd")}
                                    </p>
                                </div>

                                <div
                                    className="p-4 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer transition"
                                    onClick={() => setDate(tomorrow)}
                                >
                                    <p className="font-semibold text-gray-900">
                                        Tomorrow
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {format(tomorrow, "MMMM dd")}
                                    </p>
                                </div>

                                <div
                                    className="p-4 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer transition"
                                    onClick={() => setDate(weekendStart)}
                                >
                                    <p className="font-semibold text-gray-900">
                                        This weekend
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {`${format(
                                            weekendStart,
                                            "MMMM dd"
                                        )} - ${format(weekendEnd, "dd")}`}
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="flex-1 bg-white p-6">
                                <div className="rounded-2xl border border-gray-200 p-3">
                                    <Calendar
                                        date={date || new Date()}
                                        onChange={(d: Date) => setDate(d)}
                                        color="#7A3E2C"
                                        monthDisplayFormat="MMMM yyyy"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ===================== */}
                        {/* MOBILE FOOTER */}
                        {/* ===================== */}
                        <div className="fixed bottom-0 left-0 right-0 md:hidden flex gap-3 p-4 bg-white border-t border-[#E7E6E2] z-50">
                            {/* Cancel */}
                            <button
                                onClick={() => setShowDatePicker(false)}
                                className="flex-1 h-12 border border-[#2D2A29] text-[#2D2A29] font-secondary text-sm font-bold rounded-md"
                            >
                                cancel
                            </button>

                            {/* Next */}
                            <button
                                disabled={!date}
                                onClick={() => setShowDatePicker(false)}
                                className="
                        flex-1 h-12 rounded-md text-sm
                        bg-[#7A3E2C] hover:bg-[#693424]
                        text-white font-secondary font-bold
                        disabled:opacity-40 disabled:cursor-not-allowed
                    "
                            >
                                next
                            </button>
                        </div>
                    </div>
                </div>
            )}



            {/* ===================== */}
            {/* CREW MODAL */}
            {/* ===================== */}
            {showCrewModal && (
                <div
                    className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
                    onClick={() => setShowCrewModal(false)}
                >
                    {/* ================================================= */}
                    {/* 📱 MOBILE – BOTTOM PANEL (SAMA DENGAN GUEST) */}
                    {/* ================================================= */}
                    <div
                        className="
                md:hidden
                w-full
                bg-[#FCFBF7]
                rounded-t-3xl
                shadow-xl
                border border-gray-200
                p-4

                h-[65vh]
                min-h-[60vh]
                max-h-[85vh]

                overflow-y-auto
            "
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* DRAG INDICATOR */}
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        {/* CONTENT */}
                        <div className="px-1 pb-28">
                            <div className="border border-gray-700 rounded-2xl p-5 bg-[#FCFBF7]">
                                <h2 className="font-serif text-2xl text-[#4A3B2D] mb-4">
                                    Who?
                                </h2>

                                <div className="border border-gray-400 rounded-xl px-4 py-4 flex items-center justify-between">
                                    {/* LEFT */}
                                    <div>
                                        <p className="font-medium text-[#4A3B2D]">
                                            Add Crew
                                        </p>

                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() =>
                                                setCrew(Math.max(0, crew - 1))
                                            }
                                            disabled={crew === 0}
                                            className="w-9 h-9 rounded-full border flex items-center justify-center disabled:opacity-40"
                                        >
                                            <FiMinus size={14} />
                                        </button>

                                        <span className="w-6 text-center font-medium">
                                            {crew}
                                        </span>

                                        <button
                                            onClick={() => setCrew(crew + 1)}
                                            className="w-9 h-9 rounded-full border flex items-center justify-center"
                                        >
                                            <FiPlus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER – SAME AS GUEST */}
                        <div className="fixed bottom-0 left-0 right-0 md:hidden flex gap-3 p-4 bg-white border-t border-[#E7E6E2] z-50">
                            <button
                                onClick={() => setShowCrewModal(false)}
                                className="flex-1 h-12 border border-[#2D2A29] text-[#2D2A29] font-secondary font-bold rounded-md text-sm"
                            >
                                cancel
                            </button>

                            <button
                                onClick={() => setShowCrewModal(false)}
                                className="flex-1 h-12 bg-[#7A3E2C] hover:bg-[#693424] text-white font-secondary font-bold rounded-md text-sm"
                            >
                                next
                            </button>
                        </div>
                    </div>

                    {/* ================================================= */}
                    {/* 🖥️ DESKTOP – MODAL TENGAH (TETAP) */}
                    {/* ================================================= */}
                    <div className="hidden md:flex items-center justify-center w-full h-full">
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#FCFBF7] rounded-3xl shadow-md border border-gray-200 px-8 py-6 w-[340px] sm:w-[380px] font-secondary text-gray-800"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-[15px] font-medium text-gray-800">
                                    Add Crew
                                </p>

                                <div className="flex items-center gap-4 text-gray-600">
                                    <button
                                        onClick={() =>
                                            setCrew(Math.max(0, crew - 1))
                                        }
                                        disabled={crew === 0}
                                        className="hover:text-gray-800 disabled:opacity-40 transition"
                                    >
                                        <FiMinus size={14} />
                                    </button>

                                    <span className="text-[15px] w-3 text-center">
                                        {crew}
                                    </span>

                                    <button
                                        onClick={() => setCrew(crew + 1)}
                                        className="hover:text-gray-800 transition"
                                    >
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="border-b border-gray-400 mt-3" />
                        </div>
                    </div>
                </div>
            )}


            {showTypeModal && (
                <div
                    className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
                    onClick={() => setShowTypeModal(false)}
                >
                    {/* ===================== */}
                    {/* 🔥 MOBILE – BOTTOM PANEL */}
                    {/* ===================== */}
                    <div
                        className="
                md:hidden
                w-full
                bg-white md:bg-[#FCFBF7]
                rounded-t-3xl
                shadow-xl
                border border-gray-200
                p-4

                h-[70vh]
                min-h-[65vh]
                max-h-[90vh]

                overflow-y-auto
            "
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* DRAG INDICATOR */}
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        {/* ===================== */}
                        {/* CONTENT CARD */}
                        {/* ===================== */}
                        <div className="px-1">
                            <div className="border border-gray-700 rounded-2xl p-5 bg-white">
                                {/* TITLE */}
                                <h2 className="font-serif text-2xl text-[#4A3B2D] mb-4">
                                    Type of shoot?
                                </h2>

                                <div className="border-b border-gray-400 mb-4" />

                                {/* ===================== */}
                                {/* INSTACATION */}
                                {/* ===================== */}
                                <button
                                    type="button"
                                    onClick={() => setOpenShootSection("instacation")}
                                    className="w-full text-left"
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] font-medium text-[#4A3B2D]">
                                            Instacation
                                        </p>
                                        {openShootSection === "instacation" ? (
                                            <FiMinus size={16} />
                                        ) : (
                                            <FiPlus size={16} />
                                        )}
                                    </div>
                                </button>

                                {openShootSection === "instacation" && (
                                    <div className="mt-3 flex justify-between items-start">
                                        <p className="text-[13px] text-gray-600 leading-snug">
                                            This package include
                                            <br />
                                            stay &amp; shooting session
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShootType("instacation")
                                            }}
                                            className={`text-[12px] ${shootType === "instacation"
                                                ? "text-gray-400"
                                                : "text-gray-700 underline"
                                                }`}
                                        >
                                            {shootType === "instacation"
                                                ? "selected"
                                                : "select"}
                                        </button>
                                    </div>
                                )}

                                <div className="border-b border-gray-300 my-5" />

                                {/* ===================== */}
                                {/* SESSION SHOOT */}
                                {/* ===================== */}
                                <button
                                    type="button"
                                    onClick={() => setOpenShootSection("session")}
                                    className="w-full text-left"
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] font-medium text-[#4A3B2D]">
                                            Session shoot
                                        </p>
                                        {openShootSection === "session" ? (
                                            <FiMinus size={16} />
                                        ) : (
                                            <FiPlus size={16} />
                                        )}
                                    </div>
                                </button>

                                {openShootSection === "session" && (
                                    <div className="mt-4 space-y-4 text-[13px]">
                                        {/* Morning */}
                                        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                                            <div>
                                                <p className="text-gray-700">
                                                    Morning session (5hr)
                                                </p>
                                                <p className="font-semibold text-gray-900">
                                                    07am—12pm
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setShootType("session-morning")}
                                                className={`text-[12px] ${shootType === "session-morning"
                                                    ? "text-gray-400"
                                                    : "text-gray-700 underline"
                                                    }`}
                                            >
                                                {shootType === "session-morning"
                                                    ? "selected"
                                                    : "select"}
                                            </button>
                                        </div>

                                        {/* Afternoon */}
                                        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                                            <div>
                                                <p className="text-gray-700">
                                                    Afternoon session (5hr)
                                                </p>
                                                <p className="font-semibold text-gray-900">
                                                    01pm—06pm
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setShootType("session-afternoon")}
                                                className={`text-[12px] ${shootType === "session-afternoon"
                                                    ? "text-gray-400"
                                                    : "text-gray-700 underline"
                                                    }`}
                                            >
                                                {shootType === "session-afternoon"
                                                    ? "selected"
                                                    : "select"}
                                            </button>
                                        </div>

                                        {/* Full day */}
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-gray-700">
                                                    Full day session (11hr)
                                                </p>
                                                <p className="font-semibold text-gray-900">
                                                    07am—06pm
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setShootType("session-fullday")}
                                                className={`text-[12px] ${shootType === "session-fullday"
                                                    ? "text-gray-400"
                                                    : "text-gray-700 underline"
                                                    }`}
                                            >
                                                {shootType === "session-fullday"
                                                    ? "selected"
                                                    : "select"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ===================== */}
                        {/* FOOTER – SAME AS WHO */}
                        {/* ===================== */}
                        <div className="fixed bottom-0 left-0 right-0 md:hidden flex gap-3 p-4 bg-white border-t border-[#E7E6E2] z-50">
                            <button
                                onClick={() => setShowTypeModal(false)}
                                className="flex-1 h-12 border border-[#2D2A29] text-[#2D2A29] font-secondary font-bold rounded-md text-sm"
                            >
                                cancel
                            </button>

                            <button
                                onClick={() => setShowTypeModal(false)}
                                className="flex-1 h-12 bg-[#7A3E2C] hover:bg-[#693424] text-white font-secondary font-bold rounded-md text-sm"
                            >
                                next
                            </button>
                        </div>
                    </div>

                    {/* ===================== */}
                    {/* 🔥 DESKTOP – MODAL LAMA (TIDAK DIUBAH) */}
                    {/* ===================== */}
                    <div
                        className="hidden md:block bg-[#FCFBF7] rounded-3xl shadow-md border border-gray-200 px-8 py-6 w-[340px] sm:w-[380px] font-secondary text-gray-800"
                        onClick={(e) => e.stopPropagation()} // ✅ hanya di card
                    >
                        {/* Instacation row */}
                        <button
                            type="button"
                            onClick={() => setOpenShootSection("instacation")}
                            className="w-full text-left"
                        >
                            <div className="flex justify-between items-center">
                                <p className="text-[17px] font-medium text-gray-900">
                                    Instacation
                                </p>
                                {openShootSection === "instacation" ? (
                                    <FiMinus size={16} />
                                ) : (
                                    <FiPlus size={16} />
                                )}
                            </div>
                        </button>

                        {openShootSection === "instacation" && (
                            <div className="mt-2 flex justify-between items-start">
                                <p className="text-[13px] text-gray-600 leading-snug">
                                    This package include
                                    <br />
                                    stay &amp; shooting session
                                </p>

                                <button
                                    onClick={() => {
                                        setShootType("instacation")
                                        setShowTypeModal(false)
                                    }}
                                    className={`text-[12px] ${shootType === "instacation"
                                        ? "text-gray-500"
                                        : "text-gray-700 underline"
                                        }`}
                                >
                                    {shootType === "instacation"
                                        ? "selected"
                                        : "select"}
                                </button>
                            </div>
                        )}

                        <div className="border-b border-gray-300 my-4" />

                        {/* Session shoot */}
                        <button
                            type="button"
                            onClick={() => setOpenShootSection("session")}
                            className="w-full text-left"
                        >
                            <div className="flex justify-between items-center">
                                <p className="text-[17px] font-medium text-gray-900">
                                    Session shoot
                                </p>
                                {openShootSection === "session" ? (
                                    <FiMinus size={16} />
                                ) : (
                                    <FiPlus size={16} />
                                )}
                            </div>
                        </button>

                        {openShootSection === "session" && (
                            <div className="mt-3 space-y-3 text-[13px]">
                                {/* Morning */}
                                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                    <div>
                                        <p className="text-gray-700">
                                            Morning session (5hr)
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                            07am—12pm
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShootType("session-morning")
                                            setShowTypeModal(false)
                                        }}
                                        className={`text-[12px] ${shootType === "session-morning"
                                            ? "text-gray-500"
                                            : "text-gray-700 underline"
                                            }`}
                                    >
                                        {shootType === "session-morning"
                                            ? "selected"
                                            : "select"}
                                    </button>
                                </div>

                                {/* Afternoon */}
                                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                    <div>
                                        <p className="text-gray-700">
                                            Afternoon session (5hr)
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                            01pm—06pm
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShootType("session-afternoon")
                                            setShowTypeModal(false)
                                        }}
                                        className={`text-[12px] ${shootType === "session-afternoon"
                                            ? "text-gray-500"
                                            : "text-gray-700 underline"
                                            }`}
                                    >
                                        {shootType === "session-afternoon"
                                            ? "selected"
                                            : "select"}
                                    </button>
                                </div>

                                {/* Full day */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-700">
                                            Full day session (11hr)
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                            07am—06pm
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShootType("session-fullday")
                                            setShowTypeModal(false)
                                        }}
                                        className={`text-[12px] ${shootType === "session-fullday"
                                            ? "text-gray-500"
                                            : "text-gray-700 underline"
                                            }`}
                                    >
                                        {shootType === "session-fullday"
                                            ? "selected"
                                            : "select"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
            }


        </>
    )
}
