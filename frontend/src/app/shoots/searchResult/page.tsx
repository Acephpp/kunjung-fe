import FilterBar from "@/components/FilterBar";
import ShootSearchBar from "@/components/Shoots/ShootSearchBar";
import ShootsList from "@/components/Shoots/ShootsList";

export default function page() {
    return (
        <div className="bg-[#FCFBF7] md:space-y-15">
            <div className="hidden md:block max-w-9xl mx-auto px-10">
                <FilterBar />
            </div>
            <div className="block md:hidden">
                <ShootSearchBar />
            </div>
            <ShootsList />
        </div>
    )
}
