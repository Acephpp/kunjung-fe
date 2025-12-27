"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Footer() {
    const pathname = usePathname()

    const linkClass = (href: string) =>
        pathname === href || pathname.startsWith(href + "/")
            ? "text-[#F5E9E2]"
            : "text-[#C3A295] hover:text-[#F5E9E2]"

    return (
        <footer className="bg-[#7A3E2C] text-[#F5E9E2]">
            <div className="max-w-9xl mx-auto px-6 sm:px-10 pt-10 pb-8 flex flex-col min-h-[470px] sm:min-h-[520px] lg:min-h-[600px] font-primary">

                {/* TOP MENU */}
                <nav className="flex flex-wrap gap-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-md sm:max-w-3xl leading-tight font-light mb-6 lg:mb-10">
                    <Link href="/" className={linkClass("/")}>home</Link>
                    <span className="text-[#C3A295]">/</span>
                    <Link href="/searchResult" className={linkClass("/searchResult")}>houses</Link>
                    <span className="text-[#C3A295]">/</span>
                    <Link href="/about" className={linkClass("/about")}>brand ethos</Link>
                    <span className="text-[#C3A295]">/</span>
                    <Link href="/contact" className={linkClass("/contact")}>contact</Link>
                    <span className="text-[#C3A295]">/</span>
                    <Link href="/" className={linkClass("/")}>stays</Link>
                    <span className="text-[#C3A295]">/</span>
                    <Link href="/events" className={linkClass("/events")}>weddings</Link>
                    <span className="text-[#C3A295]">/</span>
                    <Link href="/shoots" className={linkClass("/shoots")}>shoots</Link>
                </nav>

                <div className="flex-grow" />

                {/* LOGO + COPYRIGHT + TNC */}
                <div className="flex flex-col gap-4">

                    <div className="flex flex-col items-center text-center gap-3 md:flex-row md:items-end md:justify-between md:text-left">
                        <img
                            src="/images/kunjung-white.png"
                            alt="Kunjung Logo"
                            className="h-10 w-auto"
                        />

                        <div className="hidden md:block text-sm text-[#F5E9E2]/80 text-right leading-tight">
                            <p>all right reserved</p>
                            <p>© 2025, kunjung family</p>
                        </div>
                    </div>

                    {/* mobile : copyright + tnc */}
                    <div className="flex md:hidden justify-between items-end text-[11px] sm:text-xs text-[#F5E9E2]/80">
                        <div className="leading-tight">
                            <p>all right reserved</p>
                            <p>© 2025, kunjung family</p>
                        </div>

                        <a href="/tnc" className="hover:underline">
                            TnC & Refund policy
                        </a>
                    </div>
                </div>

                {/* GARIS */}
                <div className="border-t border-[#F5E9E2] mt-4" />

                {/* BOTTOM ROW */}
                <div className="mt-4 flex justify-between items-center text-[10px] sm:text-sm md:text-base lg:text-lg">

                    {/* EMAIL */}
                    <a
                        href="mailto:info@kunjungfamily.com"
                        className="hover:underline"
                    >
                        info@kunjungfamily.com ↗
                    </a>

                    {/* SOSMED */}
                    <div className="flex items-center gap-2 text-[10px] sm:text-sm md:text-base">
                        <a href="/tnc" className="hidden md:inline hover:underline text-[#F5E9E2]/80">
                            TnC & Refund policy
                        </a>

                        <span className="hidden md:inline text-[#C3A295]">|</span>

                        <a href="#" className="hover:underline">instagram</a>
                        <span>/</span>
                        <a href="#" className="hover:underline">tiktok</a>
                        <span>/</span>
                        <a href="#" className="hover:underline">youtube</a>
                    </div>
                </div>

            </div>
        </footer>
    )
}
