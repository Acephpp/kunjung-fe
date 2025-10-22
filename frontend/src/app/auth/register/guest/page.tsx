import RegisterForm from "@/components/Auth/register/RegisterForm";

export default function Page() {
    return (
        <div className="h-[600px] flex flex-col justify-between bg-[#FCFBF7] text-gray-900 font-secondary mb-20">
            {/* MAIN CONTENT */}
            <main className="flex-grow flex flex-col items-center justify-center px-6">
                <h1 className="text-[64px] font-serif text-gray-900 mb-2">
                    Shortlist Registration
                </h1>
                <p className="text-[16px] text-gray-600 mb-8 text-center">
                    Join our community and <br />
                    unlock access to a curated boutique villas experience
                </p>

                <RegisterForm />
            </main>

        </div>
    );
}
