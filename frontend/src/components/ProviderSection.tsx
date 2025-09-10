export default function ProviderSection() {
    return (
        <section className="relative bg-[#753C27] text-white h-screen flex flex-col justify-between">
            {/* Content atas */}
            <div className="px-12 pt-20">
                <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
                    A provider of curated <br /> boutique villas
                </h1>
                <p className="mt-6 text-lg text-gray-200 max-w-xl">
                    offers not just a visit but a meaningful connection <br />
                    and memories that linger.
                </p>
            </div>

            {/* Footer teks kiri & kanan */}
            <div className="flex justify-between items-end px-12 pb-10">
                <span className="text-3xl text-gray-400">bandung</span>
                <span className="text-3xl text-gray-400">indonesia</span>
            </div>
        </section>
    );
}
