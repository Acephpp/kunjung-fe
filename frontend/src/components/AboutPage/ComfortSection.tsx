"use client";

export default function ComfortSection() {
    return (
        <section className="w-full flex justify-between items-start py-25">
            {/* Left Side */}
            <div className="w-1/2">
                <p className="text-gray-400 text-2xl leading-relaxed font-secondary">
                    Attentive Services
                </p>
            </div>

            {/* Right Side */}
            <div className="w-1/2 ml-10">
                <p className="text-[42px] text-gray-900 font-serif font-primary">
                    We’re here to make your stay comfortable with thoughtful service and genuine care. Whatever you need, we’re ready to assist.
                </p>
            </div>
        </section>
    );
}
