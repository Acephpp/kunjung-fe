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

    // Cek apakah URL mengandung '/photos'
    const isPhotosPage = pathname?.includes("/photos");

    return (
        <>
            {!isPhotosPage && <Navbar />}
            <main className={!isPhotosPage ? "pt-20" : ""}>{children}</main>
            {!isPhotosPage && <Footer />}
        </>
    );
}
