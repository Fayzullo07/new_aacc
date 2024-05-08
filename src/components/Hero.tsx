'use client'
import Image from "next/image";
import Container from "./Core/Container";
import { ArrowRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { useQuery } from "@tanstack/react-query";
import { heroGetAPI } from "@/api/AdminRequest";
import Loading from "./Core/Loading";

const Hero = () => {
    const t = useTranslations("Hero");
    const locale = useLocale();

    const { data, isError, isLoading } = useQuery({
        queryKey: ["heroid"],
        queryFn: async () => {
            return await heroGetAPI();
        },

    });

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <div className={`${data?.data?.hero.length >= 1 ? "py-10 sm:py-5" : ""}`}>
            <Container>
                {data?.data?.hero.length >= 1 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="grid items-center justify-between gap-4" data-aos="fade-up" data-aos-delay="300">
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-5xl w-[90vw] sm:max-w-md md:max-w-xl  md:text-3xl lg:text-4xl xl:text-5xl">
                                <span className="text-maincolor">{data?.data.hero[0].translations[`${locale}`].title.split(" ").slice(0, 2).join(" ")} </span>
                                <span >{data?.data.hero[0].translations[`${locale}`].title.split(" ").slice(2).join(" ")}</span>
                            </h1>
                            <p className="w-[90vw] min-h-20 text-sm md:text-lg text-gray-400 sm:max-w-md md:max-w-xl text-justify">
                                {data?.data.hero[0].translations[`${locale}`].desc.substring(0, 500)}
                            </p>
                            <div className="flex items-center flex-wrap gap-2 md-gap-4 ">
                                <a href="#contact" className="flex w-full sm:w-auto items-center px-5 py-1 text-lg text-white bg-maincolor rounded-md hover:scale-105 duration-300">
                                    {t("contact")}
                                    <ArrowRightIcon className="w-5 h-5 ml-1" />
                                </a>
                                <a href="#about" className="w-full sm:w-auto px-5 py-1 text-lg text-maincolor bg-white border border-maincolor rounded-md hover:bg-maincolor hover:text-white duration-300">
                                    {t("about")}
                                </a>

                            </div>
                        </div>

                        <div className="w-full h-auto overflow-hidden rounded-md sm:rounded-xl" data-aos="fade-down" data-aos-delay="600">
                            <Image
                                src={data?.data.hero[0].photo}
                                width={0}
                                height={0}
                                className="transition hover:scale-110 duration-300 shadow-xl"
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }} // optional
                                alt="Image"
                            />
                        </div>

                    </div>
                ) : null}
            </Container>

        </div>
    )
}

export default Hero;