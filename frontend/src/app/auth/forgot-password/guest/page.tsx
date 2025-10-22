import ForgotPassword from "@/components/Auth/ForgetPassword/ForgetPassword";

export default function GuestForgotPasswordPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FCFBF7] px-6">
            <ForgotPassword role="guest" />
        </div>
    );
}
