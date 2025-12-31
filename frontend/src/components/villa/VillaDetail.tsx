"use client";

import { useState } from "react";
import { villas } from "@/app/data/villas";
import { useParams, notFound } from "next/navigation";
import WeddingDetail from "./WeddingDetail";
import StaysDetail from "./staysDetail/StayDetail";
import EventDetail from "./eventDetail/EventDetail";
import ShootDetail from "./shootDetail/ShootDetail";

type Villa = (typeof villas)[number];

export default function VillaDetail() {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [activeTab, setActiveTab] = useState<"stay" | "event" | "shoot">("stay");

    const params = useParams();
    const id = Number(params?.id);
    const villa: Villa | undefined = villas.find((v) => v.id === id);

    if (!villa) return notFound();

    const baseTab =
        "relative pb-3 lowercase transition-colors duration-200 flex-1 text-center font-secondary text-[18px]";
    const active = "text-[#8B3F20]";
    const inactive = "text-[#A3A09C] hover:text-[#2D2A29]";

    return (
        <div className="space-y-6 max-w-9xl mx-auto px-6 md:px-10 py-5 bg-[#FCFBF7] ">
            {/* TAB MENU */}
            <div className="border-b border-[#E4E1DC]">
                <div className="flex w-full">
                    <button
                        onClick={() => setActiveTab("stay")}
                        className={`${baseTab} ${
                            activeTab === "stay" ? active : inactive
                        }`}
                    >
                        stay
                        {activeTab === "stay" && (
                            <span className="absolute left-0 -bottom-[1px] w-full h-[2px] bg-[#8B3F20]" />
                        )}
                    </button>

                    <button
                        onClick={() => setActiveTab("event")}
                        className={`${baseTab} ${
                            activeTab === "event" ? active : inactive
                        }`}
                    >
                        event
                        {activeTab === "event" && (
                            <span className="absolute left-0 -bottom-[1px] w-full h-[2px] bg-[#8B3F20]" />
                        )}
                    </button>

                    <button
                        onClick={() => setActiveTab("shoot")}
                        className={`${baseTab} ${
                            activeTab === "shoot" ? active : inactive
                        }`}
                    >
                        shoot
                        {activeTab === "shoot" && (
                            <span className="absolute left-0 -bottom-[1px] w-full h-[2px] bg-[#8B3F20]" />
                        )}
                    </button>
                </div>
            </div>

            {activeTab === "stay" && (
                <StaysDetail villa={villa} date={date} setDate={setDate} />
            )}

            {activeTab === "event" && (
                <EventDetail villa={villa} date={date} setDate={setDate} />
            )}

            {activeTab === "shoot" && (
                <ShootDetail villa={villa} date={date} setDate={setDate} />
            )}

            
        </div>
    );
}
