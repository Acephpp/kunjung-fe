"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    const linkClass = (href: string) =>
        pathname === href || pathname.startsWith(href + "/")
            ? "text-[#F5E9E2]" // aktif: putih
            : "text-[#C3A295] hover:text-[#F5E9E2]"; // non-aktif: coklat muda

    return (
        <footer className="bg-[#7A3E2C] text-[#F5E9E2]">
            <div className="max-w-9xl mx-auto px-6 sm:px-10 pt-10 pb-8 flex flex-col min-h-[470px] sm:min-h-[520px] lg:min-h-[600px] font-primary">
                {/* TOP MENU */}
                <nav className="flex flex-wrap gap-2 text-[30px] sm:text-[36px] lg:text-[40px] max-w-md sm:max-w-3xl leading-tight font-light mb-6 lg:mb-10">
                    <Link href="/" className={linkClass("/")}>
                        home
                    </Link>
                    <span className="text-[#C3A295]">/</span>

                    <Link href="/houses" className={linkClass("/houses")}>
                        houses
                    </Link>
                    <span className="text-[#C3A295]">/</span>

                    <Link href="/about" className={linkClass("/about")}>
                        brand ethos
                    </Link>
                    <span className="text-[#C3A295]">/</span>

                    <Link href="/stays" className={linkClass("/stays")}>
                        stays
                    </Link>
                    <span className="text-[#C3A295]">/</span>

                    <Link href="/events" className={linkClass("/events")}>
                        events
                    </Link>
                    <span className="text-[#C3A295]">/</span>

                    <Link href="/shoots" className={linkClass("/shoots")}>
                        shoots
                    </Link>
                </nav>

                {/* Spacer supaya blok bawah nempel ke bawah */}
                <div className="flex-grow" />

                {/* LOGO + COPYRIGHT */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <img
                        src="/images/kunjung-white.png"
                        alt="Kunjung Logo"
                        className="h-10 w-auto"
                    />

                    <div className="text-[10px] sm:text-xs text-[#F5E9E2]/80 leading-tight lg:text-right">
                        <p>all right reserved</p>
                        <p>© 2025, kunjung family</p>
                    </div>
                </div>

                {/* GARIS PEMBATAS */}
                <div className="border-t border-[#F5E9E2] mt-4" />

                {/* BOTTOM ROW: EMAIL + SOSMED */}
                <div
                    className="mt-4 flex flex-row justify-between gap-3 lg:flex-row lg:items-center text-[10px] sm:text-lg font-primary"
                >
                    <a
                        href="mailto:info@kunjungfamily.com"
                        className="hover:underline whitespace-nowrap"
                    >
                        info@kunjungfamily.com ↗
                    </a>

                    <div
                        className="flex flex-row gap-2 text-[10px] sm:text-xl justify-end whitespace-nowrap"
                    >
                        <a href="#" className="hover:underline">instagram</a>
                        <span>/</span>
                        <a href="#" className="hover:underline">tiktok</a>
                        <span>/</span>
                        <a href="#" className="hover:underline">youtube</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
