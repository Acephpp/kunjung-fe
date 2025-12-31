"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { Star, ChevronLeft, ChevronRight, PenOffIcon, Pen } from "lucide-react"

/* ==============================
   Helper truncate
================================ */
const truncateText = (text: string, max: number) => {
    if (text.length <= max) return text
    return text.slice(0, max).trim() + "..."
}

export default function TestimoniSection() {
    const reviews = [
        {
            id: 1,
            name: "Olivia Rodrigo",
            date: "16 Jul 2025",
            rating: 4.7,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique, nulla vitae posuere viverra, sapien justo cursus arcu, at porta elit nisi eget orci. Mauris ultrices, odio eget dapibus dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique, nulla vitae posuere viverra, sapien justo cursus arcu, at porta elit nisi eget orci. Mauris ultrices, odio eget dapibus dictum.",
        },
        {
            id: 2,
            name: "James Smith",
            date: "05 Agu 2025",
            rating: 4.5,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            id: 3,
            name: "Ayu Lestari",
            date: "20 Agu 2025",
            rating: 5.0,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat.",
        },
        {
            id: 4,
            name: "Michael Tan",
            date: "02 Sep 2025",
            rating: 4.8,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod erat nec nisi efficitur.",
        },
        {
            id: 5,
            name: "Clara Wijaya",
            date: "12 Sep 2025",
            rating: 4.6,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            id: 6,
            name: "Daniel Lee",
            date: "25 Sep 2025",
            rating: 4.9,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nunc convallis, efficitur elit et hendrerit lectus.",
        },
    ]

    return (
        <section className="px-4 md:px-10 pt-6 md:pt-14 pb-6 md:pb-16">
            {/* HEADER */}
            <div
                className="
        flex
        flex-row
        justify-between
        items-center
        gap-4
        mb-8

        md:flex-row
        md:justify-between
        md:items-center
        md:mb-10
    "
            >
                {/* LEFT */}
                <div className="flex items-center gap-3 text-[#4A3B2D]">
                    <Star className="w-6 h-6 md:w-7 md:h-7 fill-current" />
                    <span className="text-2xl md:text-3xl font-semibold">4.9</span>
                    <span className="text-sm md:text-lg text-gray-500">
                        876 Reviews
                    </span>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4 md:gap-6">
                    <button className="hidden md:block text-gray-500 text-lg font-semibold hover:text-[#4A3B2D]">
                        See All Reviews
                    </button>

                    <button
                        className="
                text-[#A06A55]
                text-sm md:text-lg
                font-medium
                flex items-center gap-2
                underline underline-offset-4
                hover:opacity-80
                transition
            "
                    >
                        <Pen className="w-4 h-4 md:w-5 md:h-5" />
                        Add Review
                    </button>
                </div>
            </div>


            {/* SWIPER */}
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1.15}
                navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                }}
                breakpoints={{
                    768: { slidesPerView: 2, spaceBetween: 24 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review.id}>
                        {/* 🔥 FIX: TINGGI KARTU DIPAKSA */}
                        <div className="h-[180px] md:h-[250px] border border-gray-300 rounded-sm bg-[#FCFBF7] p-5 md:p-6 flex flex-col">
                            {/* HEADER CARD */}
                            <div className="flex justify-between items-start md:mb-5">
                                <div>
                                    <h3 className="font-semibold text-sm md:text-base text-[#4A3B2D]">
                                        {review.name}
                                    </h3>
                                    <p className="text-xs md:text-sm text-gray-500">
                                        {review.date}
                                    </p>
                                </div>
                                <span className="flex items-center gap-1 text-xs md:text-sm font-medium text-[#4A3B2D]">
                                    <Star className="w-4 h-4 fill-current" />
                                    {review.rating}
                                </span>
                            </div>

                            {/* 🔥 FIX: AREA TEXT PUNYA TINGGI */}
                            <div className="mt-4 flex-1">
                                <p className="text-xs md:text-sm leading-relaxed text-gray-700">
                                    <span className="md:hidden">
                                        {truncateText(review.text, 120)}
                                    </span>
                                    <span className="hidden md:inline">
                                        {truncateText(review.text, 230)}
                                    </span>
                                </p>
                            </div>

                            {/* FOOTER */}
                            <button className="text-xs md:text-sm font-semibold underline text-start">
                                Read More
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* NAVIGATION DESKTOP ONLY */}
            <div className="hidden md:flex justify-center gap-6 mt-8">
                <button className="custom-prev w-10 h-10 flex items-center justify-center rounded-full">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="custom-next w-10 h-10 flex items-center justify-center rounded-full">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
            <button className="md:hidden block mt-5 text-gray-500 text-lg hover:text-[#4A3B2D]">
                See All Reviews
            </button>


        </section>
    )
}
