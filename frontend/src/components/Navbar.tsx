"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LucideUserCircle2 } from "lucide-react";

export default function Navbar() {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);
    const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    // 🔹 Listen scroll to hide/show navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) setShow(false);
            else setShow(true);
            setLastScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // 🔹 Close dropdown when clicking outside
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

    // 🔹 Load user info (simulated login persistence)
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    // 🔹 Handle logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/");
    };

    // 🔹 Get initials from first + last name
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
        <header
            className={`fixed top-0 left-0 w-full backdrop-blur-sm bg-[#FCFBF7]/80 border-b border-gray-200 z-50 transition-transform duration-300 ${
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

                {/* Middle Menu */}
                <nav className="absolute left-1/2 -translate-x-1/2">
                    <ul className="flex space-x-10 text-[16px]">
                        {menus.map((menu) => (
                            <li key={menu.name}>
                                <Link
                                    href={menu.href}
                                    className={`decoration-2 underline-offset-4 ${
                                        (pathname === menu.href) || (pathname.includes(menu.href) && menu.href !== "/")
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

                {/* Right Icons */}
                <div
                    className="flex items-center space-x-6 relative"
                    ref={dropdownRef}
                >
                    {/* ✅ User or Guest Icon */}
                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                        className={`relative p-1 rounded-full transition flex items-center justify-center w-9 h-9 ${
                            user ? "bg-[#2D2A29]" : "hover:bg-gray-100"
                        }`}
                    >
                        {user ? (
                            <span className="font-semibold text-white text-sm">
                                {getInitials(user.firstName, user.lastName)}
                            </span>
                        ) : (
                            <LucideUserCircle2 size={28} className="text-gray-700" />
                        )}
                    </button>

                    {/* ✅ Dropdown */}
                    {openMenu && (
                        <div className="absolute p-2 right-0 top-12 w-65 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
                            {user ? (
                                <>
                                    <Link
                                        href="/reservations"
                                        className="block px-6 py-3 text-[15px] font-medium text-gray-900 rounded-lg hover:bg-[#E9E8E4]"
                                    >
                                        Reservations
                                    </Link>
                                    <Link
                                        href="/edit-profile"
                                        className="block px-6 py-3 text-[15px] font-medium text-gray-900 rounded-lg hover:bg-[#E9E8E4]"
                                    >
                                        Edit Personal Information
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-6 py-3 text-[15px] font-medium text-gray-900 rounded-lg hover:bg-[#E9E8E4]"
                                    >
                                        Log out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/login/guest"
                                        className="block px-6 py-3 text-[15px] font-medium text-gray-900 rounded-lg hover:bg-[#E9E8E4]"
                                    >
                                        Guest
                                    </Link>
                                    <Link
                                        href="/auth/login/homeOwner"
                                        className="block px-6 py-3 text-[15px] font-medium text-gray-900 rounded-lg hover:bg-[#E9E8E4]"
                                    >
                                        Home Owner
                                    </Link>
                                </>
                            )}
                        </div>
                    )}

                    {/* Divider Right */}
                    <div className="space-y-2">
                        <span className="block w-20 h-[2px] bg-gray-600"></span>
                        <span className="block w-20 h-[2px] bg-gray-600"></span>
                    </div>
                </div>
            </div>

            {/* ✅ Animation */}
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
