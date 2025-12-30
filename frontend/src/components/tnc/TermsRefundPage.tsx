export default function TermsRefundPage() {
    return (
        <main className="min-h-screen bg-[#FCFBF7] text-[#1E1E1E] font-primary">
            <section className="max-w-4xl mx-auto px-6 py-16 md:py-28">

                {/* TITLE */}
                <h1 className="text-center font-serif font-primary leading-tight mb-8
                               text-[28px] md:text-[64px]">
                    Kunjung Terms &amp; <br />
                    Conditions + Refund <br />
                    Policy
                </h1>

                {/* INTRO */}
                <p className="text-[14px] leading-[1.8] mb-6
                              md:text-[28px] md:leading-relaxed">
                    Before proceeding with your payment, please read and
                    agree to the following terms:
                </p>

                {/* TRANSACTION TERMS */}
                <h2 className="font-bold tracking-wide mb-3
                               text-[12px] md:text-[28px]">
                    Transaction Terms
                </h2>

                <ol className="mt-4 space-y-3 md:space-y-4">
                    <li className="flex items-start gap-3 md:gap-4">
                        <span className="shrink-0 leading-[1.8]
                                         text-[14px] md:text-[28px]">
                            1.
                        </span>
                        <p className="leading-[1.8]
                                      text-[14px] md:text-[28px]">
                            By continuing with the payment, you confirm that all
                            information you provide is accurate and that the
                            transaction is made legitimately.
                        </p>
                    </li>

                    <li className="flex items-start gap-3 md:gap-4">
                        <span className="shrink-0 leading-[1.8]
                                         text-[14px] md:text-[28px]">
                            2.
                        </span>
                        <p className="leading-[1.8]
                                      text-[14px] md:text-[28px]">
                            Prices, promotions, and availability are based on the
                            most updated information at the time of payment.
                        </p>
                    </li>

                    <li className="flex items-start gap-3 md:gap-4">
                        <span className="shrink-0 leading-[1.8]
                                         text-[14px] md:text-[28px]">
                            3.
                        </span>
                        <p className="leading-[1.8]
                                      text-[14px] md:text-[28px]">
                            We are not responsible for failed transactions caused
                            by bank or payment gateway issues.
                        </p>
                    </li>
                </ol>

                {/* REFUND & CANCELLATION */}
                <h2 className="font-bold tracking-wide mt-8 mb-3
                               text-[12px] md:text-[28px]">
                    Refund &amp; Cancellation Policy
                </h2>

                <ol className="mt-4 space-y-3 md:space-y-4">
                    <li className="flex items-start gap-3 md:gap-4">
                        <span className="shrink-0 leading-[1.8]
                                         text-[14px] md:text-[28px]">
                            1.
                        </span>
                        <p className="leading-[1.8]
                                      text-[14px] md:text-[28px]">
                            100% refund is available only if the cancellation is
                            made no later than 7 days before the check-in
                            date.
                        </p>
                    </li>

                    <li className="flex items-start gap-3 md:gap-4">
                        <span className="shrink-0 leading-[1.8]
                                         text-[14px] md:text-[28px]">
                            2.
                        </span>
                        <p className="leading-[1.8]
                                      text-[14px] md:text-[28px]">
                            50% refund applies if the cancellation is made 3 days before check-in.
                        </p>
                    </li>

                    <li className="flex items-start gap-3 md:gap-4">
                        <span className="shrink-0 leading-[1.8]
                                         text-[14px] md:text-[28px]">
                            3.
                        </span>
                        <p className="leading-[1.8]
                                      text-[14px] md:text-[28px]">
                            Cancellations made less than 3 days before check-in
                            are non-refundable (full forfeiture).
                        </p>
                    </li>

                    <li className="flex items-start gap-3 md:gap-4">
                        <span className="shrink-0 leading-[1.8]
                                         text-[14px] md:text-[28px]">
                            4.
                        </span>
                        <p className="leading-[1.8]
                                      text-[14px] md:text-[28px]">
                            Reservation date changes (reschedule) can only be
                            made no later than H-7, subject to property
                            availability.
                        </p>
                    </li>
                </ol>

                {/* AGREEMENT */}
                <p className="mt-8 leading-[1.8]
                              text-[14px] md:text-[28px]">
                    By clicking “Pay”, you agree to Kunjung’s Terms &amp;
                    Conditions and Refund Policy
                </p>

            </section>
        </main>
    );
}
