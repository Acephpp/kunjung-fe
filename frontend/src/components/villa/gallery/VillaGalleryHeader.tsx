export default function VillaGalleryHeader({ villa }: { villa: any }) {
    return (
        <section className="bg-[#FCFBF7] text-gray-800 border-b border-gray-200">
            {/* 🔹 Ubah grid-cols-2 → grid-cols-6 agar bisa proporsi 2/6 */}
            <div className="max-w-9xl mx-auto px-10 py-24 grid grid-cols-6 gap-12 items-start">
                {/* Kiri: Nama Villa (2/6) */}
                <div className="col-span-2">
                    <h1 className="text-6xl leading-tight font-primary text-[#3A3A3A]">
                        {villa.name}
                    </h1>
                </div>

                {/* Kanan: Deskripsi dan Alamat (4/6) */}
                <div className="col-span-4 space-y-12">
                    {/* Deskripsi utama */}
                    <p className="text-3xl leading-relaxed text-[#3A3A3A] font-secondary ">
                        {villa.detailHeader}
                    </p>

                    {/* Alamat */}
                    <div className="text-[16px] text-gray-600 leading-relaxed mb-10">
                        <p className="font-medium font-secondary">{villa.address.split(",")[0]},</p>
                        <p className="font-secondary">{villa.address.split(",").slice(1).join(",")}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
