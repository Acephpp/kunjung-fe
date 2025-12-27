"use client";

export default function AboutIntro() {
    const section = {
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
        note: `Our Core Principle:\nWarm, Accessible, and Curated`,
    };

    return (
        <section className="py-8 sm:12 md:py-16 border-b border-gray-200 text-[#222] font-serif">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
                
                {/* TITLE */}
                <div className="
                    max-w-xl 
                    md:sticky md:top-24
                    self-start
                ">
                    <h2 className="
                        text-[20px] sm:text-[28px] md:text-[32px]
                        font-medium leading-relaxed font-primary
                    ">
                        {section.title}
                    </h2>
                </div>

                {/* CONTENT */}
                <div className="
                    space-y-6
                    text-[16px] sm:text-[18px] md:text-[22px]
                    leading-relaxed
                    whitespace-pre-line
                    font-secondary
                ">
                    <p>{section.content}</p>

                    <p className="
                        text-[14px] sm:text-[16px] md:text-[22px]
                        max-w-[240px]
                        text-gray-400
                        mt-16 md:mt-[100px]
                    ">
                        {section.note}
                    </p>
                </div>
            </div>
        </section>
    );
}
