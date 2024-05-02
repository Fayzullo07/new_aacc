"use client"
import Container from "@/components/Core/Container"

import { Input } from "@/components/ui/input"
import { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EventFinishedGet from "@/components/GetComponents/EventFinishedGet";
import EventWaitGet from "@/components/GetComponents/EventWaitGet";

const Events = () => {
    const [search, setSearch] = useState("");
    const [isFinished, setIsFinished] = useState(true);
    return (
        <div className=" bg-slate-50">
            <Container>

                <div className="flex mb-4 gap-4 justify-between items-center">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="search" placeholder="Search . . ." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <button className="w-full sm:w-auto p-1 text-base text-maincolor bg-white border border-maincolor rounded-md hover:bg-maincolor hover:text-white duration-300">{isFinished ? "Bo'lib o'tgan tadbilar" : "Kutilayotgan tadbirlar"}</button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className=" text-base" onClick={() => setIsFinished(false)}>Kutilayotgan tadbirlar</DropdownMenuItem>
                            <DropdownMenuItem className=" text-base" onClick={() => setIsFinished(true)}>{"Bo'lib o'tgan tadbilar"}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
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