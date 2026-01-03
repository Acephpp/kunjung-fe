"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationVilla({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        // Simple logic for now: show all pages if convenient, or add ellipsis logic later if needed.
        // Assuming not too many pages for now based on context "12 per page".
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-8 md:mt-16 font-secondary">
            {/* Previous Button */}
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-full border border-gray-200 transition-colors
                    ${currentPage === 1
                        ? "text-gray-300 cursor-not-allowed border-gray-100"
                        : "text-gray-800 hover:bg-gray-50 border-gray-300"
                    }`}
                aria-label="Previous Page"
            >
                <FiChevronLeft size={20} />
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
                            ${currentPage === page
                                ? "bg-[#7A3E2C] text-white shadow-md"
                                : "bg-transparent text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full border border-gray-200 transition-colors
                    ${currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed border-gray-100"
                        : "text-gray-800 hover:bg-gray-50 border-gray-300"
                    }`}
                aria-label="Next Page"
            >
                <FiChevronRight size={20} />
            </button>
        </div>
    );
}
