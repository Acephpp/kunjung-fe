import Image from "next/image";

export default function Section() {
    return (
        <section className="max-w-9xl mx-auto px-10 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>

                </div>
                <div>
                    <p className="text-sm font-bold text-gray-800 mb-15">
                        KUNJUNG Family
                    </p>
                </div>

                {/* Kiri atas */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-snug">
                        Defining Comfort
                    </h2>
                    <p className="text-gray-600">
                        Redefine Comfort, Discover <br /> One’s Self
                    </p>
                </div>

                {/* Kanan atas */}
                <div>
                    {/* Tambahkan teks KUNJUNG Family */}
                    
                    <p className="text-gray-700 leading-relaxed">
                        A home of unparalleled connections, offering a journey of transformation
                        through accessible artistry.
                        <br /><br />
                        Kunjung was created to be more than a place to stay; it’s a place to belong.
                        Here, every visit is a chance to find warmth, inspiration, and comfort in a
                        space that feels like home. Our team welcomes each guest as part of our story,
                        crafting moments that stay with you long after you leave.
                    </p>
                </div>

                {/* Kiri bawah → Gambar 1 */}
                <div>
                    <Image
                        src="/images/dc-1.png"
                        alt="Image 1"
                        width={600}
                        height={400}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Kanan bawah → Gambar 2 */}
                <div>
                    <Image
                        src="/images/dc-2.png"
                        alt="Image 2"
                        width={600}
                        height={400}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </section>
    );
}
