export default function TermsRefundPage() {
    return (
        <main className="min-h-screen bg-[#FCFBF7] text-[#1E1E1E] font-primary">
            <section className="max-w-4xl mx-auto px-6 py-24 md:py-28">

                {/* TITLE */}
                <h1 className="text-center font-serif text-4xl md:text-[64px] font-primary leading-tight mb-10">
                    Kunjung Terms &amp; <br />
                    Conditions + Refund <br />
                    Policy
                </h1>

                {/* INTRO */}
                <p className="text-[15px] md:text-[28px] leading-relaxed mb-8">
                    Before proceeding with your payment, please read and
                    agree to the following terms:
                </p>

                {/* TRANSACTION TERMS */}
                <h2 className="text-[13px] md:text-[28px] font-bold tracking-wide mb-3">
                    Transaction Terms
                </h2>

                <ol className="mt-4 space-y-4">
                    <li className="flex items-start gap-3 md:gap-4">
                        <span className="shrink-0 text-[15px] md:text-[28px] leading-relaxed">
                            1.
                        </span>
                        <p className="text-[15px] md:text-[28px] leading-relaxed">
                            By continuing with the payment, you confirm that all
                            information you provide is accurate and that the
                            transaction is made legitimately.
                        </p>
                    </li>

                    <li className="flex items-start gap-3 md:gap-4">
                        <span className="shrink-0 text-[15px] md:text-[28px] leading-relaxed">
                            2.
                        </span>
                        <p className="text-[15px] md:text-[28px] leading-relaxed">
                            Prices, promotions, and availability are based on the
                            most updated information at the time of payment.
                        </p>
                    </li>

                    <li className="flex items-start gap-3 md:gap-4">
                        <span className="shrink-0 text-[15px] md:text-[28px] leading-relaxed">
                            3.
                        </span>
                        <p className="text-[15px] md:text-[28px] leading-relaxed">
                            We are not responsible for failed transactions caused
                            by bank or payment gateway issues.
                        </p>
                    </li>
                </ol>

                {/* REFUND & CANCELLATION */}
                <h2 className="font-bold text-[13px] md:text-[28px] tracking-wide mt-10 mb-3">
                    Refund &amp; Cancellation Policy
                </h2>

                <ol className="mt-4 space-y-4">
                    <li className="flex items-start gap-3 md:gap-4">
                        <span className="shrink-0 text-[15px] md:text-[28px] leading-relaxed">
                            1.
                        </span>
                        <p className="text-[15px] md:text-[28px] leading-relaxed">
                            100% refund is available only if the cancellation is
                            made no later than 7 days before the check-in
                            date.
                        </p>
                    </li>

                    <li className="flex items-start gap-3 md:gap-4">
                        <span className="shrink-0 text-[15px] md:text-[28px] leading-relaxed">
                            2.
                        </span>
                        <p className="text-[15px] md:text-[28px] leading-relaxed">
                            50% refund applies if the cancellation is made 3 days before check-in.
                        </p>
                    </li>

                    <li className="flex items-start gap-3 md:gap-4">
                        <span className="shrink-0 text-[15px] md:text-[28px] leading-relaxed">
                            3.
                        </span>
                        <p className="text-[15px] md:text-[28px] leading-relaxed">
                            Cancellations made less than 3 days 
                            before check-in are non-refundable (full forfeiture).
                        </p>
                    </li>

                    <li className="flex items-start gap-3 md:gap-4">
                        <span className="shrink-0 text-[15px] md:text-[28px] leading-relaxed">
                            4.
                        </span>
                        <p className="text-[15px] md:text-[28px] leading-relaxed">
                            Reservation date changes (reschedule) can only be
                            made no later than H-7, subject to property
                            availability.
                        </p>
                    </li>
                </ol>

                {/* AGREEMENT */}
                <p className="text-[15px] md:text-[28px] leading-relaxed mt-10">
                    By clicking “Pay”, you agree to Kunjung’s Terms &amp;
                    Conditions and Refund Policy
                </p>

            </section>
        </main>
    );
}
