"use client"
import { newGetOneAPI, partnerGetOneAPI } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import NewsGet from "@/components/GetComponents/NewsGet";
import PartnersGet from "@/components/GetComponents/PartnersGet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { ChevronRightIcon, ClockIcon } from "lucide-react";
import moment from "moment";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Partner = ({ params }: { params: any }) => {
    const { id } = params;
    const locale = useLocale();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["partnerID", id],
        queryFn: async () => {
            return await partnerGetOneAPI({ id });
        }
    });

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                <div>
                    <div className="sticky top-24">

                        <ScrollArea className="h-[80vh]">
                            <div className="grid grid-cols-1 gap-4 md:gap-8">
                                <PartnersGet />
                            </div>
                        </ScrollArea>
                    </div>
                </div>
                <div className=" col-span-2 bg-white border-slate-200 shadow shadow-slate-950/5 rounded overflow-hidden" >
                    {data?.data.partners && (

                        <div className=" overflow-hidden p-4 ">

                            <div className="z-10 flex justify-between items-center space-x-2 text-maincolor w-full">
                                <h2 className="tracking-wider text-xl font-semibold  ">
                                    {data.data.partners.translations[`${locale}`].title}
                                </h2>
                                <div className="text-sm text-black flex items-center gap-2">
                                    <ClockIcon size={20} />
                                    <p className=" drop-shadow-2xl">{moment(data.data.partners.createdAt).format("ll")}</p>
                                </div>
                            </div>
                            <div className=" text-gray-600 text-lg">
                                <div
                                    className=" whitespace-pre-line text-gray-600 py-1 text-base tiptab"
                                    style={{ whiteSpace: "pre-line" }}
                                    dangerouslySetInnerHTML={{ __html: `${data.data.partners.translations[`${locale}`].desc}` }}
                                />

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default Partner;