"use client"
import { ArrowRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Container from "./Core/Container";
import Image from "next/image";
import { aboutGetOneAPI } from "@/api/AdminRequest";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Loading from "./Core/Loading";

const AboutUs = () => {
    const t = useTranslations("AboutUs");
    const locale = useLocale();

    const id = "6633e63aaa72d640333ca62f"


    const { data, isError, isLoading } = useQuery({
        queryKey: ["aboutid"],
        queryFn: async () => {
            return await aboutGetOneAPI({ id });
        },

    });


    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <div id="about" className="bg-slate-100 py-10">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="mt-12 md:mt-0 overflow-hidden">
                        <Image
                            src={data?.data.about.photo}
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
                            className=" whitespace-pre-line mt-4 text-gray-600 text-sm sm:text-sm text-justify"
                            style={{ whiteSpace: "pre-line" }}
                            dangerouslySetInnerHTML={{ __html: `${data?.data.about.translations[`${locale}`].desc.substring(0, 1200)} ...` }}
                        />
                        <div className="mt-8 inline-block">
                            <Link href={`/${locale}/main_all/about`} className="hover:underline hover:text-maincolor flex items-center gap-2 text-lg">
                                <span>{t("button")}</span>
                                <ArrowRightIcon />
                            </Link>
                        </div>
                    </div>

                </div>

            </Container>
        </div>
        // <section className=" border">

        //     <div className="py-12">
        //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        //             <div className="lg:text-center">
        //                 <h2
        //                     className="font-heading mb-4 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest uppercase title-font">
        //                     Why choose us?
        //                 </h2>
        //                 <p className="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
        //                     We know tech, we know finance. We are fintech experts.
        //                 </p>
        //                 <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
        //                     We know how to handle taxation for all the
        //                     countried we operate in. We care for our customers and help them manage cashflows.
        //                 </p>
        //             </div>

        //             <div className="mt-10">
        //                 <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        //                     <div className="relative">
        //                         <dt>
        //                             <div
        //                                 className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
        //                                 <img src="https://www.svgrepo.com/show/503163/api-settings.svg" />
        //                             </div>
        //                             <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Powerful API</p>
        //                         </dt>
        //                         <dd className="mt-2 ml-16 text-base text-gray-500">
        //                             Lorem ipsum, dolor sit amet consectetur
        //                             adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate
        //                             blanditiis ratione.
        //                         </dd>
        //                     </div>
        //                     <div className="relative">
        //                         <dt>
        //                             <div
        //                                 className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
        //                                 <img src="https://www.svgrepo.com/show/503138/webpack.svg" />
        //                             </div>
        //                             <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Easy to integrate
        //                                 SDK
        //                             </p>
        //                         </dt>
        //                         <dd className="mt-2 ml-16 text-base text-gray-500"> Lorem ipsum, dolor sit amet consectetur
        //                             adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate
        //                             blanditiis ratione.
        //                         </dd>
        //                     </div>
        //                     <div className="relative">
        //                         <dt>
        //                             <div
        //                                 className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
        //                                 <img src="https://www.svgrepo.com/show/511771/dashboard-671.svg" />

        //                             </div>
        //                             <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Low Transaction Cost
        //                             </p>
        //                         </dt>
        //                         <dd className="mt-2 ml-16 text-base text-gray-500"> Lorem ipsum, dolor sit amet consectetur
        //                             adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate
        //                             blanditiis ratione.
        //                         </dd>
        //                     </div>
        //                     <div className="relative">
        //                         <dt>
        //                             <div
        //                                 className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
        //                                 <img src="https://www.svgrepo.com/show/76267/free-commercial-label.svg" />

        //                             </div>
        //                             <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Powerful Dashboard
        //                             </p>
        //                         </dt>
        //                         <dd className="mt-2 ml-16 text-base text-gray-500"> Lorem ipsum, dolor sit amet consectetur
        //                             adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate
        //                             blanditiis ratione.
        //                         </dd>
        //                     </div>
        //                 </dl>
        //             </div>

        //         </div>
        //     </div>
        // </section>
    )
}

export default AboutUs;