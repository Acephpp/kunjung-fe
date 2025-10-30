"use client";

import { useState } from "react";
import Image from "next/image";
import { CreditCard, Banknote, MapPin, Star } from "lucide-react";

// 🟢 Tambahan import
import { Range } from "react-date-range";
import DateModal from "./DateModal";
import GuestModal from "./GuestModal";

export default function ReservePage() {
    const [selected, setSelected] = useState<string | null>(null);
    const [selectedBank, setSelectedBank] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false); // ⬅️ state baru untuk ubah tampilan setelah klik Next

    // 🟢 Tambahan state untuk modal
    const [showDateModal, setShowDateModal] = useState(false);
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [dateRange, setDateRange] = useState<Range[]>([
        { startDate: new Date(), endDate: new Date(), key: "selection" },
    ]);
    const [guests, setGuests] = useState(10);

    // Toggle metode pembayaran
    const handlePaymentSelect = (option: string) => {
        setSelected(selected === option ? null : option);
        if (option !== "va") setSelectedBank(null);
    };

    // Toggle bank
    const handleBankSelect = (bank: string) => {
        setSelectedBank(selectedBank === bank ? null : bank);
    };

    // Klik Next -> ubah tampilan
    const handleNext = () => {
        if (selected) setConfirmed(true);
    };

    // Klik Change -> kembali ke awal
    const handleChange = () => {
        setConfirmed(false);
    };

    // Menentukan teks metode yang dipilih
    const getPaymentText = () => {
        if (selected === "gopay") return "GoPay";
        if (selected === "card") return "Credit or debit card";
        if (selected === "va") {
            if (selectedBank === "bca") return "Bank Central Asia (VA)";
            if (selectedBank === "mandiri") return "Bank Mandiri (VA)";
            if (selectedBank === "bni") return "Bank Negara Indonesia (VA)";
            return "Bank transfer (Virtual Account)";
        }
        return "";
    };

    return (
        <div className="min-h-screen bg-[#FCFBF7] py-16 px-6 lg:px-10 mt-5 font-secondary text-gray-800">
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
                                    <Image
                                        src="/images/gopay.png"
                                        alt="GoPay"
                                        width={26}
                                        height={26}
                                        className="rounded-full"
                                    />
                                )}
                                {selected === "card" && (
                                    <CreditCard className="w-5 h-5 text-gray-800" />
                                )}
                                {selected === "va" && (
                                    <Banknote className="w-5 h-5 text-gray-800" />
                                )}
                                <span className="font-medium text-gray-800 text-[15px]">
                                    {getPaymentText()}
                                </span>
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
                                            <span className="text-gray-800 font-medium">
                                                Credit or debit card
                                            </span>
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
                                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                            Card information
                                        </h3>
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

                                        <h3 className="text-sm font-semibold text-gray-700 mt-5 mb-2">
                                            Billing address
                                        </h3>
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
                                        <Image
                                            src="/images/gopay.png"
                                            alt="GoPay"
                                            width={26}
                                            height={26}
                                            className="rounded-full"
                                        />
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
                                            {/* Ganti ikon agar warnanya coklat seperti di gambar */}
                                            <Banknote className="w-5 h-5 text-[#7A3E2C]" />
                                            <span className="text-gray-800 font-medium">
                                                Bank transfer (Virtual Account)
                                            </span>
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
                                                <div
                                                    key={bank.id}
                                                    className="pl-[32px]" // sejajarkan logo dengan ikon VA
                                                >
                                                    <div
                                                        className="border-t border-b border-gray-200 flex justify-between items-center py-5 cursor-pointer hover:bg-gray-50 transition"
                                                        onClick={() => handleBankSelect(bank.id)}
                                                    >
                                                        {/* Logo + Nama Bank */}
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-[60px] flex justify-center">
                                                                <Image
                                                                    src={bank.src}
                                                                    alt={bank.name}
                                                                    width={50}
                                                                    height={22}
                                                                    className="object-contain"
                                                                />
                                                            </div>
                                                            <span className="text-gray-800 font-medium text-[15px] leading-[1.4]">
                                                                {bank.name}
                                                            </span>
                                                        </div>

                                                        {/* Radio Button */}
                                                        <div
                                                            className={`w-[18px] h-[18px] rounded-full border transition ${selectedBank === bank.id
                                                                ? "bg-black border-black"
                                                                : "border-gray-400"
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
                                        onClick={handleNext}
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
                                Our team has 24 hours to approve your request. You will pay now, but will receive a
                                full refund if the reservation is not confirmed. Before proceeding with your
                                reservation, please double-check your information.
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
                                <Image
                                    src="/images/villa-1.jpg"
                                    alt="Silas House"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-[22px] font-semibold text-gray-900 leading-tight">
                                    Silas House
                                </h3>
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

                            {/* 🟢 Tambahkan event untuk buka modal guest */}
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

                        {/* Price Breakdown */}
                        <button className="text-[14px] text-gray-600 underline hover:text-gray-800 transition">
                            Price breakdown
                        </button>
                    </div>
                </div>
            </div>

            {/* 🟢 Tambahkan modal di luar grid */}
            <DateModal
                isOpen={showDateModal}
                onClose={() => setShowDateModal(false)}
                dateRange={dateRange}
                setDateRange={setDateRange}
            />

            <GuestModal
                isOpen={showGuestModal}
                onClose={() => setShowGuestModal(false)}
                guests={guests}
                setGuests={setGuests}
            />
        </div>
    );
}
