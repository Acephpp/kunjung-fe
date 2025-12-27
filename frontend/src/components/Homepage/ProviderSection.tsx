export default function ProviderSection() {
    return (
        <section className="
            relative bg-[#753C27] text-white 
            h-[490px] sm:h-[520px] md:h-[800px]   
            flex flex-col justify-between 
            mt-5 w-full
        ">
            {/* Content atas */}
            <div className="px-4 pt-8 md:px-12 md:pt-12">
                <h1 className="
                    font-serif leading-[1] tracking-tight
                    text-[45px] sm:text-[48px]   
                    md:text-[140px]            
                ">
                    Warm and Inspired
                </h1>

                <p className="
                    mt-5 text-sm sm:text-base text-gray-200   
                    md:mt-6 md:text-2xl    
                    font-secondary w-3/4 md:w-full                  
                ">
                    Where homy comfort meets artistry, leaving you with memories that linger.
                </p>
            </div>

            {/* Footer teks kiri & kanan */}
            <div className="flex justify-between items-end px-4 pb-6 md:px-12 md:pb-10">
                <span className="
                    text-[20px] sm:text-[24px] text-white/20     
                    md:text-[80px]                      
                    font-medium
                ">
                    bandung
                </span>

                <span className="
                    text-[20px] sm:text-[24px] text-white/20     
                    md:text-[80px]                      
                    font-medium
                ">
                    indonesia
                </span>
            </div>
        </section>
    );
}
