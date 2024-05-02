"use client"
import Container from "@/components/Core/Container"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import ProjectsGet from "@/components/GetComponents/ProjectsGet";



const Projects = () => {
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
                    <ProjectsGet search={search} />
                </div>
            </Container>
        </div>
    )
}

export default Projects;