"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

interface RefundPolicyModalProps {
    open: boolean
    onClose: () => void
}

export default function RefundPolicyModal({
    open,
    onClose,
}: RefundPolicyModalProps) {
    const startY = useRef(0)
    const [translateY, setTranslateY] = useState(0)
    const [dragging, setDragging] = useState(false)

    useEffect(() => {
        if (!open) {
            setTranslateY(0)
        }
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
                    Refund & Cancellation Policy
                </h2>

                {/* CONTENT */}
                <div className="px-6 pb-8 overflow-y-auto">
                    <div className="mb-6">
                        <p className="font-secondary font-semibold text-[18px] mb-1">
                            100% refund
                        </p>
                        <p className="text-[15px] text-[#4A4A4A] leading-relaxed">
                            available only if the cancellation is made no later
                            than 7 days (H-7) before the check-in date.
                        </p>
                    </div>

                    <div className="h-px bg-[#E5E2DD] my-6" />

                    <div className="mb-6">
                        <p className="font-secondary font-semibold text-[18px] mb-1">
                            50% refund
                        </p>
                        <p className="text-[15px] text-[#4A4A4A] leading-relaxed">
                            applies if the cancellation is made 3 days (H-3)
                            before check-in.
                        </p>
                    </div>

                    <div className="h-px bg-[#E5E2DD] my-6" />

                    <ol className="list-decimal pl-5 space-y-4 text-[14px] text-[#4A4A4A]">
                        <li>
                            Cancellations made less than 3 days (under H-3)
                            before check-in are non-refundable (full forfeiture).
                        </li>
                        <li>
                            Reservation date changes (reschedule) can only be
                            made no later than H-7, subject to property
                            availability.
                        </li>
                    </ol>

                    <p className="mt-6 text-[13px] text-[#6B6B6B]">
                        By clicking “Pay”, you agree to Kunjung’s Terms &
                        Conditions and Refund Policy.
                    </p>
                </div>
            </div>

            {/* ================= DESKTOP (TIDAK DIUBAH) ================= */}
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
                            Refund & Cancellation Policy
                        </h2>
                    </div>

                    <div className="px-6 py-6 overflow-y-auto">
                        <div className="grid grid-cols-[140px_1fr] gap-6 mb-6">
                        <p className="font-secondary font-semibold text-[20px]">
                            100% refund
                        </p>
                        <p className="text-[16px] text-[#4A4A4A] leading-relaxed font-secondary">
                            available only if the cancellation is made no later
                            than 7 days (H-7) before the check-in date.
                        </p>
                    </div>

                    <hr className="my-6" />

                    <div className="grid grid-cols-[140px_1fr] gap-6 mb-6">
                        <p className="font-secondary font-semibold text-[20px]">
                            50% refund
                        </p>
                        <p className="text-[16px] text-[#4A4A4A] leading-relaxed font-secondary">
                            applies if the cancellation is made 3 days (H-3)
                            before check-in.
                        </p>
                    </div>

                    <hr className="my-6" />

                    <ol className="list-decimal pl-5 space-y-4 text-[15px] text-[#4A4A4A] font-secondary">
                        <li>
                            Cancellations made less than 3 days (under H-3)
                            before check-in are non-refundable (full forfeiture).
                        </li>
                        <li>
                            Reservation date changes (reschedule) can only be
                            made no later than H-7, subject to property
                            availability.
                        </li>
                    </ol>

                    <p className="mt-6 text-[14px] text-[#6B6B6B] font-secondary">
                        By clicking “Pay”, you agree to Kunjung’s Terms &
                        Conditions and Refund Policy.
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
