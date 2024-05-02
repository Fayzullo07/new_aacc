"use client"
import Container from "@/components/Core/Container";
import InitiatorsGet from "@/components/GetComponents/InitiatorsGet";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Initators = () => {
    const [search, setSearch] = useState("");
    return (
        <div className=" bg-slate-50">
            <Container>
                <div className="flex mb-4 gap-4">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="search" placeholder="Search . . ." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                    <InitiatorsGet search={search} />
                </div>
            </Container>
        </div>
    )
}

export default Initators;