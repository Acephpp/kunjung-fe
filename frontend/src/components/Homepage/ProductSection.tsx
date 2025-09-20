"use client";

import Image from "next/image";
import Link from "next/link";
import { villas } from "../../app/data/villas";

export default function ProductSection() {
    return (
        <section className="max-w-9xl mx-auto px-10 py-20">
            <h2 className="text-center text-[40px] font-semibold mb-12">
                You may also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {villas.slice(0, 4).map((villa) => (
                    <Link
                        href={`/villa/${villa.id}`}
                        key={villa.id}
                        className="flex flex-col cursor-pointer hover:scale-[1.02] transition-transform"
                    >
                        {/* Image */}
                        <div className="w-full h-64 relative">
                            <Image
                                src={villa.image}
                                alt={villa.name}
                                fill
                                className="object-cover rounded-sm"
                            />
                        </div>

                        {/* Location */}
                        <p className="mt-3 text-sm text-gray-500">({villa.location})</p>

                        {/* Details */}
                        <div className="flex space-x-4 text-sm text-gray-800 font-bold mt-1">
                            <span>{villa.guests} Guests</span>
                            <span>{villa.bedrooms} Bedrooms</span>
                            <span>{villa.bathrooms} Bathrooms</span>
                        </div>

                        {/* Title */}
                        <h3 className="mt-3 text-3xl font-semibold text-gray-900">
                            {villa.name}
                        </h3>

                        {/* Description */}
                        <p className="mt-2 text-gray-600 text-base text-justify line-clamp-3">
                            {villa.description}
                        </p>

                        {/* Price */}
                        <div className="flex justify-between mt-6 text-base text-gray-800">
                            <p>
                                <span className="font-medium">Weekends</span>
                                <br />
                                From{" "}
                                <span className="font-bold">{villa.weekendPrice}</span>
                            </p>
                            <p>
                                <span className="font-medium">Weekdays</span>
                                <br />
                                From{" "}
                                <span className="font-bold">{villa.weekdayPrice}</span>
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
