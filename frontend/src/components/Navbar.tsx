"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LucideSearch, LucideUserCircle2 } from "lucide-react";

export default function Navbar() {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);
    const [openFullMenu, setOpenFullMenu] = useState(false);
    const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    // ACTIVE LINK (untuk full menu)
    const linkClass = (href: string) =>
        pathname === href || pathname.startsWith(href + "/")
            ? "text-white"
            : "text-white/40 hover:text-white";

    // NAVBAR HIDE ON SCROLL
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) setShow(false);
            else setShow(true);
            setLastScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // CLICK OUTSIDE DROPDOWN
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // LOAD USER
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/");
    };

    const getInitials = (firstName: string, lastName: string) => {
        const firstInitial = firstName?.charAt(0) || "";
        const lastInitial = lastName?.charAt(0) || "";
        return (firstInitial + lastInitial).toUpperCase();
    };

    const menus = [
        { name: "stays", href: "/" },
        { name: "events", href: "/events" },
        { name: "shoots", href: "/shoots" },
    ];

    return (
        <>
            {/* ================= NAVBAR ================= */}
            <header
                className={`fixed top-0 left-0 w-full backdrop-blur-sm bg-[#FCFBF7]/80 border-b border-gray-200 z-50 transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full h-[73px]"
                    }`}
            >
                {/* DESKTOP & MOBILE CONTAINER */}
                <div className="relative max-w-9xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16 lg:h-20 font-secondary">
                    {/* LEFT LOGO + TEXT (text hanya muncul di desktop) */}
                    <div className="flex items-center space-x-3 lg:space-x-6">
                        <Link href="/">
                            <img src="/images/kunjung.svg" alt="Logo Kunjung" className="h-5 w-auto" />
                        </Link>
                        <span className="hidden lg:inline text-gray-400">|</span>
                        <p className="hidden lg:block text-[14px] font-medium text-gray-600">
                            List your House
                        </p>
                    </div>

                    {/* CENTER MENU (HANYA DESKTOP) */}
                    <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
                        <ul className="flex space-x-10 text-[16px]">
                            {menus.map((menu) => (
                                <li key={menu.name}>
                                    <Link
                                        href={menu.href}
                                        className={`decoration-2 underline-offset-4 ${pathname === menu.href ||
                                            (pathname.includes(menu.href) && menu.href !== "/")
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

                    {/* RIGHT SECTION (user + hamburger) */}
                    <div
                        className="flex items-center space-x-4 lg:space-x-6 relative"
                        ref={dropdownRef}
                    >
                        {/* USER / AVATAR */}
                        <button
                            onClick={() => setOpenMenu(!openMenu)}
                            className={`relative p-1 rounded-full transition flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 ${user ? "bg-[#2D2A29]" : "hover:bg-gray-100"
                                }`}
                        >
                            {user ? (
                                <span className="font-semibold text-white text-xs lg:text-sm">
                                    {getInitials(user.firstName, user.lastName)}
                                </span>
                            ) : (
                                <LucideUserCircle2
                                    size={24}
                                    className="text-gray-700 lg:w-7 lg:h-7"
                                />
                            )}
                        </button>

                        {/* DROPDOWN */}
                        {openMenu && (
                            <div className="absolute p-2 right-0 top-10 lg:top-12 w-70 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
                                {user ? (
                                    <>
                                        <Link
                                            href="/reservations"
                                            className="block px-6 py-3 hover:bg-[#E9E8E4] hover:rounded-xl"
                                        >
                                            Reservations
                                        </Link>
                                        <Link
                                            href="/edit-profile"
                                            className="block px-6 py-3 hover:bg-[#E9E8E4] hover:rounded-xl"
                                        >
                                            Edit Personal Information
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-6 py-3 hover:bg-[#E9E8E4] hover:rounded-xl"
                                        >
                                            Log out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/auth/login/guest"
                                            className="block px-6 py-3 hover:bg-[#E9E8E4] hover:rounded-xl"
                                        >
                                            Guest
                                        </Link>
                                        <Link
                                            href="/auth/login/homeOwner"
                                            className="block px-6 py-3 hover:bg-[#E9E8E4] hover:rounded-xl"
                                        >
                                            Home Owner
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}

                        {/* ======= HAMBURGER (2 GARIS) ======= */}
                        <button
                            onClick={() => setOpenFullMenu(true)}
                            className="flex flex-col justify-center items-center space-y-2 group"
                            aria-label="Open navigation menu"
                        >
                            <span
                                className={`block h-[2px] transition-all duration-200 ${openFullMenu
                                    ? "w-16 bg-black"
                                    : "w-16 bg-gray-600 group-hover:w-[60px] group-hover:bg-black"
                                    }`}
                            ></span>
                            <span
                                className={`block h-[2px] transition-all duration-200 ${openFullMenu
                                    ? "w-16 bg-black"
                                    : "w-16 bg-gray-600 group-hover:w-[60px] group-hover:bg-black"
                                    }`}
                            ></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* ================= FULL TOP MENU (OVERLAY) ================= */}
            {openFullMenu && (
                <div className="fixed inset-x-0 top-0 h-screen lg:h-[50vh] bg-[#7A3E2C] text-[#F5E9E2] z-[999] animate-slideInRight">
                    {/* Sama dengan container navbar → max-w + padding */}
                    <div className="relative max-w-9xl mx-auto h-full px-4 sm:px-6 lg:px-10">
                        {/* X BUTTON */}
                        <button
                            onClick={() => setOpenFullMenu(false)}
                            className="absolute top-3 right-4 sm:top-4 sm:right-6 lg:top-2 lg:right-10 text-white text-4xl sm:text-5xl lg:text-7xl"
                            aria-label="Close navigation menu"
                        >
                            ✕
                        </button>

                        {/* MAIN MENU */}
                        <div className="absolute top-10 left-4 sm:left-6 lg:top-5 lg:left-10 font-primary">
                            <nav className="text-[32px] sm:text-[40px] lg:text-[48px] leading-tight flex flex-wrap gap-x-2 gap-y-1 max-w-5xl">
                                <Link href="/" className={linkClass("/")}>
                                    home
                                </Link>
                                <span className="text-white/40">/</span>

                                <Link href="/houses" className={linkClass("/houses")}>
                                    houses
                                </Link>
                                <span className="text-white/40">/</span>

                                <Link href="/about" className={linkClass("/about")}>
                                    brand ethos
                                </Link>
                                <span className="text-white/40">/</span>
                                <Link href="/contact" className={linkClass("/contact")}>
                                    contact
                                </Link>
                                <span className="text-[#C3A295]">/</span>

                                <Link href="/stays" className={linkClass("/stays")}>
                                    stays
                                </Link>
                                <span className="text-white/40">/</span>

                                <Link href="/events" className={linkClass("/events")}>
                                    events
                                </Link>
                                <span className="text-white/40">/</span>

                                <Link href="/shoots" className={linkClass("/shoots")}>
                                    shoots
                                </Link>
                            </nav>
                        </div>

                        {/* BOTTOM AREA */}
                        <div className="absolute bottom-4 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-6 lg:left-10 lg:right-10">
                            {/* LOGO + COPYRIGHT */}
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                <img
                                    src="/images/kunjung-white.png"
                                    className="h-10 max-w-full lg:mx-0"
                                    alt="Kunjung"
                                />
                                <div className="text-left lg:text-right text-[10px] sm:text-sm font-primary">
                                    <p>all right reserved</p>
                                    <p>© 2025, kunjung family</p>
                                </div>
                            </div>

                            <div className="border-t border-[#F5E9E2] mt-4"></div>

                            {/* CONTACT + SOCIAL */}
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



                            {/* SEARCH BAR – hanya mobile, biar sama seperti desain */}
                            <div className="mt-6 lg:hidden">
                                <div className="flex items-center justify-between rounded-full border border-[#F5E9E2] px-5 py-3 text-sm">
                                    <span className="text-[#F5E9E2]/70">
                                        start your search
                                    </span>

                                    <LucideSearch
                                        size={18}
                                        className="text-[#F5E9E2]"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* ANIMATIONS */}
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

                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
                .animate-slideInRight {
                    animation: slideInRight 0.35s ease-out;
                }
            `}</style>
        </>
    );
}
