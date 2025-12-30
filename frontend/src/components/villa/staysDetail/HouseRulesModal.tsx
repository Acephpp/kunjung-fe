"use client"

import { useEffect, useRef, useState } from "react"
import {
    X,
    Clock,
    Users,
    Ban,
    Moon,
    CameraOff,
    Cigarette,
    DoorOpen,
    Power,
    Key,
    Lock,
} from "lucide-react"

interface HouseRulesModalProps {
    open: boolean
    onClose: () => void
}

export default function HouseRulesModal({
    open,
    onClose,
}: HouseRulesModalProps) {
    const startY = useRef(0)
    const [translateY, setTranslateY] = useState(0)
    const [dragging, setDragging] = useState(false)

    useEffect(() => {
        if (!open) setTranslateY(0)
    }, [open])

    if (!open) return null

    /* ================= MOBILE DRAG ================= */
    const handleTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY
        setDragging(true)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!dragging) return
        const diff = e.touches[0].clientY - startY.current
        if (diff > 0) setTranslateY(diff)
    }

    const handleTouchEnd = () => {
        setDragging(false)
        if (translateY > 120) {
            onClose()
        } else {
            setTranslateY(0)
        }
    }

    return (
        <div className="fixed inset-0 z-50">
            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* ================= MOBILE BOTTOM SHEET ================= */}
            <div
                className="
                    fixed left-0 right-0 md:hidden
                    top-[64px]
                    h-[calc(100dvh-64px)]
                    bg-[#FCFBF7]
                    rounded-t-3xl
                    shadow-2xl
                    flex flex-col
                    transition-transform duration-300
                "
                style={{ transform: `translateY(${translateY}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* HANDLE */}
                <div className="flex justify-center py-3">
                    <div className="w-12 h-1.5 rounded-full bg-[#D6D3CE]" />
                </div>

                {/* TITLE */}
                <h2 className="px-6 text-[22px] font-secondary font-semibold text-center mb-4">
                    House rules
                </h2>

                {/* CONTENT */}
                <div className="px-6 pb-8 overflow-y-auto">
                    <p className="text-[15px] text-[#6B6B6B] mb-8">
                        You’ll be staying in someone’s home, so please treat it
                        with care and respect.
                    </p>

                    {/* CHECK IN */}
                    <h3 className="font-secondary font-semibold text-[17px] mb-4">
                        Checking in and out
                    </h3>

                    <ul className="space-y-4 mb-8">
                        <li className="flex gap-4 items-center">
                            <Clock className="w-5 h-5" />
                            <span>Check-in after 3:00 PM</span>
                        </li>
                        <li className="flex gap-4 items-center">
                            <Clock className="w-5 h-5" />
                            <span>Checkout before 12:00 PM</span>
                        </li>
                        <li className="flex gap-4 items-center">
                            <DoorOpen className="w-5 h-5" />
                            <span>Self check-in with building staff</span>
                        </li>
                    </ul>

                    {/* DURING STAY */}
                    <h3 className="font-secondary font-semibold text-[17px] mb-4">
                        During your stay
                    </h3>

                    <ul className="space-y-4 mb-8">
                        <li className="flex gap-4 items-center">
                            <Users className="w-5 h-5" />
                            <span>12 guests maximum</span>
                        </li>
                        <li className="flex gap-4 items-center">
                            <Ban className="w-5 h-5" />
                            <span>No pets</span>
                        </li>
                        <li className="flex gap-4 items-start">
                            <Moon className="w-5 h-5 mt-1" />
                            <span>
                                Quiet hours <br />
                                <span className="text-[#8B8883]">
                                    10:00 PM – 6:00 AM
                                </span>
                            </span>
                        </li>
                        <li className="flex gap-4 items-center">
                            <CameraOff className="w-5 h-5" />
                            <span>No commercial photography</span>
                        </li>
                        <li className="flex gap-4 items-center">
                            <Cigarette className="w-5 h-5" />
                            <span>Smoking is allowed</span>
                        </li>
                    </ul>

                    {/* ADDITIONAL RULES */}
                    <h3 className="font-secondary font-semibold text-[17px] mb-4">
                        Additional rules
                    </h3>

                    <ul className="list-disc pl-5 space-y-2 text-[14px] text-[#8B8883] mb-8">
                        <li>Keeps all room safe and clean</li>
                        <li>
                            We do not condone adultery and other disrespectful
                            activities outside marriage.
                        </li>
                        <li>
                            Guests may not invite others to stay overnight
                            outside the booking.
                        </li>
                        <li>
                            No party allowed without the house owner’s consent
                        </li>
                        <li>Drugs and alcohol are strictly prohibited.</li>
                        <li>
                            Professional photoshoot / videoshoot will be extra
                            charged.
                        </li>
                        <li>
                            Smoking only in designated outdoor areas.
                        </li>
                    </ul>

                    {/* BEFORE LEAVE */}
                    <h3 className="font-secondary font-semibold text-[17px] mb-4">
                        Before you leave
                    </h3>

                    <ul className="space-y-4 mb-8">
                        <li className="flex gap-4 items-center">
                            <Power className="w-5 h-5" />
                            <span>Turn things off</span>
                        </li>
                        <li className="flex gap-4 items-center">
                            <Key className="w-5 h-5" />
                            <span>Return keys</span>
                        </li>
                        <li className="flex gap-4 items-center">
                            <Lock className="w-5 h-5" />
                            <span>Lock up</span>
                        </li>
                    </ul>

                    {/* ADDITIONAL REQUESTS */}
                    <h3 className="font-secondary font-semibold text-[17px] mb-4">
                        Additional requests
                    </h3>

                    <ul className="list-disc pl-5 space-y-2 text-[14px] text-[#8B8883]">
                        <li>Check-out is at 12:00 PM.</li>
                        <li>Tidy rooms and dispose trash properly.</li>
                        <li>Clean used dishes and turn off appliances.</li>
                        <li>Double-check rooms for belongings.</li>
                        <li>Inform staff when ready to depart.</li>
                    </ul>
                </div>
            </div>

            {/* ================= DESKTOP (ASLI, TIDAK DIUBAH) ================= */}
            <div className="hidden md:flex items-center justify-center h-full">
                <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-lg max-h-[90vh] flex flex-col">
                    <button
                        onClick={onClose}
                        className="absolute left-6 top-6"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="px-6 pt-6 pb-4">
                        <h2 className="text-[28px] font-secondary font-semibold text-center">
                            House rules
                        </h2>
                    </div>

                    <div className="px-6 py-6 overflow-y-auto">
                        <p className="text-[16px] text-[#6B6B6B] font-secondary mb-8">
                            You’ll be staying in someone’s home, so please
                            treat it with care and respect.
                        </p>

                        {/* CHECK IN */}
                        <h3 className="font-secondary font-semibold text-[18px] mb-4">
                            Checking in and out
                        </h3>

                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-4 items-center border-b pb-4">
                                <Clock className="w-5 h-5" />
                                <span className="font-secondary">
                                    Check-in after 3:00 PM
                                </span>
                            </li>
                            <li className="flex gap-4 items-center border-b pb-4">
                                <Clock className="w-5 h-5" />
                                <span className="font-secondary">
                                    Checkout before 12:00 PM
                                </span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <DoorOpen className="w-5 h-5" />
                                <span className="font-secondary">
                                    Self check-in with building staff
                                </span>
                            </li>
                        </ul>

                        {/* DURING STAY */}
                        <h3 className="font-secondary font-semibold text-[18px] mb-4">
                            During your stay
                        </h3>

                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-4 items-center border-b pb-4">
                                <Users className="w-5 h-5" />
                                <span className="font-secondary">
                                    12 guests maximum
                                </span>
                            </li>
                            <li className="flex gap-4 items-center border-b pb-4">
                                <Ban className="w-5 h-5" />
                                <span className="font-secondary">
                                    No pets
                                </span>
                            </li>
                            <li className="flex gap-4 items-start border-b pb-4">
                                <Moon className="w-5 h-5 mt-1" />
                                <span className="font-secondary">
                                    Quiet hours <br />
                                    <span className="text-[#8B8883]">
                                        10:00 PM – 6:00 AM
                                    </span>
                                </span>
                            </li>
                            <li className="flex gap-4 items-center border-b pb-4">
                                <CameraOff className="w-5 h-5" />
                                <span className="font-secondary">
                                    No commercial photography
                                </span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <Cigarette className="w-5 h-5" />
                                <span className="font-secondary">
                                    Smoking is allowed
                                </span>
                            </li>
                        </ul>

                        {/* ADDITIONAL RULES */}
                        <h3 className="font-secondary font-semibold text-[18px] mb-4">
                            Additional rules
                        </h3>

                        <ul className="list-disc pl-5 space-y-2 text-[14px] text-[#8B8883] font-secondary mb-8">
                            <li>Keeps all room safe and clean</li>
                            <li>
                                We do not condone adultery and other disrespectful
                                activities outside marriage.
                            </li>
                            <li>
                                Guests may not invite others to stay overnight
                                outside the booking.
                            </li>
                            <li>
                                No party allowed without the house owner’s consent
                            </li>
                            <li>Drugs and alcohol are strictly prohibited.</li>
                            <li>
                                Professional photoshoot / videoshoot will be extra
                                charged.
                            </li>
                            <li>
                                Smoking only in designated outdoor areas.
                            </li>
                        </ul>

                        {/* BEFORE LEAVE */}
                        <h3 className="font-secondary font-semibold text-[18px] mb-4">
                            Before you leave
                        </h3>

                        <ul className="space-y-4 mb-6">
                            <li className="flex gap-4 items-center border-b pb-4">
                                <Power className="w-5 h-5" />
                                <span className="font-secondary">
                                    Turn things off
                                </span>
                            </li>
                            <li className="flex gap-4 items-center border-b pb-4">
                                <Key className="w-5 h-5" />
                                <span className="font-secondary">
                                    Return keys
                                </span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <Lock className="w-5 h-5" />
                                <span className="font-secondary">
                                    Lock up
                                </span>
                            </li>
                        </ul>

                        {/* ADDITIONAL REQUESTS */}
                        <h3 className="font-secondary font-semibold text-[18px] mb-4">
                            Additional requests
                        </h3>

                        <ul className="list-disc pl-5 space-y-2 text-[14px] text-[#8B8883] font-secondary">
                            <li>Check-out is at 12:00 PM.</li>
                            <li>Tidy rooms and dispose trash properly.</li>
                            <li>Clean used dishes and turn off appliances.</li>
                            <li>Double-check rooms for belongings.</li>
                            <li>Inform staff when ready to depart.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
