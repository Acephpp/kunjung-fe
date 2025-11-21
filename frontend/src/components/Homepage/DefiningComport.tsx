import Image from "next/image";

export default function DefiningComport() {
    return (
        <section className="py-5 md:mt-[64px]">
            <div className="max-w-9xl mx-auto px-4 flex flex-col gap-3 md:px-10 md:grid md:grid-cols-2 md:gap-10">
                {/* Placeholder kiri atas (hanya untuk desktop, biar layout lama tetap) */}
                <div className="hidden md:block md:order-1"></div>

                {/* KUNJUNG Family */}
                <div className="order-4 md:order-2">
                    <p className="text-sm md:text-xl font-bold text-gray-800 mb-2 md:mb-[150px] font-primary hidden md:block">
                        KUNJUNG Family
                    </p>
                </div>

                {/* Judul + subjudul */}
                <div className="font-primary order-2 md:order-3">
                    <h2 className="text-[20px] md:text-[40px] font-bold text-gray-900 mt-1 md:mt-0 mb-3 md:mb-4 leading-snug">
                        Defining Comfort
                    </h2>
                    <p className="text-gray-600 text-[11px] md:text-xl">
                        Redefine Comfort, 
                    </p>
                    <p className="text-gray-600 text-[11px] md:text-xl">
                        Discover  One&apos;s Self
                    </p>
                </div>

                {/* Paragraf panjang */}
                <div className="order-3 md:order-4">
                    <p className="text-gray-700 text-[12px] md:text-sm leading-relaxed mt-1">
                        A home of unparalleled connections, offering a journey of transformation
                        through accessible artistry.
                        <br />
                        <br />
                        Kunjung was created to be more than a place to stay; it&apos;s a place to belong.
                        Here, every visit is a chance to find warmth, inspiration, and comfort in a
                        space that feels like home. Our team welcomes each guest as part of our story,
                        crafting moments that stay with you long after you leave.
                    </p>
                </div>

                {/* Gambar 1 → di mobile jadi gambar besar paling atas */}
                <div className="order-1 md:order-5">
                    <Image
                        src="/images/dc-1.png"
                        alt="Image 1"
                        width={600}
                        height={400}
                        className="object-cover w-full h-[220px] md:h-full"
                    />
                </div>

                {/* Gambar 2 → di mobile jadi gambar bawah */}
                <div className="order-5 md:order-6">
                    <Image
                        src="/images/dc-2.png"
                        alt="Image 2"
                        width={600}
                        height={400}
                        className="object-cover w-full h-[220px] md:h-full"
                    />
                </div>
            </div>
        </section>
    );
}
