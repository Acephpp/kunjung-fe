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
    mapUrl: string;
    totalPrice: string;
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
            "Silas House is a retreat for those who want to feel the warmth in the cool outskirts of Bandung. Through mid-century modern architecture and minimalist touches, you will find a light shine in an open space, a backyard featuring onsen, an outdoor lounge, and a wide balcony that looks out to a carpet of green valley view.\n\nAs you pass by, you can already feel the fresh air, attracted by the iconic roof with two minimalist and mid-century buildings of our house, which urges you to experience the ambiance inside.",

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
            "Silas House is located in the additional part of Bandung city, where daily life continues in a typical urban structure. There are 3 volumes on the site each accommodating different requirements. These volumes are independent from one another, and scattered across the site, creating a series of connected individual gardens, open and surroundings.",
        address:
            "Setiabudi Regency, Jl. Lapiz Lazuli Blok C No.125, Kel. Cihideung, Kec. Parongpong, Bandung Barat, 40559",
        mapUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37412.68649029256!2d107.52984755674326!3d-6.8706829513027525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e4559bd023cd%3A0xb21724a94d165f8!2sJenderal%20Achmad%20Yani%20University!5e1!3m2!1sen!2sid!4v1758353571428!5m2!1sen!2sid",
        totalPrice: "Rp. 12.500.000",
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
        mapUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.01!2d107.59!3d-6.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7d!2sJl.%20Setiabudi%20No.%2088!5e0!3m2!1sen!2sid!4v1695200000000",
        totalPrice: "IDR 10.500.000",
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
        mapUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.99!2d107.61!3d-6.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e8c!2sJl.%20Raya%20Lembang%20No.%2045!5e0!3m2!1sen!2sid!4v1695200000000",
        totalPrice: "IDR 11.400.000",
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
        mapUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.00!2d107.57!3d-6.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9c!2sJl.%20Parongpong%20No.%2027!5e0!3m2!1sen!2sid!4v1695200000000",
        totalPrice: "IDR 9.600.000",
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
        mapUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.02!2d107.62!3d-6.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9d!2sJl.%20Ir.%20H.%20Juanda%20No.%20100!5e0!3m2!1sen!2sid!4v1695200000000",
        totalPrice: "IDR 19.500.000",
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
        mapUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.03!2d107.55!3d-6.89!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9e!2sJl.%20Raya%20Ciwidey%20No.%2012!5e0!3m2!1sen!2sid!4v1695200000000",
        totalPrice: "IDR 16.500.000",
    },
];
