"use client";

import Image from "next/image";

const founderData = {
    title: "Founders' Story",
    image: "/images/founder.jpg",
    alt: "Founder Rosihan",
    paragraphs: [
        `From the beginning of his career, Rosihan has believed that a
        home is more than just a place to live — it is a space that
        inspires and comforts. With an educational background from the
        Bandung Institute of Technology (ITB) and international
        experience, he spent over a decade building Pertiwiland, a real
        estate brand known for its aesthetic design, meticulous attention
        to detail, and the philosophy that every home is a crafted
        masterpiece.`,

        `With more than 8 years in hospitality management through his own
        villas, Rosihan founded Kunjung as a natural extension of his
        vision: to create curated stays that are not only beautiful but
        also warm, welcoming, and memorable. For him, every guest is part
        of a story, and every space is an invitation to feel at home.`,
        
    ],
};

export default function FounderStory() {
    return (
        <section className="w-full py-24 bg-[#FCFBF7] text-[#222] font-primary">
            <div className="grid grid-cols-2 gap-16 items-start">
                {/* Gambar kiri */}
                <div className="w-full h-[600px] relative bg-gray-200">
                    <Image
                        src={founderData.image}
                        alt={founderData.alt}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>

                {/* Konten kanan */}
                <div className="flex flex-col justify-between h-[600px]">
                    {/* Judul di atas */}
                    <h2 className="text-5xl text-[#2b2b2b] font-primary">
                        {founderData.title}
                    </h2>

                    {/* Paragraf di bawah */}
                    <div className="space-y-6">
                        {founderData.paragraphs.map((text, index) => (
                            <p key={index} className="text-[20px] leading-relaxed font-secondary">
                                {text}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
