"use client"
import { partnersGetAPI } from "@/api/AdminRequest";
import { useQuery } from "@tanstack/react-query";
import { HandshakeIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo } from "react";
import Loading from "../Core/Loading";

const PartnersGet = ({ search = "", amount = 0 }) => {
    const locale = useLocale();
    const t = useTranslations("AboutUs");
    const { data, isLoading, isError } = useQuery({
        queryKey: ["partners", search],
        queryFn: async () => {
            return await partnersGetAPI({ search });
        }
    });

    const dataItem = useMemo(() => {
        if (data && data.data && data.data.partners) {
            if (amount !== 0) {
                return data.data.partners.slice(0, amount);
            } else {
                return data.data.partners;
            }
        }
        return [];
    }, [data, amount]);
    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <>
            {dataItem.map((item: any, i: number) => (
                <div key={i} className="relative bg-white  p-6 border border-gray-100 rounded-lg" >

                    <span className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-green-300  to-maincolor"></span>

                    <div className="my-4 mb-8">
                        <div className="flex items-center gap-4">
                            <HandshakeIcon size={30} className="text-maincolor" />
                            <h2 className="text-xl font-semibold pb-2 text-black">{item.translations[`${locale}`].title}</h2>
                        </div>
                        {item.translations[`${locale}`].desc.length > 160 ? (
                            <div
                                className=" whitespace-pre-line text-gray-600 py-1 text-base"
                                style={{ whiteSpace: "pre-line" }}
                                dangerouslySetInnerHTML={{ __html: `${item.translations[`${locale}`].desc.substring(0, 160)}...` }}
                            />
                        ) : (
                            <div
                                className=" whitespace-pre-line text-gray-600 py-1 text-base"
                                style={{ whiteSpace: "pre-line" }}
                                dangerouslySetInnerHTML={{ __html: `${item.translations[`${locale}`].desc}` }}
                            />
                        )}

                    </div>

                    <div className=" absolute bottom-4 right-4">
                        <Link href={`/${locale}/main_all/partners/${item._id}`}>
                            <button className="px-2 py-0.5 text-base  text-maincolor hover:text-white border border-maincolor font-normal rounded hover:bg-maincolor">{t("button")}</button>
                        </Link>
                    </div>
                </div>
            )).reverse()}
        </>
    )
}

export default PartnersGet;