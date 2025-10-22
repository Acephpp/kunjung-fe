import HomeOwnerLoginForm from "@/components/Auth/login/HomeOwnerLoginForm";
import Link from "next/link";

export default function Page() {
    return (
        <div className="h-[600px] flex flex-col justify-between bg-[#FCFBF7] text-gray-900 font-secondary mb-20">
            {/* MAIN CONTENT */}
            <main className="flex-grow flex flex-col items-center justify-center px-6">
                <h1 className="text-[64px] text-center font-serif text-gray-900 mb-2">
                    <span className="block">Home owner</span>
                    <span className="block -mt-7">log in</span>
                </h1>

                <p className="text-[16px] text-gray-600 mb-8">
                    Not got an account?{" "}
                    <Link href="/auth/register/home-owner" className="underline hover:text-gray-800">
                        Create an account
                    </Link>
                </p>

                <HomeOwnerLoginForm />
            </main>

        </div>
    );
}
