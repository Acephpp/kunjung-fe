"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function NavbarReserve() {
    const router = useRouter();
    const pathname = usePathname();

    // Dapatkan ID villa dari URL
    const id = pathname?.split("/")[3];

    return (
        <nav className="flex items-center justify-between w-full px-4 sm:px-10 py-3 border-b border-[#E7E6E2] bg-[#FCFBF7] sticky top-0 z-40">
            {/* LEFT – BACK BUTTON */}
            <button
                onClick={() => router.push(`/houses/villa/${id}`)}
                className="
            text-[#2D2A29]
            hover:bg-gray-100
            py-2 pr-2 pl-0
            rounded-full
            transition
        "
                aria-label="Back"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </button>

            {/* RIGHT – LOGO */}
            <Image
                src="/images/logo-kunjung.png"
                alt="Kunjung"
                width={130}
                height={28}
                priority
            />
        </nav>

    );
}
