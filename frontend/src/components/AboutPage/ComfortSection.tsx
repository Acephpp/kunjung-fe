"use client";

export default function ComfortSection() {
    return (
        <section className="w-full flex justify-between items-start py-25">
            {/* Left Side */}
            <div className="w-1/2">
                <p className="text-gray-400 text-2xl leading-relaxed">
                    Defining Comfort and <br /> Connection.
                </p>
            </div>

            {/* Right Side */}
            <div className="w-1/2 ml-10">
                <p className="text-5xl leading-relaxed text-gray-900 font-serif">
                    Kunjung promises to offer inspiring spaces and attentive service,
                    creating experiences that leave a lasting impression on every guest’s
                    heart.
                </p>
            </div>
        </section>
    );
}
