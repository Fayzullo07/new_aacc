"use client"
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserLegal from "./(Components)/UserLegal";
import UserPhysical from "./(Components)/UserPhysical";

const Members = () => {
    const locale = useLocale();
    
    
    const [isYuridik, setIsYuridik] = useState(false);

    return (
        <div>
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <button className="w-full sm:w-auto px-2 py-1 text-lg text-maincolor bg-white border border-maincolor rounded-md hover:bg-maincolor hover:text-white duration-300">{isYuridik ? "Yuridik shaxs" : "Jismoniy shaxs"}</button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="text-base" onClick={() => setIsYuridik(false)}>Jismoniy shaxslar</DropdownMenuItem>
                        <DropdownMenuItem className="text-base" onClick={() => setIsYuridik(true)}>Yuridik shaxslar</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Link href={`/${locale}/admin/members/${isYuridik ? "addlegal" : "addphysical"}`} >
                    <Button size={"icon"}>
                        <PlusIcon />
                    </Button>
                </Link>
            </div>
            {isYuridik ? (

                <UserLegal />
            ) : (
                <UserPhysical />
            )}

        </div>
    )
}

export default Members;