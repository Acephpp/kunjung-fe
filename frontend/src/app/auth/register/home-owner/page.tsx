import HomeOwnerRegisterForm from "@/components/Auth/register/HomeOwnerRegisterForm";

export default function HomeOwnerRegisterPage() {
    return (
        <div className="bg-[#FCFBF7] text-gray-900 font-secondary">
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
                        text-center
                    "
                >
                    List your house
                </h1>

                <p
                    className="
                        text-gray-600
                        mb-10
                        text-center
                        text-[14px]
                        sm:text-[16px]
                    "
                >
                    Register now and start listing your property
                </p>

                <HomeOwnerRegisterForm />
            </main>
        </div>
    );
}
