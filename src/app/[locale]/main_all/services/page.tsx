"use client"
import Container from "@/components/Core/Container";
import ServicesGet from "@/components/GetComponents/ServicesGet";

const Services = () => {

    return (
        <div className=" bg-slate-50">
            <Container>

                <div className="flex mb-4 gap-4">

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <ServicesGet />
                </div>
            </Container>
        </div>
    )
}

export default Services;