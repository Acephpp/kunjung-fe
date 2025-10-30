"use client";

import { useEffect } from "react";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DateModalProps {
    isOpen: boolean;
    onClose: () => void;
    dateRange: Range[];
    setDateRange: (range: Range[]) => void;
}

export default function DateModal({ isOpen, onClose, dateRange, setDateRange }: DateModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    const handleSelect = (ranges: any) => {
        const newRange = [ranges.selection];
        setDateRange(newRange);

        const { startDate, endDate } = ranges.selection;
        if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
            setTimeout(() => onClose(), 150);
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#FCFBF7] rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6 w-auto"
            >
                <DateRange
                    ranges={dateRange}
                    onChange={handleSelect}
                    moveRangeOnFirstSelection={false}
                    months={2} // tampilkan 2 bulan berdampingan
                    direction="horizontal" // posisi horizontal seperti contoh
                    rangeColors={["#000000"]} // warna hitam untuk tanggal aktif
                />
            </div>
        </div>
    );
}
