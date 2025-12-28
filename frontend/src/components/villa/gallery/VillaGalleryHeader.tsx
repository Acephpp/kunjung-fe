export default function VillaGalleryHeader({ villa }: { villa: any }) {
    return (
        <section className="bg-[#FCFBF7] text-gray-800 border-b border-gray-200">
            <div
                className="
                    max-w-9xl mx-auto
                    px-4 py-10 sm:py-16
                    md:px-10 md:py-24
                    grid grid-cols-1 md:grid-cols-6
                    gap-8 md:gap-12
                    items-start
                "
            >
                {/* Kiri: Nama Villa */}
                <div className="md:col-span-2">
                    <h1
                        className="
                            text-4xl leading-tight
                            md:text-6xl
                            font-primary text-[#3A3A3A]
                        "
                    >
                        {villa.name}
                    </h1>
                </div>

                {/* Kanan: Deskripsi dan Alamat */}
                <div className="md:col-span-4 space-y-8 md:space-y-12">
                    {/* Deskripsi */}
                    <p
                        className="
                            text-xl leading-relaxed
                            md:text-3xl
                            text-[#3A3A3A]
                            font-secondary
                        "
                    >
                        {villa.detailHeader}
                    </p>

                    {/* Alamat */}
                    <div
                        className="
                            text-sm
                            md:text-[16px]
                            text-gray-600
                            leading-relaxed
                        "
                    >
                        <p className="font-medium font-secondary">
                            {villa.address.split(",")[0]},
                        </p>
                        <p className="font-secondary">
                            {villa.address.split(",").slice(1).join(",")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
