"use client"

import { useEffect, useRef, useState } from "react"
import { X, Camera, BellOff } from "lucide-react"

interface SafetyPropertyModalProps {
    open: boolean
    onClose: () => void
}

export default function SafetyPropertyModal({
    open,
    onClose,
}: SafetyPropertyModalProps) {
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
                    Safety & property
                </h2>

                {/* CONTENT */}
                <div className="px-6 pb-8 overflow-y-auto">
                    <p className="text-[15px] text-[#6B6B6B] mb-8">
                        Avoid surprises by looking over these important details
                        about your host’s property.
                    </p>

                    <h3 className="font-secondary font-semibold text-[17px] mb-4">
                        Safety devices
                    </h3>

                    <ul className="space-y-6">
                        <li className="flex gap-4 items-start">
                            <Camera className="w-5 h-5 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-secondary">
                                    Exterior security cameras on property
                                </p>
                                <p className="text-[14px] text-[#8B8883] mt-1 leading-relaxed">
                                    “We have security cameras covering the front
                                    area of the house (carport, gate and front
                                    yard), the side of the house and the
                                    backyard area.”
                                </p>
                            </div>
                        </li>

                        <li className="flex gap-4 items-center">
                            <BellOff className="w-5 h-5" />
                            <span className="font-secondary">
                                No carbon monoxide alarm
                            </span>
                        </li>

                        <li className="flex gap-4 items-center">
                            <BellOff className="w-5 h-5" />
                            <span className="font-secondary">
                                No smoke alarm
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* ================= DESKTOP (ASLI, TIDAK DIUBAH) ================= */}
            <div className="hidden md:flex items-center justify-center h-full">
                <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-lg max-h-[90vh] flex flex-col">
                    <button
                        onClick={onClose}
                        className="absolute left-6 top-6 text-[#2D2A29]"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="px-6 pt-6 pb-4">
                        <h2 className="text-[28px] font-secondary font-semibold text-center">
                            Safety & property
                        </h2>
                    </div>

                    <div className="px-6 py-6 overflow-y-auto">
                        <p className="text-[16px] text-[#6B6B6B] font-secondary mb-8">
                            Avoid surprises by looking over these important details
                            about your host’s property.
                        </p>

                        <h3 className="font-secondary font-semibold text-[18px] mb-4">
                            Safety devices
                        </h3>

                        <ul className="space-y-6">
                            <li className="flex gap-4 items-start">
                                <Camera className="w-5 h-5 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-secondary">
                                        Exterior security cameras on property
                                    </p>
                                    <p className="text-[14px] text-[#8B8883] mt-1 font-secondary leading-relaxed">
                                        “We have security cameras covering the front
                                        area of the house (carport, gate and front
                                        yard), the side of the house and the
                                        backyard area.”
                                    </p>
                                </div>
                            </li>

                            <hr />

                            <li className="flex gap-4 items-center">
                                <BellOff className="w-5 h-5" />
                                <span className="font-secondary">
                                    No carbon monoxide alarm
                                </span>
                            </li>

                            <hr />

                            <li className="flex gap-4 items-center">
                                <BellOff className="w-5 h-5" />
                                <span className="font-secondary">
                                    No smoke alarm
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
