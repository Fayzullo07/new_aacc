"use client"
import Link from "next/link";
import Container from "./Core/Container";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useState } from "react";
import { useLocale } from "next-intl";
import EventFinishedGet from "./GetComponents/EventFinishedGet";
import EventWaitGet from "./GetComponents/EventWaitGet";

const Events = () => {
    const locale = useLocale();
    const [isFinished, setIsFinished] = useState(false);


    return (
        <div className="pb-5 sm:pb-10">
            <Container>
                <div className="flex justify-between items-center py-5 md:py-10" >
                    <h2 className="text-2xl font-semibold" data-aos="fade-up" data-aos-delay="100" data-aos-duration="500">{"Tadbirlar"}</h2>
                    <div className="flex  items-center gap-2">

                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <button className="w-full sm:w-auto px-2 py-1 text-base text-maincolor bg-white border border-maincolor rounded-md hover:bg-maincolor hover:text-white duration-300">{isFinished ? "Bo'lib o'tgan tadbilar" : "Kutilayotgan tadbirlar"}</button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className=" text-base">
                                    <Link href={`/${locale}/main_all/events`}>
                                        {"Barcha tadbirlar"}
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className=" text-base" onClick={() => setIsFinished(false)}>Kutilayotgan tadbirlar</DropdownMenuItem>
                                <DropdownMenuItem className=" text-base" onClick={() => setIsFinished(true)}>{"Bo'lib o'tgan tadbilar"}</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {isFinished ? (
                        <EventFinishedGet />
                    ) : (
                        <EventWaitGet />
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Events;