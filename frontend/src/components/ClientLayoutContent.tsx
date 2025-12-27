"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Cek apakah halaman khusus tanpa layout
    const isPhotosPage = pathname?.includes("/photos");
    const isReservePage = pathname?.includes("/reserve");

    // Tentukan apakah layout perlu ditampilkan
    const hideLayout = isPhotosPage || isReservePage;

    return (
        <>
            {!hideLayout && <Navbar />}
            <main className={!hideLayout ? "pt-19 md:pt-20" : ""}>
                {children}
            </main>
            {!hideLayout && <Footer />}
        </>
    );
}
