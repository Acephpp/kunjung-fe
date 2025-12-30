"use client";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#FAF8F3] text-[#1E1E1E] font-primary">
            <section className="max-w-9xl mx-auto px-6 md:px-10 lg:px-16 pt-16 md:pt-24 pb-24 md:pb-32">

                {/* TITLE */}
                <div className="text-center mb-14 md:mb-24">
                    <p className="text-[14px] md:text-[20px] mb-2 md:mb-3">
                        Get in touch
                    </p>
                    <h1 className="font-serif leading-tight text-[36px] md:text-[90px]">
                        Contact Us
                    </h1>
                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 lg:gap-32 items-start">

                    {/* LEFT TEXT (DESKTOP AMAN) */}
                    <div className="max-w-[650px] text-left">
                        <h2 className="text-[16px] md:text-[30px] leading-snug mb-4">
                            We’d love to hear from you! If you have any questions
                            about stays, events, or content production needs
                        </h2>
                        <p className="text-[14px] md:text-[20px] text-[#4A4A4A] leading-relaxed">
                            Reach out anytime, we’re here to make your experience
                            seamless and unforgettable.
                        </p>
                    </div>

                    {/* FORM — LOGIN STYLE */}
                    <form className="w-full max-w-full space-y-7 font-secondary">

                        {/* NAME */}
                        <div className="relative">
                            <input
                                type="text"
                                id="contact-name"
                                placeholder=" "
                                required
                                className="
                                    peer
                                    w-full
                                    h-[56px]
                                    rounded-2xl
                                    border border-gray-400
                                    bg-[#FAF8F3]
                                    px-5
                                    text-[16px]
                                    outline-none
                                    transition-all
                                    duration-200
                                    ease-out
                                    focus:border-black
                                    focus:shadow-sm
                                "
                            />
                            <label
                                htmlFor="contact-name"
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                    text-[16px]
                                    px-2
                                    bg-[#FAF8F3]
                                    pointer-events-none
                                    transition-all
                                    duration-200
                                    ease-out

                                    peer-focus:top-0
                                    peer-focus:text-[12px]
                                    peer-focus:text-black

                                    peer-not-placeholder-shown:top-0
                                    peer-not-placeholder-shown:text-[12px]
                                    peer-not-placeholder-shown:text-black
                                "
                            >
                                Name*
                            </label>
                        </div>

                        {/* EMAIL */}
                        <div className="relative">
                            <input
                                type="email"
                                id="contact-email"
                                placeholder=" "
                                required
                                className="
                                    peer
                                    w-full
                                    h-[56px]
                                    rounded-2xl
                                    border border-gray-400
                                    bg-[#FAF8F3]
                                    px-5
                                    text-[16px]
                                    outline-none
                                    transition-all
                                    duration-200
                                    ease-out
                                    focus:border-black
                                    focus:shadow-sm
                                "
                            />
                            <label
                                htmlFor="contact-email"
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                    text-[16px]
                                    px-2
                                    bg-[#FAF8F3]
                                    pointer-events-none
                                    transition-all
                                    duration-200
                                    ease-out

                                    peer-focus:top-0
                                    peer-focus:text-[12px]
                                    peer-focus:text-black

                                    peer-not-placeholder-shown:top-0
                                    peer-not-placeholder-shown:text-[12px]
                                    peer-not-placeholder-shown:text-black
                                "
                            >
                                E-mail*
                            </label>
                        </div>

                        {/* PHONE */}
                        <div className="relative">
                            <input
                                type="tel"
                                id="contact-phone"
                                placeholder=" "
                                required
                                className="
                                    peer
                                    w-full
                                    h-[56px]
                                    rounded-2xl
                                    border border-gray-400
                                    bg-[#FAF8F3]
                                    px-5
                                    text-[16px]
                                    outline-none
                                    transition-all
                                    duration-200
                                    ease-out
                                    focus:border-black
                                    focus:shadow-sm
                                "
                            />
                            <label
                                htmlFor="contact-phone"
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                    text-[16px]
                                    px-2
                                    bg-[#FAF8F3]
                                    pointer-events-none
                                    transition-all
                                    duration-200
                                    ease-out

                                    peer-focus:top-0
                                    peer-focus:text-[12px]
                                    peer-focus:text-black

                                    peer-not-placeholder-shown:top-0
                                    peer-not-placeholder-shown:text-[12px]
                                    peer-not-placeholder-shown:text-black
                                "
                            >
                                Phone number*
                            </label>
                        </div>

                        {/* MESSAGE */}
                        <div className="relative">
                            <textarea
                                id="contact-message"
                                placeholder=" "
                                required
                                className="
                                    peer
                                    w-full
                                    h-[180px]
                                    rounded-2xl
                                    border border-gray-400
                                    bg-[#FAF8F3]
                                    px-5
                                    py-4
                                    text-[16px]
                                    outline-none
                                    resize-none
                                    transition-all
                                    duration-200
                                    ease-out
                                    focus:border-black
                                    focus:shadow-sm
                                "
                            />
                            <label
                                htmlFor="contact-message"
                                className="
                                    absolute
                                    left-4
                                    top-5
                                    text-gray-400
                                    text-[16px]
                                    px-2
                                    bg-[#FAF8F3]
                                    pointer-events-none
                                    transition-all
                                    duration-200
                                    ease-out

                                    peer-focus:top-0
                                    peer-focus:text-[12px]
                                    peer-focus:text-black

                                    peer-not-placeholder-shown:top-0
                                    peer-not-placeholder-shown:text-[12px]
                                    peer-not-placeholder-shown:text-black
                                "
                            >
                                Messages*
                            </label>
                        </div>

                        {/* BUTTON */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="
                                    w-full md:w-[200px]
                                    bg-[#7A3E2C]
                                    hover:bg-[#6c3827]
                                    active:scale-[0.98]
                                    text-white
                                    py-3 md:py-2.5
                                    rounded-md
                                    transition-all
                                    duration-200
                                    ease-out
                                "
                            >
                                send messages
                            </button>
                        </div>

                    </form>
                </div>
            </section>
        </main>
    );
}
