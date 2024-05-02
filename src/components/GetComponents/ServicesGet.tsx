import { servicesGetAPI } from "@/api/AdminRequest";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Loading from "../Core/Loading";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { useMemo } from "react";

const ServicesGet = ({ amount = 0 }) => {
    const t = useTranslations("AboutUs");
    const locale = useLocale();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            return await servicesGetAPI();
        }
    });
    const dataItem = useMemo(() => {
        if (data && data.data && data.data.services) {
            if (amount !== 0) {
                return data.data.services.slice(0, amount);
            } else {
                return data.data.services;
            }
        }
        return [];
    }, [data, amount]);

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <>
            {dataItem.map((item: any, i: number) => (
                <div key={i}
                    className="group relative cursor-pointer overflow-hidden bg-white p-6 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl  sm:rounded-lg">
                    <span className="absolute top-6 z-0 h-16 w-16 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[11]"></span>
                    <div className="relative z-10">

                        <span className="grid h-16 w-16 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-10 w-10 text-white transition-all">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                        </span>
                        <div
                            className="mb-6 pt-4 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                            {item.translations[`${locale}`].desc.length > 100 ? (
                                <div
                                    className=" whitespace-pre-line"
                                    style={{ whiteSpace: "pre-line" }}
                                    dangerouslySetInnerHTML={{ __html: `${item.translations[`${locale}`].desc.substring(0, 100)} ...` }}
                                />
                            ) : (
                                <div
                                    className=" whitespace-pre-line"
                                    style={{ whiteSpace: "pre-line" }}
                                    dangerouslySetInnerHTML={{ __html: `${item.translations[`${locale}`].desc}` }}
                                />
                            )}

                        </div>
                    </div>
                    <div className=" absolute bottom-4  text-base font-semibold leading-7">
                        <p>
                            <Link href={`/${locale}/main_all//services/${item._id}`} className=" text-base flex items-center gap-2 text-sky-500 transition-all duration-300 group-hover:text-white">{t("button")}
                                <ArrowRightIcon />
                            </Link>
                        </p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ServicesGet;