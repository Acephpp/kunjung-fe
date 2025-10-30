"use client";

import { useEffect } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface GuestModalProps {
    isOpen: boolean;
    onClose: () => void;
    guests: number;
    setGuests: (val: number) => void;
}

export default function GuestModal({ isOpen, onClose, guests, setGuests }: GuestModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#FCFBF7] rounded-3xl shadow-md border border-gray-200 px-8 py-6 w-[340px] sm:w-[380px] font-secondary text-gray-800"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                    <p className="text-[15px] font-medium text-gray-800">Add Guests</p>
                    <div className="flex items-center gap-4 text-gray-600">
                        <button
                            onClick={() => setGuests(Math.max(0, guests - 1))}
                            disabled={guests === 0}
                            className="text-[15px] hover:text-gray-800 disabled:opacity-40 transition"
                        >
                            <FiMinus size={14} />
                        </button>
                        <span className="text-[15px] w-3 text-center">{guests}</span>
                        <button
                            onClick={() => setGuests(guests + 1)}
                            className="text-[15px] hover:text-gray-800 transition"
                        >
                            <FiPlus size={14} />
                        </button>
                    </div>
                </div>

                {/* Garis bawah */}
                <div className="border-b border-gray-400 mt-3"></div>
            </div>
        </div>
    );
}
