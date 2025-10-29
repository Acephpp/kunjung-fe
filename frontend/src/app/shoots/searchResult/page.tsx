import FilterBar from "@/components/FilterBar";
import ShootsList from "@/components/Shoots/ShootsList";

export default function page() {
    return (
        <div className="max-w-9xl mx-auto px-10 py-5 bg-[#FCFBF7] space-y-20">
            <FilterBar/>
            <ShootsList/>
        </div>
    )
}
