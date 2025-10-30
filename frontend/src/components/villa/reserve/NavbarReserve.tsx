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

            {/* Ganti tombol Share dengan Logo Kunjung */}
            <div className="flex items-center justify-center">
                <Image
                    src="/images/logo-kunjung.png"
                    alt="Kunjung Logo"
                    width={125}
                    height={50}
                    className="object-contain"
                    priority
                />
            </div>
        </nav>
    );
}
