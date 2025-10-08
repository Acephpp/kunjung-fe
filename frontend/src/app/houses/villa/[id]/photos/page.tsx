import { villas } from "../../../../data/villas";
import NavbarPhotos from "@/components/villa/gallery/NavbarPhotos";
import VillaGalleryHeader from "@/components/villa/gallery/VillaGalleryHeader";
import VillaImageDetail from "@/components/villa/gallery/VillaImageDetail";

export default function PhotosPage({ params }: { params: { id: string } }) {
    const villa = villas.find((v) => v.id === Number(params.id));

    if (!villa) return <div className="p-10 text-center">Villa not found.</div>;

    return (
        <div className="min-h-screen bg-[#FCFBF7] text-gray-800">
            <NavbarPhotos/>
            <VillaGalleryHeader villa={villa}/>
            <VillaImageDetail/>
        </div>
    );
}
