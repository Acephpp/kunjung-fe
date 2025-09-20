"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    const linkClass = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")
        ? "text-white"
        : "text-white/40 hover:text-white";

    return (
        <footer className="bg-[#7A3E2C] text-[#F5E9E2] h-[648px]">
            <div className="max-w-9xl mx-auto px-10 pt-12 pb-6 flex flex-col h-full">
                {/* Top Menu */}
                <nav className="flex flex-wrap gap-2 text-[40px] max-w-3xl">
                    <Link href="/" className={linkClass("/")}>
                        home
                    </Link>
                    <span>/</span>
                    <Link href="/houses" className={linkClass("/houses")}>
                        houses
                    </Link>
                    <span>/</span>
                    <Link href="/about" className={linkClass("/about")}>
                        brand ethos
                    </Link>
                    <span>/</span>
                    <Link href="/stays" className={linkClass("/stays")}>
                        stays
                    </Link>
                    <span>/</span>
                    <Link href="/weddings" className={linkClass("/weddings")}>
                        weddings
                    </Link>
                    <span>/</span>
                    <Link href="/shoots" className={linkClass("/shoots")}>
                        shoots
                    </Link>
                </nav>

                {/* Spacer supaya konten bawah nempel ke bawah */}
                <div className="flex-grow"></div>

                <div className="flex justify-between items-end">
                    {/* Logo */}
                    <div>
                        <img
                            src="/images/kunjung-white.png"
                            alt="Kunjung Logo"
                            className="h-10 w-auto"
                        />
                    </div>

                    <div className="text-[16px] text-gray-300 leading-tight text-right">
                        <p>all right reserved</p>
                        <p>© 2025, kunjung family</p>
                    </div>
                </div>

                {/* Garis */}
                <div className="border-t border-[#F5E9E2] mt-4"></div>

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center text-2xl gap-6 mt-4">
                    {/* Left - Email */}
                    <a
                        href="mailto:info@kunjungfamily.com"
                        className="hover:underline flex items-center gap-1"
                    >
                        info@kunjungfamily.com ↗
                    </a>

                    {/* Right Side */}
                    <div className="flex flex-wrap gap-2 text-2xl">
                        <a href="#" className="hover:underline">
                            linkedin
                        </a>
                        <span>/</span>
                        <a href="#" className="hover:underline">
                            instagram
                        </a>
                        <span>/</span>
                        <a href="#" className="hover:underline">
                            tiktok
                        </a>
                        <span>/</span>
                        <a href="#" className="hover:underline">
                            pinterest
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
