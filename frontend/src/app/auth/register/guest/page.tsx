import RegisterForm from "@/components/Auth/register/RegisterForm";

export default function Page() {
    return (
        <div className="bg-[#FCFBF7] text-gray-900 font-secondary py-10 md:py-20">
            <main className="flex flex-col items-center justify-center px-4 sm:px-6">
                <h1 className="text-[36px] sm:text-[48px] lg:text-[64px] font-serif text-gray-900 mb-3 text-center">
                    Shortlist Registration
                </h1>

                <p className="text-[14px] sm:text-[16px] text-gray-600 mb-10 text-center">
                    Join our community and <br />
                    unlock access to a curated boutique villas experience
                </p>

                <RegisterForm />
            </main>
        </div>
    );
}
