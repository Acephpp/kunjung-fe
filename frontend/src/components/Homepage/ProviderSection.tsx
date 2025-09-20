export default function ProviderSection() {
    return (
        <section className="relative bg-[#753C27] text-white h-[1080px] flex flex-col justify-between mt-5 w-full">
            {/* Content atas */}
            <div className="px-12 pt-12">
                <h1 className="text-[140px] font-serif leading-[1] tracking-tight">
                    A provider of curated <br /> boutique villas
                </h1>
                <p className="mt-6 text-2xl text-gray-200">
                    offers not just a visit but a meaningful connection <br />
                    and memories that linger.
                </p>
            </div>

            {/* Footer teks kiri & kanan */}
            <div className="flex justify-between items-end px-12 pb-10">
                <span className="text-[80px] font-medium text-white/20">bandung</span>
                <span className="text-[80px] font-medium text-white/20">indonesia</span>
            </div>
        </section>
    );
}
