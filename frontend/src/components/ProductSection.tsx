"use client";

import Image from "next/image";

type Villa = {
    name: string;
    location: string;
    guests: number;
    bedrooms: number;
    bathrooms: number;
    description: string;
    image: string;
    weekendPrice: string;
    weekdayPrice: string;
};

const villas: Villa[] = [
    {
        name: "Silas House",
        location: "Setiabudhi, Bandung",
        guests: 15,
        bedrooms: 5,
        bathrooms: 3,
        description:
            "A retreat surrounded by the warmth of a beloved uncle's home. Located in the cool outskirts of Bandung, Silas House offers comfortable spaces wit...",
        image: "/images/villa-1.jpg",
        weekendPrice: "IDR 4.056.000",
        weekdayPrice: "IDR 3.056.000",
    },
    {
        name: "Montri House",
        location: "Setiabudhi, Bandung",
        guests: 15,
        bedrooms: 5,
        bathrooms: 3,
        description:
            "A retreat surrounded by the warmth of a beloved uncle's home. Located in the cool outskirts of Bandung, Silas House offers comfortable spaces wit...",
        image: "/images/villa-2.jpg",
        weekendPrice: "IDR 4.056.000",
        weekdayPrice: "IDR 3.056.000",
    },
    {
        name: "Gemala House",
        location: "Setiabudhi, Bandung",
        guests: 15,
        bedrooms: 5,
        bathrooms: 3,
        description:
            "A retreat surrounded by the warmth of a beloved uncle's home. Located in the cool outskirts of Bandung, Silas House offers comfortable spaces wit...",
        image: "/images/villa-3.jpg",
        weekendPrice: "IDR 4.056.000",
        weekdayPrice: "IDR 3.056.000",
    },
    {
        name: "Padri House",
        location: "Setiabudhi, Bandung",
        guests: 15,
        bedrooms: 5,
        bathrooms: 3,
        description:
            "A retreat surrounded by the warmth of a beloved uncle's home. Located in the cool outskirts of Bandung, Silas House offers comfortable spaces wit...",
        image: "/images/villa-4.jpg",
        weekendPrice: "IDR 4.056.000",
        weekdayPrice: "IDR 3.056.000",
    },
];

export default function ProductSection() {
    return (
        <section className="max-w-9xl mx-auto px-6 py-16">
            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-12">
                You may also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {villas.map((villa, idx) => (
                    <div key={idx} className="flex flex-col">
                        {/* Image */}
                        <div className="w-full h-64 relative">
                            <Image
                                src={villa.image}
                                alt={villa.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Location */}
                        <p className="mt-3 text-sm text-gray-500">({villa.location})</p>

                        {/* Details */}
                        <div className="flex space-x-4 text-sm text-gray-800 font-semibold mt-1">
                            <span>{villa.guests} Guests</span>
                            <span>{villa.bedrooms} Bedrooms</span>
                            <span>{villa.bathrooms} Bathrooms</span>
                        </div>

                        {/* Title */}
                        <h3 className="mt-3 text-2xl font-semibold text-gray-900">
                            {villa.name}
                        </h3>

                        {/* Description */}
                        <p className="mt-2 text-gray-600 text-base">{villa.description}</p>

                        {/* Price */}
                        <div className="flex justify-between mt-6 text-base text-gray-800">
                            <p>
                                <span className="font-medium">Weekends</span>
                                <br />
                                From <span className="font-bold">{villa.weekendPrice}</span>
                            </p>
                            <p className="">
                                <span className="font-medium">Weekdays</span>
                                <br />
                                From <span className="font-bold">{villa.weekdayPrice}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
