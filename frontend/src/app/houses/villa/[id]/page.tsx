
import ProductVillaSection from "@/components/villa/ProductVillaSection";
import TestimoniVillaSection from "@/components/villa/TestimoniVilla";
import VillaDetail from "@/components/villa/VillaDetail";
import VillaHeader from "@/components/villa/VillaHeader";

export default function Page() {
    return (
        <div className="max-w-9xl mx-auto px-10 py-5 bg-[#FCFBF7] space-y-20">
            <VillaHeader/>
            <VillaDetail/>
            <TestimoniVillaSection/>
            <ProductVillaSection/>
        </div>
    )
}