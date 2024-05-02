"use client"
import Container from "@/components/Core/Container"
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { Input } from "@/components/ui/input"
import { useState } from "react";
import NewsGet from "@/components/GetComponents/NewsGet";



const News = () => {
    const [search, setSearch] = useState("");

    return (
        <div className=" bg-slate-50">
            <Container>
                
                <div className="flex mb-4 gap-4">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="search" placeholder="Search . . ." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <NewsGet search={search} />
                </div>
            </Container>
        </div>
    )
}

export default News;