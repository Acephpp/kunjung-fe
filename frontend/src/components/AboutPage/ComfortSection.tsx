"use client";

export default function ComfortSection() {
    return (
        <section className="
            w-full
            flex flex-col md:flex-row
            items-start
            py-10 md:py-25
        ">
            {/* Left Side */}
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <p className="
                    text-gray-400
                    text-[20px] sm:text-[24px]
                    md:text-[28px]
                    leading-relaxed
                    font-secondary
                ">
                    Attentive Services
                </p>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2 md:ml-10">
                <p className="
                    text-[24px] sm:text-[30px]
                    md:text-[42px]
                    text-gray-900
                    font-serif font-primary
                    leading-relaxed
                ">
                    We’re here to make your stay comfortable with thoughtful service and genuine care. Whatever you need, we’re ready to assist.
                </p>
            </div>
        </section>
    );
}
