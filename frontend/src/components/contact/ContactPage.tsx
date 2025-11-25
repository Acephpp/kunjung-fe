export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#FAF8F3] text-[#1E1E1E] font-primary">
            <section className="max-w-9xl mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-32">

                {/* TITLE */}
                <div className="text-center mb-24">
                    <p className="text-[20px] mb-3">Get in touch</p>
                    <h1 className="font-serif text-[64px] leading-none md:text-[90px]">
                        Contact Us
                    </h1>
                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32 items-start">

                    {/* LEFT SIDE TEXT */}
                    <div className="max-w-[650px]">
                        <h2 className="text-[30px] leading-snug mb-4">
                            We’d love to hear from you! If you have any questions
                            about stays, events, or content production needs
                        </h2>
                        <p className="text-[20px] text-[#4A4A4A] leading-relaxed">
                            Reach out anytime, we’re here to make your experience seamless
                            and unforgettable.
                        </p>
                    </div>

                    {/* FORM */}
                    <form className="w-full space-y-5">

                        {/* Name */}
                        <div>
                            <label className="text-[13px] mb-1 block">Name*</label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border border-[#7A3E2C] bg-[#FAF8F3] rounded-lg px-4 h-[56px] text-[16px] outline-none focus:ring-2 focus:ring-[#7A3E2C]"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-[13px] mb-1 block">E-mail*</label>
                            <input
                                type="email"
                                placeholder="E-mail*"
                                className="w-full border border-[#7A3E2C] bg-[#FAF8F3] rounded-lg px-4 h-[56px] text-[16px]
            outline-none focus:ring-2 focus:ring-[#7A3E2C]"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-[13px] mb-1 block">Phone number*</label>
                            <input
                                type="tel"
                                placeholder="Phone number*"
                                className="w-full border border-[#7A3E2C] bg-[#FAF8F3] rounded-lg px-4 h-[56px] text-[16px]
            outline-none focus:ring-2 focus:ring-[#7A3E2C]"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="text-[13px] mb-1 block">Messages*</label>
                            <textarea
                                placeholder="Messages*"
                                className="w-full border border-[#7A3E2C] bg-[#FAF8F3] rounded-lg px-4 py-3 h-[200px] text-[16px]
            outline-none focus:ring-2 focus:ring-[#7A3E2C] resize-none"
                            />
                        </div>
                    </form>

                </div>
            </section>
        </main>
    );
}
