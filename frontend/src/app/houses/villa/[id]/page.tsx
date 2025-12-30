
import ProductSection from "@/components/Homepage/ProductSection";
import TestimoniSection from "@/components/Homepage/TestimoniSection";
import ProductVillaSection from "@/components/villa/ProductVillaSection";
import ThingsToKnowSection from "@/components/villa/staysDetail/ThinkToKnowSection";
import TestimoniVillaSection from "@/components/villa/TestimoniVilla";
import VillaDetail from "@/components/villa/VillaDetail";
import VillaHeader from "@/components/villa/VillaHeader";

export default function Page() {
    return (
        <div>
            <VillaHeader/>
            <VillaDetail/>
            <ThingsToKnowSection/>
            <TestimoniSection/>
            <ProductSection/>
        </div>
    )
}