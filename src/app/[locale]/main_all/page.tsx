"use client"
import Container from "@/components/Core/Container"
import { useLocale } from "next-intl";

const News = () => {
    const locale = useLocale();


    return (
        <div className=" bg-slate-50">
            <Container>
                <h1>Main ALL</h1>
            </Container>
        </div>
    )
}

export default News;