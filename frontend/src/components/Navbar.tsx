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
    const [isClosing, setIsClosing] = useState(false);
    const [openMobilePanel, setOpenMobilePanel] = useState(false);
    const [isMobilePanelClosing, setIsMobilePanelClosing] = useState(false);
    const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    // ACTIVE LINK (untuk full menu)
    const linkClass = (href: string) =>
        pathname === href || pathname.startsWith(href + "/")
            ? "text-white"
            : "text-white/40 hover:text-white";

    // NAVBAR HIDE ON SCROLL (but always show when at top)
    useEffect(() => {
        const handleScroll = () => {
            // Always show navbar when at top of page
            if (window.scrollY <= 10) {
                setShow(true);
            } else if (window.scrollY > lastScrollY) {
                setShow(false);
            } else {
                setShow(true);
            }
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

    const handleCloseMenu = () => {
        setIsClosing(true);
        setTimeout(() => {
            setOpenFullMenu(false);
            setIsClosing(false);
        }, 350);
    };

    const handleCloseMobilePanel = () => {
        setIsMobilePanelClosing(true);
        setTimeout(() => {
            setOpenMobilePanel(false);
            setIsMobilePanelClosing(false);
        }, 300);
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
                className={`fixed top-0 left-0 w-full backdrop-blur-sm bg-[#FCFBF7]/80 lg:border-b border-gray-200 z-50 transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full h-[73px]"
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
                            onClick={() => {
                                // Desktop: toggle dropdown
                                // Mobile: open panel
                                if (window.innerWidth >= 1024) {
                                    setOpenMenu(!openMenu);
                                } else {
                                    setOpenMobilePanel(true);
                                }
                            }}
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

                        {/* DROPDOWN - DESKTOP ONLY */}
                        {openMenu && (
                            <div className="hidden lg:block absolute p-2 right-0 top-10 lg:top-12 w-70 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
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

            {/* ================= MOBILE PANEL (BOTTOM SHEET) ================= */}
            {openMobilePanel && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={handleCloseMobilePanel}
                        className="lg:hidden fixed inset-0 bg-black/50 z-[998] animate-fadeIn"
                    />

                    {/* Panel */}
                    <div
                        className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[999] font-secondary ${isMobilePanelClosing ? "animate-panelSlideDown" : "animate-panelSlideUp"
                            }`}
                    >
                        {/* Handle Bar */}
                        <div className="flex justify-center pt-3 pb-4">
                            <div className="w-12 h-1 bg-gray-300 rounded-full" />
                        </div>

                        {/* Content */}
                        <div className="px-5 pb-8 space-y-3">
                            {user ? (
                                <>
                                    <Link
                                        href="/reservations"
                                        onClick={handleCloseMobilePanel}
                                        className="block w-full text-left px-6 py-4 bg-white border border-gray-200 rounded-2xl text-[15px] font-medium text-gray-800 hover:bg-gray-100 active:bg-gray-200 active:scale-[0.98] transition"
                                    >
                                        Reservations
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleCloseMobilePanel();
                                            router.push("/edit-profile");
                                        }}
                                        className="block w-full text-left px-6 py-4 bg-white border border-gray-200 rounded-2xl text-[15px] font-medium text-gray-800 hover:bg-gray-100 active:bg-gray-200 active:scale-[0.98] transition"
                                    >
                                        Edit Personal Information
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleCloseMobilePanel();
                                            handleLogout();
                                        }}
                                        className="block w-full text-left px-6 py-4 bg-white border border-gray-200 rounded-2xl text-[15px] font-medium text-gray-800 hover:bg-gray-100 active:bg-gray-200 active:scale-[0.98] transition"
                                    >
                                        Log out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/login/guest"
                                        onClick={handleCloseMobilePanel}
                                        className="block w-full text-left px-6 py-4 bg-white border border-gray-200 rounded-2xl text-[15px] font-medium text-gray-800 active:scale-[0.98] transition hover:bg-gray-100 active:bg-gray-200"
                                    >
                                        Guest
                                    </Link>
                                    <Link
                                        href="/auth/login/homeOwner"
                                        onClick={handleCloseMobilePanel}
                                        className="block w-full text-left px-6 py-4 bg-white border border-gray-200 rounded-2xl text-[15px] font-medium text-gray-800 hover:bg-gray-100 active:bg-gray-200 active:scale-[0.98] transition"
                                    >
                                        Home Owner
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* ================= FULL TOP MENU (OVERLAY) ================= */}
            {openFullMenu && (
                <div
                    className={`fixed inset-x-0 top-0 h-screen bg-[#7A3E2C] text-[#F5E9E2] z-[999] ${isClosing ? "animate-modalExit" : "animate-modalEnter"
                        }`}
                >
                    {/* Sama dengan container navbar → max-w + padding */}
                    <div className="relative max-w-9xl mx-auto h-full px-6 sm:px-10 flex flex-col">
                        {/* X BUTTON */}
                        <button
                            onClick={handleCloseMenu}
                            className="absolute top-3 right-4 sm:top-4 sm:right-6 lg:top-2 lg:right-10 text-white text-4xl sm:text-5xl lg:text-7xl"
                            aria-label="Close navigation menu"
                        >
                            ✕
                        </button>

                        <div className="pt-5">
                            <nav className="flex flex-wrap items-center gap-2 text-[28px] sm:text-3xl md:text-4xl lg:text-[48px] max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl leading-tight font-light font-primary">
                                <Link href="/" className={linkClass("/")} onClick={handleCloseMenu}>
                                    home
                                </Link>
                                <span className="text-[#C3A295]">/</span>

                                <Link href="/searchResult" className={linkClass("/searchResult")} onClick={handleCloseMenu}>
                                    houses
                                </Link>
                                <span className="text-[#C3A295]">/</span>

                                <Link href="/about" className={linkClass("/about")} onClick={handleCloseMenu}>
                                    brand ethos
                                </Link>
                                <span className="text-[#C3A295]">/</span>
                                <Link href="/contact" className={linkClass("/contact")} onClick={handleCloseMenu}>
                                    contact
                                </Link>
                                <span className="text-[#C3A295]">/</span>

                                <Link href="/" className={linkClass("/")} onClick={handleCloseMenu}>
                                    stays
                                </Link>
                                <span className="text-[#C3A295]">/</span>

                                <Link href="/events" className={linkClass("/events")} onClick={handleCloseMenu}>
                                    events
                                </Link>
                                <span className="text-[#C3A295]">/</span>

                                <Link href="/shoots" className={linkClass("/shoots")} onClick={handleCloseMenu}>
                                    shoots
                                </Link>
                            </nav>
                        </div>

                        <div className="mt-auto pb-8 sm:pb-10 lg:pb-12">
                            {/* LOGO + COPYRIGHT + TNC */}
                            <div className="flex flex-col gap-4 font-primary">
                                <div className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
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

                                    <Link href="/tnc" onClick={handleCloseMenu} className="hover:underline">
                                        TnC & Refund policy
                                    </Link>
                                </div>
                            </div>

                            {/* GARIS */}
                            <div className="border-t border-[#F5E9E2] mt-4" />

                            {/* BOTTOM ROW */}
                            <div className="mt-4 flex justify-between items-center text-[10px] sm:text-sm md:text-base lg:text-lg font-primary">
                                {/* EMAIL */}
                                <a
                                    href="mailto:info@kunjungfamily.com"
                                    className="hover:underline"
                                >
                                    info@kunjungfamily.com ↗
                                </a>

                                {/* SOSMED */}
                                <div className="flex items-center gap-2 text-[10px] sm:text-sm md:text-base">
                                    <Link href="/tnc" onClick={handleCloseMenu} className="hidden md:inline hover:underline text-[#F5E9E2]/80">
                                        TnC & Refund policy
                                    </Link>

                                    <span className="hidden md:inline text-[#C3A295]">|</span>

                                    <a href="#" className="hover:underline">instagram</a>
                                    <span>/</span>
                                    <a href="#" className="hover:underline">tiktok</a>
                                    <span>/</span>
                                    <a href="#" className="hover:underline">youtube</a>
                                </div>
                            </div>

                            {/* SEARCH BAR – hanya mobile, matching footer-like experience */}
                            <div className="mt-6 lg:hidden">
                                <Link
                                    href={`${pathname}?openModal=true`}
                                    onClick={handleCloseMenu}
                                    className="flex items-center justify-between rounded-full border border-[#F5E9E2] px-5 py-3 text-sm"
                                >
                                    <span className="text-[#F5E9E2]/70">
                                        start your search
                                    </span>
                                    <LucideSearch size={18} className="text-[#F5E9E2]" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.15s ease-out;
                }

                /* MOBILE: Horizontal slide animations (default) */
                @keyframes mobileSlideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                
                @keyframes mobileSlideOut {
                    from { transform: translateX(0); }
                    to { transform: translateX(100%); }
                }

                /* DESKTOP: Vertical slide animations (lg and above) */
                @keyframes desktopSlideIn {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(0); }
                }
                
                @keyframes desktopSlideOut {
                    from { transform: translateY(0); }
                    to { transform: translateY(-100%); }
                }

                /* Apply animations based on screen size */
                .animate-modalEnter {
                    animation: mobileSlideIn 0.4s ease-out;
                }
                
                .animate-modalExit {
                    animation: mobileSlideOut 0.4s ease-in;
                }

                /* Desktop animations using media query */
                @media (min-width: 1024px) {
                    .animate-modalEnter {
                        animation: desktopSlideIn 0.4s ease-out;
                    }
                    
                    .animate-modalExit {
                        animation: desktopSlideOut 0.4s ease-in;
                    }
                }

                /* Mobile Panel Animations */
                @keyframes panelSlideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .animate-panelSlideUp {
                    animation: panelSlideUp 0.3s ease-out;
                }

                @keyframes panelSlideDown {
                    from { transform: translateY(0); }
                    to { transform: translateY(100%); }
                }
                .animate-panelSlideDown {
                    animation: panelSlideDown 0.3s ease-in;
                }
            `}</style>
        </>
    );
}
