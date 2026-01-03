"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { villas } from "../../app/data/villas";
import PaginationVilla from "./PaginationVilla";

export default function StayList() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const totalPages = Math.ceil(villas.length / itemsPerPage);

    const currentVillas = villas.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Helper to calculate original price based on discount
    const getOriginalPrice = (priceStr: string, percentage?: number) => {
        if (!percentage) return null;
        try {
            const numericValue = parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
            if (isNaN(numericValue)) return null;

            // Percentage from data is the reduction amount
            const originalValue = numericValue / (1 - (percentage / 100));

            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            })
                .format(originalValue)
                .replace("Rp", "IDR");
        } catch (e) {
            return null;
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const section = document.getElementById("stay-list-section");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="stay-list-section" className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-10 py-5 mx-auto pb-5 md:pb-20 font-secondary scroll-mt-32">
            {/* Header */}
            <h2
                className="
                text-left md:text-center
                text-[20px] md:text-[40px]
                font-semibold font-primary
                text-gray-900
                mt-3 md:mt-0
                mb-6 md:mb-12
                pb-3 md:pb-0
                border-b md:border-b-0
                border-gray-300
            "
            >
                {villas.length} Houses for Any Occasion
            </h2>


            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-5 md:gap-y-20">
                {currentVillas.map((villa) => (
                    <Link
                        href={`/houses/villa/${villa.id}`}
                        key={villa.id}
                        className="flex flex-col cursor-pointer hover:scale-[1.02] transition-transform"
                    >
                        {/* Image */}
                        <div className="w-full h-55 md:h-64 relative">
                            {villa.discount && (
                                <div className="absolute top-3 left-3 z-10 bg-[#7A3E2C] text-white px-3 py-1 rounded-full text-xs font-bold font-primary shadow-sm">
                                    SAVE {villa.discount.percentage}% {villa.discount.label ? `| ${villa.discount.label}` : ""}
                                </div>
                            )}
                            <Image
                                src={villa.image}
                                alt={villa.name}
                                fill
                                className="object-cover rounded-sm"
                            />
                        </div>

                        {/* Location */}
                        <p className="mt-3 text-sm text-gray-500">
                            ({villa.location})
                        </p>

                        {/* Details */}
                        <div className="flex space-x-4 text-sm text-gray-800 font-bold mt-1">
                            <span>{villa.guests} Guests</span>
                            <span>{villa.bedrooms} Bedrooms</span>
                            <span>{villa.bathrooms} Bathrooms</span>
                        </div>

                        {/* Title */}
                        <h3 className="mt-1 md:mt-3 text-[20px] font-semibold text-gray-900">
                            {villa.name}
                        </h3>

                        {/* Description */}
                        <p className="mt-2 text-gray-600 text-base line-clamp-3">
                            {villa.description}
                        </p>

                        {/* Price */}
                        <div className="flex justify-between mt-6 text-sm md:text-base text-gray-800">
                            <div>
                                <p className="font-medium">Weekends</p>
                                {villa.discount && (villa.discount.appliesTo === "weekend" || villa.discount.appliesTo === "both") && (
                                    <span className="text-gray-400 text-xs line-through block -mb-1">
                                        {getOriginalPrice(villa.weekendPrice, villa.discount.percentage)}
                                    </span>
                                )}
                                <p className="text-gray-900">
                                    From <span className="font-bold">{villa.weekendPrice}</span>
                                </p>
                            </div>
                            <div>
                                <p className="font-medium">Weekdays</p>
                                {villa.discount && (villa.discount.appliesTo === "weekday" || villa.discount.appliesTo === "both") && (
                                    <span className="text-gray-400 text-xs line-through block -mb-1">
                                        {getOriginalPrice(villa.weekdayPrice, villa.discount.percentage)}
                                    </span>
                                )}
                                <p className="text-gray-900">
                                    From <span className="font-bold">{villa.weekdayPrice}</span>
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            <PaginationVilla
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </section>
    );
}
