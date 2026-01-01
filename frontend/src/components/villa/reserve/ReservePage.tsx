"use client"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, Banknote, MapPin, Star, ChevronRight } from "lucide-react"
import { DateRange, type Range } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { FiMinus, FiPlus } from "react-icons/fi"
import { Button } from "@/components/ui/button"

export default function ReservePage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  const [mobileStep, setMobileStep] = useState(0)

  const [showDateModal, setShowDateModal] = useState(false)
  const [showGuestModal, setShowGuestModal] = useState(false)
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
  const [dateRange, setDateRange] = useState<Range[]>([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ])
  const [guests, setGuests] = useState(10)

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
                {`${dateRange[0].startDate?.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })} - ${dateRange[0].endDate?.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}`}
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

          {/* Guests */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[14px] font-semibold text-gray-800">Guests</p>
              <p className="text-[14px] text-gray-700">{guests} Guests</p>
            </div>
            <button
              onClick={() => setShowGuestModal(true)}
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
              className={`w-[18px] h-[18px] rounded-full border-2 transition flex-shrink-0 ${
                selected === "card" ? "bg-black border-black" : "border-gray-400"
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
              className={`w-[18px] h-[18px] rounded-full border-2 transition flex-shrink-0 ${
                selected === "gopay" ? "bg-black border-black" : "border-gray-400"
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
              className={`w-[18px] h-[18px] rounded-full border-2 transition flex-shrink-0 ${
                selected === "va" ? "bg-black border-black" : "border-gray-400"
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
                    className={`w-[18px] h-[18px] rounded-full border-2 transition ${
                      selectedBank === bank.id ? "bg-black border-black" : "border-gray-400"
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
            className={`flex-1 py-3 rounded-xl text-[15px] font-medium transition ${
              selected ? "bg-[#7A3E2C] text-white hover:bg-[#693424]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
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
                {`${dateRange[0].startDate?.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })} - ${dateRange[0].endDate?.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}`}
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

          {/* Guests */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-[14px] font-semibold text-gray-800">Guests</p>
              <p className="text-[14px] text-gray-700">{guests} Guests</p>
            </div>
            <button
              onClick={() => setShowGuestModal(true)}
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
                      className={`w-[18px] h-[18px] rounded-full border transition ${
                        selected === "card" ? "bg-black border-black" : "border-gray-400"
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
                      className={`w-[18px] h-[18px] rounded-full border transition ${
                        selected === "gopay" ? "bg-black border-black" : "border-gray-400"
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
                        className={`w-[18px] h-[18px] rounded-full border transition ${
                          selected === "va" ? "bg-black border-black" : "border-gray-400"
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
                                className={`w-[18px] h-[18px] rounded-full border transition ${
                                  selectedBank === bank.id ? "bg-black border-black" : "border-gray-400"
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
                      className={`px-8 py-3 rounded-md text-lg font-medium transition ${
                        selected
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
                    {`${dateRange[0].startDate?.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })} - ${dateRange[0].endDate?.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}`}
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

              {/* Guests Section */}
              <div className="flex justify-between items-center border-gray-200">
                <div>
                  <p className="text-[15px] font-semibold text-gray-800 mb-1">Guests</p>
                  <p className="text-[15px] text-gray-700">{guests} Guests</p>
                </div>

                <button
                  onClick={() => setShowGuestModal(true)}
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

      {showDateModal && (
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

      {showGuestModal && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
          onClick={() => setShowGuestModal(false)}
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
                    <p className="font-medium text-[#4A3B2D]">Add Guests</p>
                    <p className="text-xs text-gray-500 mt-1">Children above 5 years are counted</p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-9 h-9 rounded-full border flex items-center justify-center"
                    >
                      <FiMinus size={14} />
                    </button>

                    <span className="w-6 text-center font-medium">{guests}</span>

                    <button
                      onClick={() => setGuests(guests + 1)}
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
                onClick={() => setShowGuestModal(false)}
                className="flex-1 h-12 border-[#2D2A29] text-[#2D2A29] font-secondary font-bold"
              >
                cancel
              </Button>

              <Button
                onClick={() => setShowGuestModal(false)}
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
                <span className="text-[15px] font-medium text-[#2D2A29]">Add Guests</span>

                <div className="flex items-center gap-3 text-[13px] text-[#7A7A75]">
                  <button
                    onClick={() => setGuests(Math.max(0, guests - 1))}
                    disabled={guests === 0}
                    className="hover:text-gray-800 disabled:opacity-40 transition"
                  >
                    <FiMinus size={14} />
                  </button>

                  <span className="text-[15px] w-3 text-center">{guests}</span>

                  <button onClick={() => setGuests(guests + 1)} className="hover:text-gray-800 transition">
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-3 border-b border-[#CFCBC5]" />
            </div>
          </div>
        </div>
      )}

      {/* Add padding to body to prevent content overlap with sticky footer on mobile */}
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
