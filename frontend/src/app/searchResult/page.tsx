import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/Homepage/SearchBar";
import ShootsList from "@/components/Shoots/ShootsList";
import StayList from "@/components/stays/StaysList";

export default function page() {

    return (
        <div className="bg-[#FCFBF7] md:space-y-15">
            <div className="hidden md:block max-w-9xl mx-auto px-4 sm:px-6 lg:px-10">
                <FilterBar />
            </div>
            <div className="block md:hidden">
                <SearchBar/>
            </div>
            <StayList />
        </div>
    )
}
