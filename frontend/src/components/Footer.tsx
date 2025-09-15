"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#7A3E2C] text-[#F5E9E2]">
            <div className="max-w-9xl mx-auto px-6 pt-12 pb-6 flex flex-col gap-12">
                {/* Top Menu */}
                <nav className="flex flex-wrap gap-2 text-xl md:text-2xl">
                    <Link href="/" className="font-semibold hover:underline">
                        home
                    </Link>
                    <span>/</span>
                    <Link href="/houses" className="font-semibold hover:underline">
                        houses
                    </Link>
                    <span>/</span>
                    <Link href="/brand-ethos" className="text-gray-400 hover:underline">
                        brand ethos
                    </Link>
                    <span>/</span>
                    <Link href="/stays" className="text-gray-400 hover:underline">
                        stays
                    </Link>
                    <span>/</span>
                    <Link href="/weddings" className="text-gray-400 hover:underline">
                        weddings
                    </Link>
                    <span>/</span>
                    <Link href="/shoots" className="text-gray-400 hover:underline">
                        shoots
                    </Link>
                </nav>
                <div className="flex justify-between">
                    {/* Logo */}
                    <div className="text-4xl font-bold tracking-wider">KUNJUNG</div>
                    <div className="text-xs text-gray-300 leading-tight">
                        <p>all right reserved</p>
                        <p>© 2025, kunjung family</p>
                    </div>
                </div>

                {/* Garis */}
                <div className="border-t border-[#F5E9E2]"></div>

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm gap-6">
                    {/* Left - Email */}
                    <a
                        href="mailto:info@kunjungfamily.com"
                        className="hover:underline flex items-center gap-1"
                    >
                        info@kunjungfamily.com ↗
                    </a>

                    {/* Right Side */}
                    <div className="flex flex-col md:items-end md:text-right gap-3">
                        {/* Social Links */}
                        <div className="flex flex-wrap gap-2 text-sm">
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

                        {/* Copyright */}

                    </div>
                </div>
            </div>
        </footer>
    );
}
