"use client"
import Container from "@/components/Core/Container";
import LegalUsersGet from "@/components/GetComponents/LegalUsersGet";
import PhysicalUsersGet from "@/components/GetComponents/PhysicalUsersGet";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";

const Members = () => {
    const [isLegal, setLegal] = useState(false);
    const [search, setSearch] = useState("");
    return (
        <div className=" bg-slate-50">
            <Container>
                <div className="flex mb-4 gap-4 justify-between items-center">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="search" placeholder="Search . . ." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <button className="w-full sm:w-auto px-2 py-1 text-base text-maincolor bg-white border border-maincolor rounded-md hover:bg-maincolor hover:text-white duration-300">{isLegal ? "Yuridik shaxs" : "Jismoniy shaxs"}</button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className=" text-base" onClick={() => setLegal(true)}>Yuridik shaxslar</DropdownMenuItem>
                            <DropdownMenuItem className=" text-base" onClick={() => setLegal(false)}>Jismoniy shaxslar</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                    {isLegal ? (
                        <LegalUsersGet />
                    ) : (
                        <PhysicalUsersGet />
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Members;