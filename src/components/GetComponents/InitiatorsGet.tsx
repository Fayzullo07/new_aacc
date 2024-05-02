"use client"
import { initiatorsGetAPI } from "@/api/AdminRequest";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Core/Loading";
import Image from "next/image";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

const InitiatorsGet = ({ search = "", amount = 0 }) => {
    const t = useTranslations("Initiators");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["initiators", search],
        queryFn: async () => {
            return await initiatorsGetAPI({ search });
        }
    });

    const dataItem = useMemo(() => {
        if (data && data.data && data.data.initiators) {
            if (amount !== 0) {
                return data.data.initiators.slice(0, amount);
            } else {
                return data.data.initiators;
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
                    className="bg-gray-100 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
                    <div className="flex items-center gap-4">
                        <Image
                            src={item.photo}
                            className=" w-24 group-hover:w-28 group-hover:h-28 h-24 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100px', height: '100px' }} // optional
                            alt="Image"
                        />

                        <div className="w-fit transition-all transform duration-500">
                            <h1 className="text-gray-600 font-bold text-base">
                                {item.firstname} {" "} {item.lastname}
                            </h1>

                            <p
                                className="text-base text-gray-500 transform transition-all delay-300 duration-500">
                                <span className="text-maincolor">{t('birthday')}: </span>{item.birthday}
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <span className="text-base text-maincolor">{t('life_address')}: </span>
                        <span className="text-black text-base">{item.addressResidential}</span>
                    </div>
                    <div className="absolute w-full p-4 h-0 group-hover:bottom-1 group-hover:h-full delay-300 -bottom-16 transition-all duration-500 bg-gray-100 opacity-90 right-1 rounded-lg">
                        <div>
                            <div>

                                <b className="text-base text-maincolor">{t('birthplace')}:</b>
                                <p className="text-base">{item.birthplace}</p>
                            </div>
                            <div>

                                <b className="text-base text-maincolor">{t('workplace')}:</b>
                                <p className="text-base">{item.workplace}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default InitiatorsGet;