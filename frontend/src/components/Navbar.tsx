"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShow(false);
            } else {
                setShow(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <header
            className={`fixed top-0 left-0 w-full bg-[#f8f7f4] border-b border-gray-200 z-50 transition-transform duration-300 ${
                show ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <div className="relative max-w-9xl mx-auto flex items-center justify-between px-10 h-20">
                {/* Logo */}
                <div className="flex items-center space-x-6">
                    <Link href="#">
                        <img
                            src="/images/kunjung.svg"
                            alt="Logo Kunjung"
                            className="h-5 w-auto"
                        />
                    </Link>
                    <span className="text-gray-400">|</span>
                    <p className="text-sm text-gray-600">List your House</p>
                </div>

                {/* Menu Tengah */}
                <nav className="absolute left-1/2 -translate-x-1/2">
                    <ul className="flex space-x-10 text-[16px]">
                        <li>
                            <Link
                                href="#"
                                className="underline underline-offset-4 text-[#808080] decoration-2"
                            >
                                Stays
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="text-[#808080] hover:underline hover:underline-offset-4 decoration-2"
                            >
                                Weddings
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="text-[#808080] hover:underline hover:underline-offset-4 decoration-2"
                            >
                                Shoots
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Icon kanan */}
                <div className="flex items-center space-x-6">
                    <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
                    <div className="space-y-2">
                        <span className="block w-20 h-[2px] bg-gray-600"></span>
                        <span className="block w-20 h-[2px] bg-gray-600"></span>
                    </div>
                </div>
            </div>
        </header>
    );
}
