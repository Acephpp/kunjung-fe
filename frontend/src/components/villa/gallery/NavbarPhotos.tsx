"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Share2 } from "lucide-react";

export default function NavbarPhotos() {
    const router = useRouter();
    const pathname = usePathname();

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: "Kunjung Villa Photos",
                url: window.location.href,
            });
        } else {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    // Dapatkan ID villa dari URL
    const id = pathname?.split("/")[3];

    return (
        <nav className="flex items-center justify-between w-full px-10 py-5 border-b-2 border-gray-200 bg-[#FCFBF7]">
            {/* Tombol Kembali */}
            <button
                onClick={() => router.push(`/houses/villa/${id}`)}
                className="group text-gray-800 hover:text-[#7A3E2C] transition-all duration-200 flex items-center gap-1"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 transform transition-transform duration-200 group-hover:-translate-x-1"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </button>


            {/* Tombol Share */}
            <button
                onClick={handleShare}
                className="flex items-center gap-2 border border-gray-300 px-4 py-1.5 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition font-secondary"
            >
                <Share2 className="w-4 h-4" />
                share
            </button>
        </nav>
    );
}
