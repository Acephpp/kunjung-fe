import FilterBar from "@/components/FilterBar";
import WeddingList from "@/components/Wedding/WeddingList";

export default function page() {
    return (
        <div className="max-w-9xl mx-auto px-10 py-5 bg-[#FCFBF7] space-y-20">
            <FilterBar/>
            <WeddingList/>
        </div>
    )
}
