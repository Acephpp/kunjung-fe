import EditProfileComponent from "@/components/edit-profile/EditProfileComponent";

export default function EditProfilePage() {
    return (
        <div className="h-[600px] bg-[#FCFBF7] flex flex-col items-center justify-center px-4 py-5 mb-20">
            <h1 className="text-[64px] font-serif text-black mb-12 text-center">
                Edit personal information
            </h1>
            <EditProfileComponent />
        </div>
    );
}
