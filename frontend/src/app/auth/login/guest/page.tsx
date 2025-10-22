
import GuestLoginForm from "@/components/Auth/login/GuestLoginForm";
import Link from "next/link";

export default function Page() {
    return (
        <div className="h-[600px] flex flex-col justify-between bg-[#FCFBF7] text-gray-900 font-secondary mb-20">
            {/* MAIN CONTENT */}
            <main className="flex-grow flex flex-col items-center justify-center px-6">
                <h1 className="text-[64px] font-serif text-gray-900 mb-2">
                    Shortlist log in
                </h1>
                <p className="text-[16px] text-gray-600 mb-8">
                    Not got an account?{" "}
                    <Link href="/auth/register/guest" className="underline hover:text-gray-800">
                        Create an account
                    </Link>
                </p>

                <GuestLoginForm />
            </main>

        </div>
    );
}
