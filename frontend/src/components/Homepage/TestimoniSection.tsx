"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimoniSection() {
    const reviews = [
        {
            id: 1,
            name: "Olivia Rodrigo",
            date: "16 Jul 2025",
            rating: 4.7,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique, nulla vitae posuere viverra, sapien justo cursus arcu, at porta elit nisi eget orci. Mauris ultrices, odio eget dapibus dictum, risus ex facilisis purus, a ullamcorper velit lacus in nulla. Curabitur faucibus, ligula ac tincidunt suscipit, sapien leo volutpat justo, nec finibus velit nibh vel lacus.",
        },
        {
            id: 2,
            name: "James Smith",
            date: "05 Agu 2025",
            rating: 4.5,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec nibh at orci tincidunt suscipit. Nullam vehicula, augue vitae elementum viverra, lorem nisi dapibus urna, non fermentum magna sem nec nisl. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        },
        {
            id: 3,
            name: "Ayu Lestari",
            date: "20 Agu 2025",
            rating: 5.0,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Nulla facilisi. Vestibulum condimentum, lacus ut fermentum accumsan, justo lectus pretium lectus, in luctus ligula nulla non purus. Morbi faucibus eu metus nec pellentesque. Phasellus mattis sem a tortor rhoncus, nec hendrerit lectus scelerisque.",
        },
        {
            id: 4,
            name: "Michael Tan",
            date: "02 Sep 2025",
            rating: 4.8,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod erat nec nisi efficitur, nec egestas sapien suscipit. Vivamus non tincidunt est. Proin at ex sed magna posuere tempus. Integer imperdiet luctus lectus non vehicula. Suspendisse eget felis ac justo laoreet congue.",
        },
        {
            id: 5,
            name: "Clara Wijaya",
            date: "12 Sep 2025",
            rating: 4.6,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec diam risus. Integer dignissim, felis in pharetra faucibus, leo est eleifend sem, eget hendrerit lectus lacus eget est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec sodales, eros eget facilisis tincidunt, mi sem varius velit, vel elementum risus felis nec nisl.",
        },
        {
            id: 6,
            name: "Daniel Lee",
            date: "25 Sep 2025",
            rating: 4.9,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nunc convallis, efficitur elit et, hendrerit lectus. Donec non mi at lacus sodales aliquam. Nunc et orci non nunc ultricies luctus vitae ut magna. Vivamus nec odio risus. Pellentesque ac augue vitae orci commodo dignissim. Etiam sit amet est sed libero condimentum elementum.",
        },
    ]

    return (
        <section className="px-12 pt-12 pb-10 py-16 bg-[#F9F7F4]">
            {/* Header */}
            <div className="flex justify-between items-center mb-10 font-secondary">
                <div className="flex items-center space-x-3 text-[#4A3B2D]">
                    <Star className="w-7 h-7 fill-current" />
                    <span className="text-3xl font-semibold">4.9</span>
                    <span className="text-gray-500 text-lg">876 Reviews</span>
                </div>
                <div className="flex items-center space-x-8">
                    <button className="text-gray-500 text-lg hover:text-[#4A3B2D]">See All Reviews</button>
                    <button className="text-[#A06A55] text-lg font-medium flex items-center space-x-2">
                        <span className="underline">Add Review</span>
                    </button>
                </div>
            </div>

            {/* Swiper */}
            <Swiper
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                }}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="pb-8"
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review.id} className="h-full">
                        <div className="border border-gray-300 p-6 h-full flex flex-col bg-white rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold text-[#4A3B2D]">{review.name}</h3>
                                    <p className="text-sm text-gray-500">{review.date}</p>
                                </div>
                                <span className="flex items-center space-x-1 gap-1 text-sm font-medium text-[#4A3B2D]">
                                    <Star className="w-4 h-4 fill-current" /> {review.rating}
                                </span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed mt-5 line-clamp-4">
                                {review.text}
                            </p>
                            <button className="mt-auto pt-4 text-sm font-semibold underline text-start">
                                Read More
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation */}
            <div className="flex justify-center gap-6 mt-10">
                <button className="custom-prev text-black w-10 h-10 flex items-center justify-center rounded-full">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="custom-next text-black w-10 h-10 flex items-center justify-center rounded-full">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </section>
    )
}
