"use client"

import { useEffect, useRef, useState } from "react"
import { X, Check } from "lucide-react"

interface AmenityItem {
    label: string
    available: boolean
    description?: string
}

interface AmenityGroup {
    title: string
    items: AmenityItem[]
}

interface AmenitiesModalProps {
    open: boolean
    onClose: () => void
    groups: AmenityGroup[]
    notIncluded: AmenityItem[]
}

export default function AmenitiesModal({
    open,
    onClose,
    groups,
    notIncluded,
}: AmenitiesModalProps) {
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
                <h2 className="px-6 text-[22px] font-secondary font-semibold mb-4">
                    What this place offers
                </h2>

                {/* CONTENT (SCROLLABLE) */}
                <div className="px-6 pb-8 overflow-y-auto space-y-10">
                    {groups.map((group, i) => (
                        <div key={i}>
                            <h3 className="font-secondary font-semibold text-[16px] mb-5">
                                {group.title}
                            </h3>

                            <div className="space-y-5">
                                {group.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="border-b border-[#E5E2DD] pb-5"
                                    >
                                        <div className="flex gap-4">
                                            <div className="w-5 h-5 border border-black rounded-sm flex items-center justify-center shrink-0 mt-[2px]">
                                                <Check className="w-4 h-4" />
                                            </div>

                                            <div>
                                                <p className="text-[15px] text-[#2D2A29] font-secondary">
                                                    {item.label}
                                                </p>

                                                {item.description && (
                                                    <p className="text-[13px] text-[#8F8B85] mt-1 leading-snug">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* NOT INCLUDED */}
                    <div>
                        <h3 className="font-secondary font-semibold text-[16px] mb-5">
                            Not included
                        </h3>

                        <div className="space-y-5">
                            {notIncluded.map((item, i) => (
                                <div
                                    key={i}
                                    className="border-b border-[#E5E2DD] pb-5"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-5 h-5 bg-black text-white rounded-sm flex items-center justify-center shrink-0 mt-[2px]">
                                            ✕
                                        </div>

                                        <div>
                                            <p className="text-[15px] font-secondary line-through text-[#2D2A29]">
                                                {item.label}
                                            </p>

                                            {item.description && (
                                                <p className="text-[13px] text-[#8F8B85] mt-1 leading-snug">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= DESKTOP MODAL ================= */}
            <div className="hidden md:flex items-center justify-center h-full">
                <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-lg max-h-[90vh] flex flex-col">
                    <button
                        onClick={onClose}
                        className="absolute left-6 top-6 text-[#2D2A29]"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="px-6 pt-6 pb-4">
                        <h2 className="text-[28px] font-secondary font-semibold text-center">
                            What this place offers
                        </h2>
                    </div>

                    <div className="px-6 py-6 overflow-y-auto space-y-10">
                        {groups.map((group, i) => (
                            <div key={i}>
                                <h3 className="font-secondary font-semibold text-[18px] mb-6">
                                    {group.title}
                                </h3>

                                <div className="space-y-6">
                                    {group.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex gap-4 border-b pb-6"
                                        >
                                            <div className="w-5 h-5 border border-black rounded-sm flex items-center justify-center shrink-0 mt-[2px]">
                                                <Check className="w-4 h-4" />
                                            </div>

                                            <div>
                                                <p className="font-secondary text-[16px]">
                                                    {item.label}
                                                </p>

                                                {item.description && (
                                                    <p className="text-[14px] text-[#8F8B85] mt-1">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* NOT INCLUDED */}
                        <div>
                            <h3 className="font-secondary font-semibold text-[18px] mb-6">
                                Not included
                            </h3>

                            <div className="space-y-6">
                                {notIncluded.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex gap-4 border-b pb-6"
                                    >
                                        <div className="w-5 h-5 bg-black text-white rounded-sm flex items-center justify-center shrink-0 mt-[2px]">
                                            ✕
                                        </div>

                                        <div>
                                            <p className="font-secondary line-through text-[16px]">
                                                {item.label}
                                            </p>

                                            {item.description && (
                                                <p className="text-[14px] text-[#8F8B85] mt-1">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
