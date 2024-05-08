"use client"
import { ArrowRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Container from "./Core/Container";
import Image from "next/image";
import { aboutGetAPI } from "@/api/AdminRequest";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Loading from "./Core/Loading";

const AboutUs = () => {
    const t = useTranslations("AboutUs");
    const locale = useLocale();

    const { data, isError, isLoading } = useQuery({
        queryKey: ["aboutid"],
        queryFn: async () => {
            return await aboutGetAPI();
        },

    });


    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <div id="about" className={`${data?.data?.about.length >= 1 ? "bg-slate-100 py-10" : ""}`}>
            <Container>
                {data?.data?.about.length >= 1 ? (

                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div className="mt-12 md:mt-0 overflow-hidden">
                            <Image
                                src={data?.data.about[0].photo}
                                width={0}
                                height={0}
                                className="transition hover:scale-110 duration-300 shadow-xl"
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }} // optional
                                alt="Image"
                            />
                        </div>
                        <div className="max-w-lg">
                            <h2 className="text-2xl font-semibold sm:text-3xl">{t("hero_title")}</h2>
                            <div
                                className=" whitespace-pre-line mt-4 text-gray-600 text-base sm:text-lg text-justify"
                                style={{ whiteSpace: "pre-line" }}
                                dangerouslySetInnerHTML={{ __html: `${data?.data.about[0].translations[`${locale}`].desc.substring(0, 500)} ...` }}
                            />
                            <div className="mt-8 inline-block">
                                <Link href={`/${locale}/main_all/about`} className="hover:underline hover:text-maincolor flex items-center gap-2 text-lg">
                                    <span>{t("button")}</span>
                                    <ArrowRightIcon />
                                </Link>
                            </div>
                        </div>

                    </div>
                ) : null}

            </Container>
        </div>
    )
}

export default AboutUs;