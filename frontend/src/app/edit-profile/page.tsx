import EditProfileComponent from "@/components/edit-profile/EditProfileComponent";

export default function EditProfilePage() {
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
                        mb-10
                        text-center
                        text-[36px]
                        sm:text-[48px]
                        lg:text-[64px]
                    "
                >
                    Edit personal information
                </h1>

                <EditProfileComponent />
            </main>
        </div>
    );
}
