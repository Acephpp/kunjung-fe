"use client";

import Image from "next/image";

const sections = [
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
                <section key={index} className="py-16">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="max-w-xl sticky top-24 self-start">
                            <h2 className="text-[32px] font-medium leading-relaxed font-primary">
                                {section.title}
                            </h2>
                        </div>

                        <div className="space-y-6 text-[22px] leading-relaxed whitespace-pre-line font-secondary">
                            <p>{section.content}</p>
                            <Image
                                src={section.image}
                                alt={section.title}
                                width={800}
                                height={600}
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>
            ))}
        </main>
    );
}
