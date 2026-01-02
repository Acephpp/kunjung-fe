"use client"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, Banknote, MapPin, Star, ChevronRight } from "lucide-react"
import { DateRange, type Range } from "react-date-range"
import Calendar from "react-date-range/dist/components/Calendar"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { FiMinus, FiPlus } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { addDays, format } from "date-fns"

type ShootType = "instacation" | "session-morning" | "session-afternoon" | "session-fullday"

export default function ReservePageShoot() {
    const [selected, setSelected] = useState<string | null>(null)
    const [selectedBank, setSelectedBank] = useState<string | null>(null)
    const [confirmed, setConfirmed] = useState(false)

    const [mobileStep, setMobileStep] = useState(0)

    const [showDateModal, setShowDateModal] = useState(false)
    const [showCrewModal, setShowCrewModal] = useState(false)
    const [showTypeModal, setShowTypeModal] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
    const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
    const [dateRange, setDateRange] = useState<Range[]>([
        { startDate: new Date(), endDate: new Date(), key: "selection" },
    ])
    const [crew, setCrew] = useState(10)
    const [shootType, setShootType] = useState<ShootType>("instacation")
    const [openShootSection, setOpenShootSection] = useState<"instacation" | "session">("instacation")

    const isSessionShoot =
        shootType === "session-morning" || shootType === "session-afternoon" || shootType === "session-fullday"

    const today = new Date()
    const tomorrow = addDays(today, 1)
    const weekendStart = addDays(today, 1)
    const weekendEnd = addDays(today, 2)

    const handlePaymentSelect = (option: string) => {
        setSelected(selected === option ? null : option)
        if (option !== "va") setSelectedBank(null)
    }

    const handleBankSelect = (bank: string) => {
        setSelectedBank(selectedBank === bank ? null : bank)
    }

    const handleNext = () => {
        setMobileStep(1)
    }

    const handleChange = () => {
        setConfirmed(false)
        setMobileStep(0)
    }

    const handleStep1Next = () => {
        setConfirmed(true)
        setMobileStep(2)
    }

    const handleStep2Back = () => {
        setMobileStep(1)
    }

    const getPaymentText = () => {
        if (selected === "gopay") return "GoPay"
        if (selected === "card") return "Credit or debit card"
        if (selected === "va") {
            if (selectedBank === "bca") return "Bank Central Asia (VA)"
            if (selectedBank === "mandiri") return "Bank Mandiri (VA)"
            if (selectedBank === "bni") return "Bank Negara Indonesia (VA)"
            return "Bank transfer (Virtual Account)"
        }
        return ""
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

    const StepIndicator = ({
        currentStep,
        totalSteps = 3,
    }: {
        currentStep: number
        totalSteps?: number
    }) => {
        return (
            <div className="w-full flex gap-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                        key={index}
                        className={`h-[3px] flex-1 rounded-full transition-all duration-300
                        ${index <= currentStep ? "bg-gray-800" : "bg-gray-300"}`}
                    />
                ))}
            </div>
        )
    }

    const renderMobileStep0 = () => (
        <div className="min-h-screen bg-[#FCFBF7] flex flex-col">
            <div className="flex-1 px-4 py-6 pb-32">
                <h1 className="text-[20px] font-semibold text-gray-900 mb-3 font-secondary">Review and continue</h1>

                {/* Villa Card */}
                <div className="rounded-2xl border-2 border-gray-200 p-6 font-secondary">
                    <div className="flex gap-4 mb-4">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src="/images/villa-1.jpg" alt="Silas House" fill className="object-cover" />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                            {/* TOP: Name & Location */}
                            <div>
                                <h3 className="font-primary font-semibold text-[22px] text-[#2D2A29] mb-1">Silas House</h3>

                                <p className="text-sm text-[#959290] flex items-center gap-1">
                                    <MapPin size={14} className="text-[#959290]" />
                                    Setiabudi, Bandung
                                </p>
                            </div>

                            {/* BOTTOM: Rating */}
                            <div className="flex items-center gap-1 text-[#2D2A29] mt-2">
                                <Star size={14} className="fill-[#2D2A29]" />
                                <span className="text-sm font-medium">4.9 (43)</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-[#7A7A75] leading-relaxed mb-6">
                        Silas House is a retreat for those who want to feel the warmth in the cool outskirts of Bandung.
                    </p>

                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Dates */}
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-[14px] font-semibold text-gray-800">Dates</p>
                            <p className="text-[14px] text-gray-700">
                                {formatDateRangeText()}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setShowDateModal(true)}
                                className="text-sm font-medium bg-[#E7E6E2] px-8 py-1.5 rounded-full"
                            >
                                change
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Type of Shoot */}
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-[14px] font-semibold text-gray-800">Type of shoot</p>
                            <p className="text-[14px] text-gray-700">{getShootTypeLabel()}</p>
                        </div>
                        <button
                            onClick={() => setShowTypeModal(true)}
                            className="text-sm font-medium bg-[#E7E6E2] px-8 py-1.5 rounded-full"
                        >
                            change
                        </button>
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Crew */}
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[14px] font-semibold text-gray-800">Crew</p>
                            <p className="text-[14px] text-gray-700">{crew} person</p>
                        </div>
                        <button
                            onClick={() => setShowCrewModal(true)}
                            className="text-sm font-medium bg-[#E7E6E2] px-8 py-1.5 rounded-full"
                        >
                            change
                        </button>
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Price */}
                    <div className="flex justify-between items-center">
                        <p className="text-[14px] font-semibold text-gray-800">Price</p>
                        <p className="text-[14px] font-semibold text-gray-900">Rp12.500.000</p>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-[#FCFBF7] border-t border-gray-200 px-4 py-4">
                <div className="mb-3">
                    <StepIndicator currentStep={0} />
                </div>

                <button onClick={handleNext} className="w-full py-3 rounded-lg text-[15px] font-medium bg-[#7A3E2C] text-white">
                    next
                </button>
            </div>
        </div>
    )

    const renderMobileStep1 = () => (
        <div className="min-h-screen bg-[#FCFBF7] flex flex-col font-secondary">
            {/* CONTENT */}
            <div className="flex-1 px-4 py-5 pb-40">
                <h1 className="text-[18px] font-semibold text-gray-900 mb-4">Add a payment method</h1>

                {/* Payment Options Card */}
                <div className="rounded-2xl border-2 border-gray-200 p-5 space-y-0">
                    {/* Credit Card */}
                    <div onClick={() => handlePaymentSelect("card")} className="flex justify-between items-center cursor-pointer">
                        <div className="flex gap-3">
                            <CreditCard className="w-5 h-5 text-gray-800" />
                            <div>
                                <span className="text-[14px] text-gray-800 font-medium block">Credit or debit card</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <Image src="/images/mastercard.png" alt="MasterCard" width={20} height={16} />
                                    <Image src="/images/visa.png" alt="Visa" width={26} height={12} />
                                </div>
                            </div>
                        </div>

                        <div
                            className={`w-[18px] h-[18px] rounded-full border-2 transition flex-shrink-0 ${selected === "card" ? "bg-black border-black" : "border-gray-400"
                                }`}
                        />
                    </div>

                    {selected === "card" && (
                        <div className="mt-4 border-2 border-gray-200 rounded-xl p-4">
                            <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Card information</h3>

                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Card number"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[14px]"
                                />

                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder="Expiration"
                                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-2.5 text-[14px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-2.5 text-[14px]"
                                    />
                                </div>
                            </div>

                            <h3 className="text-[13px] font-semibold text-gray-700 mt-4 mb-2">Billing address</h3>

                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Street address"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[14px]"
                                />
                                <input
                                    type="text"
                                    placeholder="Apt or suite number"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[14px]"
                                />

                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-2.5 text-[14px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder="State"
                                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-2.5 text-[14px]"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder="ZIP code"
                                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-2.5 text-[14px]"
                                    />
                                    <select
                                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-2.5 text-[14px]"
                                        defaultValue="Indonesia"
                                    >
                                        <option>Indonesia</option>
                                        <option>Malaysia</option>
                                        <option>Singapore</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="border-t border-gray-200 my-4" />

                    {/* GoPay */}
                    <div
                        onClick={() => handlePaymentSelect("gopay")}
                        className="flex justify-between items-center cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <Image src="/images/gopay.png" alt="GoPay" width={26} height={26} className="rounded-full" />
                            <span className="text-[14px] text-gray-800 font-medium">GoPay</span>
                        </div>

                        <div
                            className={`w-[18px] h-[18px] rounded-full border-2 transition flex-shrink-0 ${selected === "gopay" ? "bg-black border-black" : "border-gray-400"
                                }`}
                        />
                    </div>

                    <div className="border-t border-gray-200 my-4" />

                    {/* Bank Transfer */}
                    <div
                        onClick={() => handlePaymentSelect("va")}
                        className="flex justify-between items-center pb-4 cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <Banknote className="w-5 h-5 text-[#7A3E2C]" />
                            <span className="text-[14px] text-gray-800 font-medium">Bank transfer (Virtual Account)</span>
                        </div>

                        <div
                            className={`w-[18px] h-[18px] rounded-full border-2 transition flex-shrink-0 ${selected === "va" ? "bg-black border-black" : "border-gray-400"
                                }`}
                        />
                    </div>

                    {selected === "va" && (
                        <div className="mt-2">
                            {[
                                { id: "bca", name: "Bank Central Asia", src: "/images/bca.png" },
                                { id: "mandiri", name: "Bank Mandiri", src: "/images/mandiri.png" },
                                { id: "bni", name: "Bank Negara Indonesia", src: "/images/bni.png" },
                            ].map((bank) => (
                                <div
                                    key={bank.id}
                                    onClick={() => handleBankSelect(bank.id)}
                                    className="border-t border-gray-200 flex justify-between items-center py-4 px-3 cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-[56px] flex justify-center">
                                            <Image
                                                src={bank.src || "/placeholder.svg"}
                                                alt={bank.name}
                                                width={40}
                                                height={22}
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="text-[14px] text-gray-800 font-medium">{bank.name}</span>
                                    </div>

                                    <div
                                        className={`w-[18px] h-[18px] rounded-full border-2 transition ${selectedBank === bank.id ? "bg-black border-black" : "border-gray-400"
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* FOOTER */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#FCFBF7] border-t border-gray-200 px-4 py-4">
                <div className="mb-3 flex justify-center">
                    <StepIndicator currentStep={1} />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setMobileStep(0)}
                        className="flex-1 py-3 rounded-xl text-[15px] font-medium border border-gray-300 text-gray-800 hover:bg-gray-100 transition"
                    >
                        Back
                    </button>

                    <button
                        onClick={handleStep1Next}
                        disabled={!selected}
                        className={`flex-1 py-3 rounded-xl text-[15px] font-medium transition ${selected ? "bg-[#7A3E2C] text-white hover:bg-[#693424]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )

    const renderMobileStep2 = () => (
        <div className="min-h-screen bg-[#FCFBF7] flex flex-col">
            <div className="flex-1 px-4 py-6 pb-32">
                <h1 className="text-[20px] font-semibold text-gray-900 mb-3">Confirm and pay</h1>

                {/* Villa Card */}
                <div className="rounded-2xl border-2 border-gray-200 p-6 mb-6 font-secondary">
                    <div className="flex gap-4 mb-4">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src="/images/villa-1.jpg" alt="Silas House" fill className="object-cover" />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                            {/* TOP: Name & Location */}
                            <div>
                                <h3 className="font-primary font-semibold text-[22px] text-[#2D2A29] mb-1">Silas House</h3>

                                <p className="text-sm text-[#959290] flex items-center gap-1">
                                    <MapPin size={14} className="text-[#959290]" />
                                    Setiabudi, Bandung
                                </p>
                            </div>

                            {/* BOTTOM: Rating */}
                            <div className="flex items-center gap-1 text-[#2D2A29] mt-2">
                                <Star size={14} className="fill-[#2D2A29]" />
                                <span className="text-sm font-medium">4.9 (43)</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-[#7A7A75] leading-relaxed mb-6">
                        Silas House is a retreat for those who want to feel the warmth in the cool outskirts of Bandung.
                    </p>

                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Dates */}
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-[14px] font-semibold text-gray-800">Dates</p>
                            <p className="text-[14px] text-gray-700">
                                {formatDateRangeText()}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowDateModal(true)}
                            className="text-sm font-medium bg-[#E7E6E2] px-8 py-1.5 rounded-full"
                        >
                            change
                        </button>
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Type of Shoot */}
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-[14px] font-semibold text-gray-800">Type of shoot</p>
                            <p className="text-[14px] text-gray-700">{getShootTypeLabel()}</p>
                        </div>
                        <button
                            onClick={() => setShowTypeModal(true)}
                            className="text-sm font-medium bg-[#E7E6E2] px-8 py-1.5 rounded-full"
                        >
                            change
                        </button>
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Crew */}
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-[14px] font-semibold text-gray-800">Crew</p>
                            <p className="text-[14px] text-gray-700">{crew} person</p>
                        </div>
                        <button
                            onClick={() => setShowCrewModal(true)}
                            className="text-sm font-medium bg-[#E7E6E2] px-8 py-1.5 rounded-full"
                        >
                            change
                        </button>
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Price */}
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-[14px] font-semibold text-gray-800">Price</p>
                        <p className="text-[14px] font-semibold text-gray-900">Rp12.500.000</p>
                    </div>
                </div>

                <div
                    onClick={() => setMobileStep(1)}
                    className="rounded-2xl border-2 border-gray-200 p-4 mb-6 cursor-pointer active:scale-[0.99] transition font-secondary"
                >
                    <p className="text-[14px] font-semibold text-gray-800 mb-2">Payment method</p>

                    <div className="flex items-center justify-between">
                        {/* LEFT */}
                        <div className="flex items-center gap-3">
                            {/* Icon */}
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F1F0EC]">
                                {selected === "card" && <Image src="/images/visa.png" alt="Card" width={24} height={12} />}

                                {selected === "gopay" && (
                                    <Image src="/images/gopay.png" alt="GoPay" width={20} height={20} className="rounded-full" />
                                )}

                                {selected === "va" && (
                                    <Image src="/images/bca.png" alt="BCA" width={22} height={14} className="object-contain" />
                                )}
                            </div>

                            {/* Text */}
                            <div>
                                <p className="text-[14px] font-medium text-gray-900 leading-tight">{getPaymentText()}</p>
                                {selected === "va" && <p className="text-[13px] text-gray-600">Bank Central Asia</p>}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                </div>

                {/* Price Details */}
                <div className="rounded-2xl border-2 border-gray-200 p-6 mb-6 font-secondary">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="text-[14px] font-semibold text-gray-800">Price details</p>
                            <p className="text-[13px] text-gray-500 mt-1">2 nights x Rp6.250.000</p>
                        </div>
                        <p className="text-[14px] font-semibold text-gray-900">Rp12.500.000</p>
                    </div>

                    <div className="border-t border-gray-200 my-3"></div>

                    <div className="flex justify-between items-center">
                        <p className="text-[15px] font-bold text-gray-900">TOTAL</p>
                        <p className="text-[15px] font-bold text-gray-900">Rp12.500.000</p>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-[#FCFBF7] border-t border-gray-200 px-4 py-4">
                <div className="mb-3 flex justify-center">
                    <StepIndicator currentStep={2} />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleStep2Back}
                        className="flex-1 py-3 rounded-xl text-[15px] font-medium border border-gray-300 text-gray-800 hover:bg-gray-100 transition"
                    >
                        back
                    </button>

                    <button className="flex-1 py-3 rounded-xl text-[15px] font-medium bg-[#7A3E2C] text-white hover:bg-[#693424] transition">
                        next
                    </button>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile View - Step based */}
            <div className="md:hidden">
                {mobileStep === 0 && renderMobileStep0()}
                {mobileStep === 1 && renderMobileStep1()}
                {mobileStep === 2 && renderMobileStep2()}
            </div>

            {/* Desktop View - Side by side */}
            <div className="hidden md:block  bg-[#FCFBF7] py-25 px-6 lg:px-10 mt-5 font-secondary text-gray-800">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* === LEFT SIDE === */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* === STEP 1 === */}
                        <div className="shadow-md rounded-2xl p-8 border-2 border-gray-200">
                            <h2 className="text-[20px] font-semibold mb-6 flex justify-between items-center">
                                <div>
                                    <span className="mr-2">1.</span>Add a payment method
                                </div>
                                {confirmed && (
                                    <button
                                        onClick={handleChange}
                                        className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-md hover:bg-gray-200 transition"
                                    >
                                        change
                                    </button>
                                )}
                            </h2>

                            {/* === Jika SUDAH klik Next === */}
                            {confirmed ? (
                                <div className="flex items-center gap-3">
                                    {selected === "gopay" && (
                                        <Image src="/images/gopay.png" alt="GoPay" width={26} height={26} className="rounded-full" />
                                    )}
                                    {selected === "card" && <CreditCard className="w-5 h-5 text-gray-800" />}
                                    {selected === "va" && <Banknote className="w-5 h-5 text-gray-800" />}
                                    <span className="font-medium text-gray-800 text-[15px]">{getPaymentText()}</span>
                                </div>
                            ) : (
                                <>
                                    {/* === CREDIT / DEBIT CARD === */}
                                    <div
                                        onClick={() => handlePaymentSelect("card")}
                                        className="flex justify-between items-center pb-4 cursor-pointer"
                                    >
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <CreditCard className="w-5 h-5 text-gray-800" />
                                                <span className="text-gray-800 font-medium">Credit or debit card</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 ml-8">
                                                <Image src="/images/mastercard.png" alt="MasterCard" width={28} height={18} />
                                                <Image src="/images/visa.png" alt="Visa" width={38} height={12} />
                                            </div>
                                        </div>
                                        <div
                                            className={`w-[18px] h-[18px] rounded-full border transition ${selected === "card" ? "bg-black border-black" : "border-gray-400"
                                                }`}
                                        ></div>
                                    </div>

                                    {/* FORM CARD */}
                                    {selected === "card" && (
                                        <div className="mb-5 border-2 border-gray-200 rounded-xl p-6">
                                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Card information</h3>
                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    placeholder="Card number"
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 text-[15px]"
                                                />
                                                <div className="flex gap-3">
                                                    <input
                                                        type="text"
                                                        placeholder="Expiration"
                                                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-3 text-[15px]"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="CVV"
                                                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-3 text-[15px]"
                                                    />
                                                </div>
                                            </div>

                                            <h3 className="text-sm font-semibold text-gray-700 mt-5 mb-2">Billing address</h3>
                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    placeholder="Street address"
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 text-[15px]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Apt or suite number"
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 text-[15px]"
                                                />
                                                <div className="flex gap-3">
                                                    <input
                                                        type="text"
                                                        placeholder="City"
                                                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-3 text-[15px]"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="State"
                                                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-3 text-[15px]"
                                                    />
                                                </div>
                                                <div className="flex gap-3">
                                                    <input
                                                        type="text"
                                                        placeholder="ZIP code"
                                                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-3 text-[15px]"
                                                    />
                                                    <select
                                                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-3 text-[15px]"
                                                        defaultValue="Indonesia"
                                                    >
                                                        <option>Indonesia</option>
                                                        <option>Malaysia</option>
                                                        <option>Singapore</option>
                                                        <option>Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* === GOPAY === */}
                                    <div
                                        onClick={() => handlePaymentSelect("gopay")}
                                        className="flex justify-between items-center border-t border-gray-200 pt-5 pb-4 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Image src="/images/gopay.png" alt="GoPay" width={26} height={26} className="rounded-full" />
                                            <span className="text-gray-800 font-medium">GoPay</span>
                                        </div>
                                        <div
                                            className={`w-[18px] h-[18px] rounded-full border transition ${selected === "gopay" ? "bg-black border-black" : "border-gray-400"
                                                }`}
                                        ></div>
                                    </div>

                                    {/* === BANK TRANSFER === */}
                                    <div className="border-t border-gray-200">
                                        <div
                                            onClick={() => handlePaymentSelect("va")}
                                            className="flex justify-between items-center pt-5 pb-4 cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Banknote className="w-5 h-5 text-[#7A3E2C]" />
                                                <span className="text-gray-800 font-medium">Bank transfer (Virtual Account)</span>
                                            </div>
                                            <div
                                                className={`w-[18px] h-[18px] rounded-full border transition ${selected === "va" ? "bg-black border-black" : "border-gray-400"
                                                    }`}
                                            ></div>
                                        </div>

                                        {/* === BANK LIST === */}
                                        {selected === "va" && (
                                            <div className="mt-[6px]">
                                                {[
                                                    { id: "bca", name: "Bank Central Asia", src: "/images/bca.png" },
                                                    { id: "mandiri", name: "Bank Mandiri", src: "/images/mandiri.png" },
                                                    { id: "bni", name: "Bank Negara Indonesia", src: "/images/bni.png" },
                                                ].map((bank) => (
                                                    <div key={bank.id} className="pl-[32px]">
                                                        <div
                                                            className="border-t border-b border-gray-200 flex justify-between items-center py-5 cursor-pointer hover:bg-gray-50 transition"
                                                            onClick={() => handleBankSelect(bank.id)}
                                                        >
                                                            {/* Logo + Nama Bank */}
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-[60px] flex justify-center">
                                                                    <Image
                                                                        src={bank.src || "/placeholder.svg"}
                                                                        alt={bank.name}
                                                                        width={50}
                                                                        height={22}
                                                                        className="object-contain"
                                                                    />
                                                                </div>
                                                                <span className="text-gray-800 font-medium text-[15px] leading-[1.4]">{bank.name}</span>
                                                            </div>

                                                            {/* Radio Button */}
                                                            <div
                                                                className={`w-[18px] h-[18px] rounded-full border transition ${selectedBank === bank.id ? "bg-black border-black" : "border-gray-400"
                                                                    }`}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* === BUTTON NEXT === */}
                                    <div className="text-right mt-8">
                                        <button
                                            onClick={handleStep1Next}
                                            disabled={!selected}
                                            className={`px-8 py-3 rounded-md text-lg font-medium transition ${selected
                                                ? "bg-[#7A3E2C] text-white hover:bg-[#693424]"
                                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                }`}
                                        >
                                            next
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* === STEP 2 === */}
                        {confirmed ? (
                            <div className="rounded-2xl p-8 border-2 border-gray-200 shadow-md">
                                <h3 className="text-[18px] font-semibold mb-3">
                                    <span className="mr-2">2.</span>Review your reservations
                                </h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
                                    Our team has 24 hours to approve your request. You will pay now, but will receive a full refund if the
                                    reservation is not confirmed. Before proceeding with your reservation, please double-check your
                                    information.
                                </p>
                                <button className="w-full bg-[#7A3E2C] hover:bg-[#693424] text-white py-3 rounded-md font-medium text-[16px] transition">
                                    make a reservation
                                </button>
                            </div>
                        ) : (
                            <div className="rounded-2xl p-6 border-2 border-gray-200 shadow-md">
                                <p className="text-[18px] font-semibold">
                                    <span className="mr-2">2.</span>Review your reservations
                                </p>
                            </div>
                        )}
                    </div>

                    {/* === RIGHT SIDE === */}
                    <div className="lg:col-span-2">
                        <div className="shadow-md rounded-2xl border border-gray-300 p-8 font-secondary text-gray-800">
                            {/* Header Villa */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
                                    <Image src="/images/villa-1.jpg" alt="Silas House" fill className="object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-[22px] font-semibold text-gray-900 leading-tight">Silas House</h3>
                                    <div className="flex items-center gap-2 text-gray-500 text-[15px]">
                                        <MapPin size={14} />
                                        <span>Setiabudi, Bandung</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
                                        <Star className="w-4 h-4 fill-black text-black" />
                                        <span className="font-medium">4.9</span>
                                        <span className="text-gray-500">(43)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
                                Silas House is a retreat for those who want to feel the warmth in the cool outskirts of Bandung.
                            </p>

                            {/* Garis Pembatas */}
                            <div className="border-t border-gray-200 my-4"></div>

                            {/* Dates Section */}
                            <div className="flex justify-between items-center border-gray-200">
                                <div>
                                    <p className="text-[15px] font-semibold text-gray-800 mb-1">Dates</p>
                                    <p className="text-[15px] text-gray-700">
                                        {formatDateRangeText()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowDateModal(true)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[14px] px-4 py-1.5 rounded-lg font-medium transition"
                                >
                                    change
                                </button>
                            </div>

                            <div className="border-t border-gray-200 my-4"></div>

                            {/* Type of Shoot Section */}
                            <div className="flex justify-between items-center border-gray-200">
                                <div>
                                    <p className="text-[15px] font-semibold text-gray-800 mb-1">Type of shoot</p>
                                    <p className="text-[15px] text-gray-700">{getShootTypeLabel()}</p>
                                </div>

                                <button
                                    onClick={() => setShowTypeModal(true)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[14px] px-4 py-1.5 rounded-lg font-medium transition"
                                >
                                    change
                                </button>
                            </div>

                            <div className="border-t border-gray-200 my-4"></div>

                            {/* Crew Section */}
                            <div className="flex justify-between items-center border-gray-200">
                                <div>
                                    <p className="text-[15px] font-semibold text-gray-800 mb-1">Crew</p>
                                    <p className="text-[15px] text-gray-700">{crew} person</p>
                                </div>

                                <button
                                    onClick={() => setShowCrewModal(true)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[14px] px-4 py-1.5 rounded-lg font-medium transition"
                                >
                                    change
                                </button>
                            </div>

                            <div className="border-t border-gray-200 my-4"></div>

                            {/* Price Details */}
                            <div className="border-gray-200">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[15px] font-semibold text-gray-800">Price details</p>
                                        <p className="text-[14px] text-gray-500 mt-[2px]">2 nights x Rp6.250.000</p>
                                    </div>

                                    <div className="self-end">
                                        <p className="text-[15px] font-semibold text-gray-900">Rp12.500.000</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 my-2"></div>

                            {/* Total Section */}
                            <div className="flex justify-between items-center mt-4 mb-1">
                                <span className="text-[16px] font-bold text-gray-900 tracking-tight">TOTAL</span>
                                <span className="text-[16px] font-bold text-gray-900 tracking-tight">Rp12.500.000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DATE PICKER MODAL - INSTACATION (RANGE) */}
            {showDateModal && !isSessionShoot && (
                <div
                    className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
                    onClick={() => setShowDateModal(false)}
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
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* DRAG INDICATOR – MOBILE */}
                        <div className="md:hidden flex justify-center mb-3">
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        {/* MOBILE – 2 MONTHS (VERTICAL) */}
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
                                    // Auto close when both dates are selected
                                    if (item.selection.startDate && item.selection.endDate && item.selection.startDate.getTime() !== item.selection.endDate.getTime()) {
                                        setTimeout(() => setShowDateModal(false), 300)
                                    }
                                }}
                                rangeColors={[checkIn ? "#7A3E2C" : "transparent"]}
                                months={2}
                                direction="vertical"
                                moveRangeOnFirstSelection={false}
                                editableDateInputs={false}
                            />
                        </div>

                        {/* DESKTOP – CENTER MODAL */}
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
                                    // Auto close when both dates are selected
                                    if (item.selection.startDate && item.selection.endDate && item.selection.startDate.getTime() !== item.selection.endDate.getTime()) {
                                        setTimeout(() => setShowDateModal(false), 300)
                                    }
                                }}
                                rangeColors={[checkIn ? "#7A3E2C" : "transparent"]}
                                months={2}
                                direction="horizontal"
                                moveRangeOnFirstSelection={false}
                                editableDateInputs={false}
                            />

                            <style jsx global>{`
                    .calendar-wrapper .rdrCalendarWrapper {
                        background-color: #FCFBF7;
                    }
                `}</style>
                        </div>

                        {/* MOBILE FOOTER */}
                        <div className="fixed bottom-0 left-0 right-0 md:hidden flex gap-3 p-4 bg-white border-t border-[#E7E6E2] z-50">
                            <button
                                onClick={() => setShowDateModal(false)}
                                className="flex-1 h-12 border border-[#2D2A29] text-[#2D2A29] font-secondary font-bold rounded-md text-sm"
                            >
                                cancel
                            </button>

                            <button
                                disabled={!checkIn}
                                onClick={() => setShowDateModal(false)}
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

            {/* DATE PICKER MODAL - SESSION SHOOT (SINGLE DATE) */}
            {showDateModal && isSessionShoot && (
                <div
                    className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
                    onClick={() => setShowDateModal(false)}
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
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* DRAG INDICATOR – MOBILE */}
                        <div className="md:hidden flex justify-center py-3 border-b border-gray-200 bg-white">
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        {/* MOBILE LAYOUT */}
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
                                        onClick={() => setDate(item.date)}
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
                                                onChange={(d: Date) => setDate(d)}
                                                color="#7A3E2C"
                                                monthDisplayFormat="MMMM yyyy"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DESKTOP LAYOUT */}
                        <div className="hidden md:flex w-[600px] bg-[#FCFBF7] rounded-2xl font-secondary overflow-hidden">
                            {/* LEFT */}
                            <div className="w-[42%] bg-[#F9F8F4] flex flex-col gap-3 p-6 border-r border-gray-200">
                                <p className="text-sm font-semibold text-gray-600 mb-1">
                                    Quick select
                                </p>

                                <div
                                    className="p-4 rounded-2xl border border-gray-200 bg-[#F9F8F4] hover:bg-gray-50 cursor-pointer transition"
                                    onClick={() => setDate(today)}
                                >
                                    <p className="font-semibold text-gray-900">Today</p>
                                    <p className="text-sm text-gray-500">
                                        {format(today, "MMMM dd")}
                                    </p>
                                </div>

                                <div
                                    className="p-4 rounded-2xl border border-gray-200 bg-[#F9F8F4] hover:bg-gray-50 cursor-pointer transition"
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
                                    className="p-4 rounded-2xl border border-gray-200 bg-[#F9F8F4] hover:bg-gray-50 cursor-pointer transition"
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
                            <div className="flex-1 bg-[#F9F8F4] p-6 calendar-wrapper">
                                <div className="rounded-2xl border border-gray-200 p-3 bg-[#F9F8F4]">
                                    <Calendar
                                        date={date || new Date()}
                                        onChange={(d: Date) => {
                                            setDate(d)
                                            setTimeout(() => setShowDateModal(false), 300)
                                        }}
                                        color="#7A3E2C"
                                        monthDisplayFormat="MMMM yyyy"
                                    />
                                </div>

                                {/* FORCE CALENDAR BG */}
                                <style jsx global>{`
                                    .calendar-wrapper .rdrCalendarWrapper {
                                        background-color: #F9F8F4;
                                    }

                                    .calendar-wrapper .rdrMonth {
                                        background-color: #F9F8F4;
                                    }

                                    .calendar-wrapper .rdrWeekDays,
                                    .calendar-wrapper .rdrDays {
                                        background-color: #F9F8F4;
                                    }
                                `}</style>
                            </div>

                        </div>

                        {/* MOBILE FOOTER */}
                        <div className="fixed bottom-0 left-0 right-0 md:hidden flex gap-3 p-4 bg-white border-t border-[#E7E6E2] z-50">
                            {/* Cancel */}
                            <button
                                onClick={() => setShowDateModal(false)}
                                className="flex-1 h-12 border border-[#2D2A29] text-[#2D2A29] font-secondary text-sm font-bold rounded-md"
                            >
                                cancel
                            </button>

                            {/* Next */}
                            <button
                                disabled={!date}
                                onClick={() => setShowDateModal(false)}
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

            {showCrewModal && (
                <div
                    className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
                    onClick={() => setShowCrewModal(false)}
                >
                    {/* MOBILE – BOTTOM PANEL */}
                    <div
                        className="
                md:hidden
                w-full
                bg-white md:bg-[#FCFBF7]
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
                        <div className="px-1">
                            <div className="border border-gray-700 rounded-2xl p-5">
                                <h2 className="font-serif text-2xl text-[#4A3B2D] mb-4">Who?</h2>

                                <div className="border border-gray-400 rounded-xl px-4 py-4 flex items-center justify-between">
                                    {/* LEFT */}
                                    <div>
                                        <p className="font-medium text-[#4A3B2D]">Add Crew</p>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setCrew(Math.max(0, crew - 1))}
                                            disabled={crew === 0}
                                            className="w-9 h-9 rounded-full border flex items-center justify-center disabled:opacity-40"
                                        >
                                            <FiMinus size={14} />
                                        </button>

                                        <span className="w-6 text-center font-medium">{crew}</span>

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

                        {/* FOOTER */}
                        <div className="fixed bottom-0 left-0 right-0 md:hidden flex gap-3 p-4 bg-white border-t border-[#E7E6E2] z-50">
                            <Button
                                variant="outline"
                                onClick={() => setShowCrewModal(false)}
                                className="flex-1 h-12 border-[#2D2A29] text-[#2D2A29] font-secondary font-bold"
                            >
                                cancel
                            </Button>

                            <Button
                                onClick={() => setShowCrewModal(false)}
                                className="flex-1 h-12 bg-[#7A3E2C] hover:bg-[#693424] text-white font-secondary font-bold"
                            >
                                next
                            </Button>
                        </div>
                    </div>

                    {/* DESKTOP – MODAL */}
                    <div className="hidden md:flex items-center justify-center h-full" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-[#FDFBF6] rounded-3xl shadow-2xl border border-[#E5E2DD] px-8 py-6 w-[420px]">
                            <div className="flex items-center justify-between font-secondary">
                                <span className="text-[15px] font-medium text-[#2D2A29]">Add Crew</span>

                                <div className="flex items-center gap-3 text-[13px] text-[#7A7A75]">
                                    <button
                                        onClick={() => setCrew(Math.max(0, crew - 1))}
                                        disabled={crew === 0}
                                        className="hover:text-gray-800 disabled:opacity-40 transition"
                                    >
                                        <FiMinus size={14} />
                                    </button>

                                    <span className="text-[15px] w-3 text-center">{crew}</span>

                                    <button onClick={() => setCrew(crew + 1)} className="hover:text-gray-800 transition">
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-3 border-b border-[#CFCBC5]" />
                        </div>
                    </div>
                </div>
            )}

            {/* Type of Shoot Modal */}
            {showTypeModal && (
                <div
                    className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
                    onClick={() => setShowTypeModal(false)}
                >
                    {/* MOBILE – BOTTOM PANEL */}
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

                        {/* CONTENT CARD */}
                        <div className="px-1">
                            <div className="border border-gray-700 rounded-2xl p-5 bg-white">
                                {/* TITLE */}
                                <h2 className="font-serif text-2xl text-[#4A3B2D] mb-4">
                                    Type of shoot?
                                </h2>

                                <div className="border-b border-gray-400 mb-4" />

                                {/* INSTACATION */}
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

                                {/* SESSION SHOOT */}
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

                        {/* FOOTER */}
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

                    {/* DESKTOP – MODAL */}
                    <div
                        className="hidden md:block bg-[#FCFBF7] rounded-3xl shadow-md border border-gray-200 px-8 py-6 w-[340px] sm:w-[380px] font-secondary text-gray-800"
                        onClick={(e) => e.stopPropagation()}
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
            )}


            <style>{`
                @media (max-width: 1024px) {
                body {
                    padding-bottom: 75px;
                }
                }
            `}</style>
        </>
    )
}
