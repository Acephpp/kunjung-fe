import EventSearchBar from "@/components/event/EventSearchBar";
import FilterBar from "@/components/FilterBar";
import WeddingList from "@/components/Wedding/WeddingList";

export default function page() {
    return (
        <div className="bg-[#FCFBF7] md:space-y-15">
            <div className="hidden md:block max-w-9xl mx-auto px-10">
                <FilterBar />
            </div>
            <EventSearchBar />
            <WeddingList />
        </div>
    )
}
