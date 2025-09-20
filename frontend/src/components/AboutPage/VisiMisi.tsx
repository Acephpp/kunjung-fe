"use client";

import Image from "next/image";

const sections = [
    {
        title: (
            <span>
                Kunjung is a provider of curated,{" "}
                <em className="italic">artisan-crafted</em> stays.{" "}
                <span className="text-gray-400">
                    By combining architecture, cultural elements, and attentive
                    hospitality
                </span>
            </span>
        ),
        content: `Kunjung was created to be more than a place to stay; it's a place to belong. Here, every visit is a chance to find warmth, inspiration, and comfort in a space that feels like home. Our team welcomes each guest as part of our story, crafting moments that stay with you long after you leave.

With every stay, Kunjung offers not just a visit but a meaningful connection and memories that linger. The name Kunjung affirms the brand’s commitment to being a place where guests always feel welcomed, valued, and leave with a heartfelt, lasting impression.`,
        note: `Three Core principle of kunjung is warm and accessible.`,
    },
    {
        title: "Our Vision",
        content: `Kunjung envisions itself as a villa and accommodations brand that delivers deep, unforgettable experiences through attentive personal service, inspiring spaces, and soul-stirring design.`,
        image: "/images/villa-1.jpg",
    },
    {
        title: "Our Mission",
        content: `Kunjung’s mission is to provide thoughtfully tailored service for every guest, craft spaces that are visually and emotionally beautiful, and create meaningful, memorable moments. We prioritize warmth and individuality in every interaction, ensuring each guest feels welcomed and inspired.`,
        image: "/images/villa-2.jpg",
    },
];

export default function VisiMisi() {
    return (
        <main className="text-[#222] font-serif">
            {sections.map((section, index) => (
                <section
                    key={index}
                    className={`py-16 ${index === 0 ? "border-b border-gray-200" : ""}`}
                >
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="max-w-xl sticky top-24 self-start">
                            <h2 className="text-[32px] font-medium leading-relaxed font-primary">
                                {section.title}
                            </h2>
                        </div>

                        <div className="space-y-6 text-[22px] leading-relaxed whitespace-pre-line font-secondary">
                            <p>{section.content}</p>
                            {section.note && (
                                <p className="text-[22px] max-w-[240px] text-gray-400 mt-[100px]">
                                    {section.note}
                                </p>
                            )}
                            {section.image && (
                                <Image
                                    src={section.image}
                                    alt={
                                        typeof section.title === "string"
                                            ? section.title
                                            : "Image"
                                    }
                                    width={800}
                                    height={600}
                                    className="object-cover"
                                />
                            )}
                        </div>
                    </div>
                </section>
            ))}
        </main>
    );
}
