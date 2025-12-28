"use client"

import Image from "next/image"
import Link from "next/link"
import { villas } from "../../app/data/villas"

export default function ProductVillaSection() {
    return (
        <section className="max-w-9xl mx-auto px-4 md:px-10 pb-12">
            <h2 className="text-center text-[24px] sm:text-[32px] md:text-[40px] font-semibold mb-8 md:mb-12 font-primary">You may also like</h2>
            <div className="overflow-x-auto lg:overflow-visible scrollbar-hide">
                <div className="flex lg:grid lg:grid-cols-4 gap-4 md:gap-10 font-secondary min-w-min lg:min-w-fit">
                    {villas.slice(0, 4).map((villa) => (
                        <Link
                            href={`/houses/villa/${villa.id}`}
                            key={villa.id}
                            className="flex flex-col cursor-pointer hover:scale-[1.02] transition-transform flex-shrink-0 w-[260px] lg:w-auto"
                        >
                            {/* Image */}
                            <div className="w-full h-[150px] sm:h-[220px] md:h-64 relative">
                                <Image
                                    src={villa.image || "/placeholder.svg"}
                                    alt={villa.name}
                                    fill
                                    className="object-cover md:rounded-sm"
                                />
                            </div>

                            {/* Location */}
                            <p className="mt-3 text-[8px] sm:text-[12px] md:text-sm text-gray-500">({villa.location})</p>

                            {/* Details */}
                            <div className="sm:flex space-x-2 md:space-x-4 text-[10px] sm:text-[12px] md:text-sm text-gray-800 font-bold mt-1">
                                <span>{villa.guests} Guests</span>
                                <span>{villa.bedrooms} Bedrooms</span>
                                <span>{villa.bathrooms} Bathrooms</span>
                            </div>

                            {/* Title */}
                            <h3 className="mt-3 text-[22px] sm:[text-25px] md:text-3xl font-semibold text-gray-900 font-primary">{villa.name}</h3>

                            {/* Description */}
                            <p className="mt-2 text-gray-600 text-[11px] sm:text-[14px] md:text-base line-clamp-3">{villa.description}</p>

                            {/* Price */}
                            <div className="flex justify-between mt-6 text-[10px] sm:text-[14px] md:text-base text-gray-800">
                                <p>
                                    <span className="font-medium">Weekends</span>
                                    <br />
                                    From <span className="font-bold">{villa.weekendPrice}</span>
                                </p>
                                <p>
                                    <span className="font-medium">Weekdays</span>
                                    <br />
                                    From <span className="font-bold">{villa.weekdayPrice}</span>
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
