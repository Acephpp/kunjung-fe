type Villa = {
    id: number;
    name: string;
    location: string;
    guests: number;
    bedrooms: number;
    bathrooms: number;
    description: string;
    image: string;
    descImages: string[];
    weekendPrice: string;
    weekdayPrice: string;
    rating: number;
    reviews: number;
    amenities: string[];
    thingsToDo: string;
    address: string;
};

export const villas: Villa[] = [
    {
        id: 1,
        name: "Silas House",
        location: "Setiabudi, Bandung",
        guests: 15,
        bedrooms: 5,
        bathrooms: 3,
        description:
            "Silas House is a retreat for those who want to feel the warmth in the cool outskirts of Bandung. Featuring mid-century modern design with minimalist touches, open backyard lounge, and a balcony overlooking green valley views.",
        image: "/images/villa-1.jpg",
        descImages: [
            "/images/villa-1.jpg",
            "/images/villa-2.jpg",
            "/images/villa-3.jpg",
        ],
        weekendPrice: "IDR 7.000.000",
        weekdayPrice: "IDR 5.000.000",
        rating: 4.9,
        reviews: 154,
        amenities: [
            "Catering Available",
            "Pet Friendly",
            "WiFi",
            "Countryside Walks",
            "Working Fireplace",
            "Wedding Facilities",
        ],
        thingsToDo:
            "Located in the additional part of Bandung city, where daily life continues in a typical urban structure. There are 3 volumes on the site, accommodating different requirements.",
        address:
            "Setiabudi Regency, Jl. Lapiz Lazuli Blok C No.125, Kel. Cihideung, Kec. Parongpong, Bandung Barat, 40559",
    },
    {
        id: 2,
        name: "Montri House",
        location: "Setiabudi, Bandung",
        guests: 12,
        bedrooms: 4,
        bathrooms: 3,
        description:
            "Montri House combines modern elegance with comfort, making it a perfect stay for families and groups who want a stylish retreat in Bandung.",
        image: "/images/villa-2.jpg",
        descImages: [
            "/images/villa-2.jpg",
            "/images/villa-2a.jpg",
            "/images/villa-2b.jpg",
        ],
        weekendPrice: "IDR 4.500.000",
        weekdayPrice: "IDR 3.500.000",
        rating: 4.7,
        reviews: 87,
        amenities: ["WiFi", "Pet Friendly", "Wedding Facilities"],
        thingsToDo:
            "Explore modern Bandung with stylish interiors and spacious common areas.",
        address: "Jl. Setiabudi No. 88, Bandung",
    },
    {
        id: 3,
        name: "Gemala House",
        location: "Lembang, Bandung",
        guests: 10,
        bedrooms: 4,
        bathrooms: 2,
        description:
            "Gemala House offers a serene villa experience with lush surroundings. A perfect blend of modern and natural vibes with cozy living spaces.",
        image: "/images/villa-3.jpg",
        descImages: [
            "/images/villa-1.jpg",
            "/images/villa-2.jpg",
            "/images/villa-3.jpg",
        ],
        weekendPrice: "IDR 4.800.000",
        weekdayPrice: "IDR 3.800.000",
        rating: 4.8,
        reviews: 102,
        amenities: ["WiFi", "Pet Friendly", "Working Fireplace"],
        thingsToDo:
            "Enjoy the fresh mountain air and green valley landscapes while relaxing indoors.",
        address: "Jl. Raya Lembang No. 45, Bandung",
    },
    {
        id: 4,
        name: "Padri House",
        location: "Parongpong, Bandung",
        guests: 8,
        bedrooms: 3,
        bathrooms: 2,
        description:
            "Padri House blends natural design with contemporary comfort, ideal for smaller groups looking for a warm and inviting stay.",
        image: "/images/villa-4.jpg",
        descImages: [
            "/images/villa-2.jpg",
            "/images/villa-3.jpg",
            "/images/villa-1.jpg",
        ],
        weekendPrice: "IDR 4.200.000",
        weekdayPrice: "IDR 3.200.000",
        rating: 4.7,
        reviews: 65,
        amenities: ["WiFi", "Pet Friendly", "Countryside Walks"],
        thingsToDo:
            "Take a walk in the surrounding countryside or relax by the indoor fireplace.",
        address: "Jl. Parongpong No. 27, Bandung Barat",
    },
    {
        id: 5,
        name: "Atma House",
        location: "Dago, Bandung",
        guests: 20,
        bedrooms: 6,
        bathrooms: 4,
        description:
            "Atma House is a spacious villa located in the heart of Dago, featuring large living areas, modern interiors, and a beautiful view of Bandung city.",
        image: "/images/villa-1.jpg",
        descImages: [
            "/images/villa-3.jpg",
            "/images/villa-2.jpg",
            "/images/villa-1.jpg",
        ],
        weekendPrice: "IDR 8.500.000",
        weekdayPrice: "IDR 6.500.000",
        rating: 4.6,
        reviews: 78,
        amenities: ["WiFi", "Catering Available", "Wedding Facilities"],
        thingsToDo:
            "Enjoy city views the balcony and explore the vibrant neighborhood of Dago.",
        address: "Jl. Ir. H. Juanda No. 100, Dago, Bandung",
    },
    {
        id: 6,
        name: "Nusa Villa",
        location: "Ciwidey, Bandung",
        guests: 18,
        bedrooms: 5,
        bathrooms: 4,
        description:
            "Surrounded by natural landscapes, Nusa Villa offers a retreat into tranquility with spacious gardens and cozy interior designs.",
        image: "/images/villa-1.jpg",
        descImages: [
            "/images/villa-1.jpg",
            "/images/villa-2.jpg",
            "/images/villa-3.jpg",
        ],
        weekendPrice: "IDR 7.500.000",
        weekdayPrice: "IDR 5.500.000",
        rating: 4.8,
        reviews: 92,
        amenities: ["WiFi", "Pet Friendly", "Countryside Walks"],
        thingsToDo:
            "Relax with outdoor activities, garden walks, and enjoy fresh Ciwidey air.",
        address: "Jl. Raya Ciwidey No. 12, Ciwidey, Bandung",
    },
];