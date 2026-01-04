import Image from "next/image";

export default function GallerySection() {
    return (
        <section className="bg-[#D9CBB9] px-4 md:px-12 py-6 md:py-16">
            <div className="grid grid-cols-1 gap-5 md:gap-16 font-secondary">
                {/* Grid atas (2 kolom) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                    {/* Stays */}
                    <div>
                        <Image
                            src="/images/stays.png"
                            alt="Stays"
                            width={600}
                            height={400}
                            className="object-cover w-full h-[250px] sm:[350px] md:h-[420px]"
                        />
                        <div className="flex justify-between md:mt-3 text-[18px] md:text-[32px]">
                            <span className="text-[#4A3B2D]">stays</span>
                            <span className="text-[#A06A55] cursor-pointer hover:underline">
                                more
                            </span>
                        </div>
                    </div>

                    {/* Weddings */}
                    <div>
                        <Image
                            src="/images/weddings.png"
                            alt="Stays"
                            width={600}
                            height={400}
                            className="object-cover w-full h-[250px] sm:[350px] md:h-[420px]"
                        />
                        <div className="flex justify-between md:mt-3 text-[18px] md:text-[32px]">
                            <span className="text-[#4A3B2D]">events</span>
                            <span className="text-[#A06A55] cursor-pointer hover:underline">
                                more
                            </span>
                        </div>
                    </div>
                </div>

                {/* Grid bawah (1:4 ratio) */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-end">
                    {/* Teks kiri (1 kolom) */}
                    <div className="col-span-2 items-end hidden md:flex">
                        <h2 className="text-[80px] font-medium text-[#8B4C3A]/40 leading-tight tracking-tight text-end">
                            All houses
                        </h2>
                    </div>

                    {/* Gambar kanan (4 kolom) */}
                    <div className="col-span-4">
                        <Image
                            src="/images/shoots.png"
                            alt="Shoots"
                            width={1200}
                            height={600}
                            className="object-cover w-full h-[250px] sm:[350px] md:h-[500px]"
                        />
                        <div className="flex justify-between md:mt-3 text-[18px] md:text-[32px]">
                            <span className="text-[#4A3B2D]">shoots</span>
                            <span className="text-[#A06A55] cursor-pointer hover:underline">
                                more
                            </span>
                        </div>
                    </div>
                </div>

                <h2 className="block sm:hidden mt-3 text-[32px] font-medium text-[#956452] leading-tight tracking-tight">
                    All houses
                </h2>
            </div>
        </section>
    );
}
