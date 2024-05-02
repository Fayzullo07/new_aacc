"use client"
import { newsGetAPI } from "@/api/AdminRequest";
import { useQuery } from "@tanstack/react-query";
import { ClockIcon } from "lucide-react";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image"
import Link from "next/link";
import { useMemo } from "react";
import Loading from "../Core/Loading";

const NewsGet = ({ search = "", amount = 0 }) => {
    const locale = useLocale();
    const t = useTranslations("AboutUs");
    const { data, isLoading, isError } = useQuery({
        queryKey: ["news", search],
        queryFn: async () => {
            return await newsGetAPI({ search });
        }
    });

    const dataItem = useMemo(() => {
        if (data && data.data && data.data.news) {
            if (amount !== 0) {
                return data.data.news.slice(0, amount);
            } else {
                return data.data.news;
            }
        }
        return [];
    }, [data, amount]);
    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <>
            {dataItem.map((item: any, i: number) => (
                <div key={i} className={`relative bg-white border-slate-200 shadow shadow-slate-950/5 rounded overflow-hidden`} >
                    <Link href={`/${locale}/main_all/news/${item._id}`}>
                        <div className={`h-56 overflow-hidden  `}>
                            {/* <!-- Image --> */}
                            <div className="bg-gradient-to-t z-10 from-black opacity-90 w-full h-full absolute top-0 hover_scale"></div>
                            <Image
                                src={item.photo}
                                className="object-cover h-56 w-full hover:scale-110 duration-300 img"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: '100%' }} // optional
                                alt="Image"
                            />

                            <div className=" absolute bottom-0 p-4 text-white z-10">
                                <div className="text-xs flex items-center gap-2 tracking-wide mb-1 text-gray-200">
                                    <ClockIcon size={15} />
                                    <p className=" drop-shadow-2xl">{moment(item.createdAt).format("l")}</p>
                                </div>
                                <h2 className="tracking-wider text-base font-medium text-white drop-shadow-2xl">
                                    {item.translations[`${locale}`].title.length > 30 ? item.translations[`${locale}`].title.substr(0, 30) + "..." : item.translations[`${locale}`].title}
                                </h2>
                            </div>


                        </div>
                    </Link>
                </div>
            )

            ).reverse()}
        </>
    )
}

export default NewsGet;