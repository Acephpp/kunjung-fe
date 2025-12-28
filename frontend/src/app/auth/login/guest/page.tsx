import GuestLoginForm from "@/components/Auth/login/GuestLoginForm";
import SearchBar from "@/components/Homepage/SearchBar";
import Link from "next/link";

export default function Page() {
    return (
        <div className="bg-[#FCFBF7] text-gray-900 font-secondary">
            {/* SearchBar hanya mobile */}
            <div className="block sm:hidden">
                <SearchBar />
            </div>

            <main
                className="
                    flex
                    flex-col
                    items-center
                    justify-start lg:justify-center
                    px-4 sm:px-6
                    py-20
                "
            >
                <h1
                    className="
                        font-serif
                        text-gray-900
                        mb-2
                        text-[36px]
                        sm:text-[48px]
                        lg:text-[64px]
                    "
                >
                    Shortlist log in
                </h1>

                <p
                    className="
                        text-gray-600
                        mb-8
                        text-center
                        text-[14px]
                        sm:text-[16px]
                    "
                >
                    Not got an account?{" "}
                    <Link
                        href="/auth/register/guest"
                        className="underline hover:text-gray-800"
                    >
                        Create an account
                    </Link>
                </p>

                <GuestLoginForm />
            </main>
        </div>
    );
}
