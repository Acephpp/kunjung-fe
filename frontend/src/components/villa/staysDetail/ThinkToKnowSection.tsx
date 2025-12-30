"use client"

import { useState } from "react"
import {
    CalendarX,
    KeyRound,
    ShieldCheck,
    ChevronRight,
} from "lucide-react"

import RefundPolicyModal from "./RefundPolicyModal"
import HouseRulesModal from "./HouseRulesModal"
import SafetyPropertyModal from "./SafetyPropertyModal"

export default function ThingsToKnowSection() {
    const [openRefund, setOpenRefund] = useState(false)
    const [openRules, setOpenRules] = useState(false)
    const [openSafety, setOpenSafety] = useState(false)

    return (
        <>
            <section className="max-w-9xl px-6 md:px-12 md:pt-10 bg-[#FCFBF7]">
                {/* BORDER TOP & BOTTOM */}
                <div className="border-y border-[#D8D6D0] py-6 md:py-20">
                    {/* TITLE */}
                    <h2 className="text-left md:text-center text-[28px] md:text-[40px] font-primary font-semibold mb-6 md:mb-10">
                        Things to know
                    </h2>

                    {/* ================= MOBILE LIST ================= */}
                    <div className="md:hidden space-y-6">
                        {/* REFUND */}
                        <button
                            onClick={() => setOpenRefund(true)}
                            className="w-full flex items-center justify-between text-left"
                        >
                            <div className="flex items-start gap-4">
                                <CalendarX className="w-6 h-6 text-[#2D2A29]" />
                                <p className="font-primary font-semibold text-[18px] leading-snug">
                                    Refund & <br />
                                    cancellation policy
                                </p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#6F6C67]" />
                        </button>

                        {/* RULES */}
                        <button
                            onClick={() => setOpenRules(true)}
                            className="w-full flex items-center justify-between text-left"
                        >
                            <div className="flex items-start gap-4">
                                <KeyRound className="w-6 h-6 text-[#2D2A29]" />
                                <p className="font-primary font-semibold text-[18px] leading-snug">
                                    House rules you <br />
                                    need to know
                                </p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#6F6C67]" />
                        </button>

                        {/* SAFETY */}
                        <button
                            onClick={() => setOpenSafety(true)}
                            className="w-full flex items-center justify-between text-left"
                        >
                            <div className="flex items-start gap-4">
                                <ShieldCheck className="w-6 h-6 text-[#2D2A29]" />
                                <p className="font-primary font-semibold text-[18px] leading-snug">
                                    Preventive safety & <br />
                                    property
                                </p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#6F6C67]" />
                        </button>
                    </div>

                    {/* ================= DESKTOP GRID ================= */}
                    <div className="hidden md:grid grid-cols-3 gap-16 max-w-6xl mx-auto">
                        {/* ITEM 1 */}
                        <div className="flex items-start gap-6">
                            <CalendarX className="w-20 h-20 text-[#2D2A29]" />
                            <div>
                                <p className="font-primary font-semibold text-[22px] leading-snug">
                                    Refund & cancellation policy
                                </p>
                                <button
                                    onClick={() => setOpenRefund(true)}
                                    className="mt-2 font-secondary text-[18px] text-[#8B8883] underline underline-offset-4 hover:text-[#2D2A29]"
                                >
                                    Learn more
                                </button>
                            </div>
                        </div>

                        {/* ITEM 2 */}
                        <div className="flex items-start gap-6">
                            <KeyRound className="w-20 h-20 text-[#2D2A29]" />
                            <div>
                                <p className="font-primary font-semibold text-[22px] leading-snug">
                                    House rules you need to know
                                </p>
                                <button
                                    onClick={() => setOpenRules(true)}
                                    className="mt-2 font-secondary text-[18px] text-[#8B8883] underline underline-offset-4 hover:text-[#2D2A29]"
                                >
                                    Learn more
                                </button>
                            </div>
                        </div>

                        {/* ITEM 3 */}
                        <div className="flex items-start gap-6">
                            <ShieldCheck className="w-20 h-20 text-[#2D2A29]" />
                            <div>
                                <p className="font-primary font-semibold text-[22px] leading-snug">
                                    Preventive safety & property
                                </p>
                                <button
                                    onClick={() => setOpenSafety(true)}
                                    className="mt-2 font-secondary text-[18px] text-[#8B8883] underline underline-offset-4 hover:text-[#2D2A29]"
                                >
                                    Learn more
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MODALS */}
            <RefundPolicyModal
                open={openRefund}
                onClose={() => setOpenRefund(false)}
            />
            <HouseRulesModal
                open={openRules}
                onClose={() => setOpenRules(false)}
            />
            <SafetyPropertyModal
                open={openSafety}
                onClose={() => setOpenSafety(false)}
            />
        </>
    )
}
