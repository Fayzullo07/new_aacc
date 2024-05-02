"use client"
import Container from "./Core/Container"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Loading from "./Core/Loading";
import { questiosGetAPI } from "@/api/AdminRequest";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";


const AskedQuestions = () => {
    const locale = useLocale();
    const t = useTranslations("Question");
    const { data, isLoading, isError } = useQuery({
        queryKey: ["questions"],
        queryFn: async () => {
            return await questiosGetAPI();
        },
        refetchInterval: 1000
    });


    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <div className="pb-5 sm:pb-10">
            <Container>
                <div className="flex justify-between items-center py-5 md:py-10" >
                    <h2 className="text-2xl font-semibold" data-aos="fade-up" data-aos-delay="100" data-aos-duration="100">{t("hero_title")}</h2>
                </div>
                <div className="px-0 md:px-6">

                    <Accordion type="single" collapsible>
                        {data?.data.questions.map((item: any, i: number) => (

                            <AccordionItem key={i} value={`item-${i}`}>
                                <AccordionTrigger>{item[`${locale}`].question}</AccordionTrigger>
                                <AccordionContent>
                                    <div
                                        className=" whitespace-pre-line mb-3 tiptap"
                                        style={{ whiteSpace: "pre-line" }}
                                        dangerouslySetInnerHTML={{ __html: item[`${locale}`].desc }}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

            </Container>
        </div>
    )
}

export default AskedQuestions;