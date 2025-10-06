"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideUserCircle2 } from "lucide-react";

export default function Navbar() {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) setShow(false);
            else setShow(true);
            setLastScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Tutup dropdown saat klik di luar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menus = [
        { name: "Stays", href: "/" },
        { name: "Weddings", href: "/weddings" },
        { name: "Shoots", href: "/shoots" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full bg-[#FCFBF7] border-b border-gray-200 z-50 transition-transform duration-300 ${
                show ? "translate-y-0" : "-translate-y-full h-[73px]"
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
                    <p className="text-[14px] font-medium text-gray-600">
                        List your House
                    </p>
                </div>

                {/* Menu Tengah */}
                <nav className="absolute left-1/2 -translate-x-1/2">
                    <ul className="flex space-x-10 text-[16px]">
                        {menus.map((menu) => (
                            <li key={menu.name}>
                                <Link
                                    href={menu.href}
                                    className={`decoration-2 underline-offset-4 ${
                                        pathname === menu.href
                                            ? "text-black underline"
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
                <div
                    className="flex items-center space-x-6 relative"
                    ref={dropdownRef}
                >
                    {/* ✅ Icon UserCircle2 */}
                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                        className="relative p-1 rounded-full hover:bg-gray-100 transition"
                    >
                        <LucideUserCircle2 size={28} className="text-gray-700" />
                    </button>

                    {/* ✅ Dropdown */}
                    {openMenu && (
                        <div className="absolute p-2 right-0 top-12 w-52 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
                            <Link
                                href="/login/guest"
                                className="block px-6 py-3 text-[15px] font-medium text-gray-900 transition-all duration-150 rounded-lg hover:bg-[#E9E8E4]"
                            >
                                Guest
                            </Link>
                            <Link
                                href="/login/home-owner"
                                className="block px-6 py-3 text-[15px] font-medium text-gray-900 transition-all duration-150 rounded-lg hover:bg-[#E9E8E4]"
                            >
                                Home Owner
                            </Link>
                        </div>
                    )}

                    {/* Icon garis kanan */}
                    <div className="space-y-2">
                        <span className="block w-20 h-[2px] bg-gray-600"></span>
                        <span className="block w-20 h-[2px] bg-gray-600"></span>
                    </div>
                </div>
            </div>

            {/* ✅ Animasi */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-5px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.15s ease-out;
                }
            `}</style>
        </header>
    );
}
