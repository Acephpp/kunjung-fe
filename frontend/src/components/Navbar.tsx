"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname(); // ✅ path aktif

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

    const menus = [
        { name: "Stays", href: "/" },
        { name: "Weddings", href: "/weddings" },
        { name: "Shoots", href: "/shoots" },
    ];

    return (
        <header     
            className={`fixed top-0 left-0 w-full bg-[#FCFBF7] border-b border-gray-200 z-50 transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full h-[73px]"
                }`}
        >
            <div className="relative max-w-9xl mx-auto flex items-center justify-between px-10 h-20 font-secondary">
                {/* Logo */}
                <div className="flex items-center space-x-6">
                    <Link href="/">
                        <img
                            src="/images/kunjung.svg"
                            alt="Logo Kunjung"
                            className="h-5 w-auto"
                        />
                    </Link>
                    <span className="text-gray-400">|</span>
                    <p className="text-[14px] font-medium text-gray-600">List your House</p>
                </div>

                {/* Menu Tengah */}
                <nav className="absolute left-1/2 -translate-x-1/2">
                    <ul className="flex space-x-10 text-[16px]">
                        {menus.map((menu) => (
                            <li key={menu.name}>
                                <Link
                                    href={menu.href}
                                    className={`decoration-2 underline-offset-4 ${pathname === menu.href
                                            ? "text-black underline" // ✅ aktif hitam & underline
                                            : "text-[#808080] hover:underline"
                                        }`}
                                >
                                    {menu.name}
                                </Link>
                            </li>
                        ))}
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
