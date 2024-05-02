"use client"
import { newGetOneAPI } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import NewsGet from "@/components/GetComponents/NewsGet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { ChevronRightIcon, ClockIcon } from "lucide-react";
import moment from "moment";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const New = ({ params }: { params: any }) => {
    const { id } = params;
    const locale = useLocale();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["newID", id],
        queryFn: async () => {
            return await newGetOneAPI({ id });
        }
    });

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <div>
            <div className="">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">

                    <div className="">
                        <div className="sticky top-24">

                            <ScrollArea className="h-[80vh]">
                                <div className="grid grid-cols-1 gap-4 md:gap-8">
                                    <NewsGet />
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                    <div className=" col-span-2 bg-white border-slate-200 shadow shadow-slate-950/5 rounded overflow-hidden" >
                        {data?.data.news && (

                            <div className=" overflow-hidden ">

                                {/* <!-- Image --> */}
                                <div className="w-full h-auto mx-auto flex justify-center border p-2">
                                    <Image
                                        src={data.data.news.photo}
                                        width={0}
                                        height={0}
                                        className="object-cover"
                                        sizes="100vw"
                                        style={{ width: 'auto', height: 'auto' }} // optional
                                        alt="Image"
                                    />
                                </div>

                                <div className="z-10 flex justify-between items-center space-x-2 text-maincolor w-full p-4">
                                    <h2 className=" tracking-wide text-xl font-semibold  ">
                                        {data.data.news.translations[`${locale}`].title}
                                    </h2>
                                    <div className="text-sm text-black flex items-center gap-2">
                                        <ClockIcon size={20} />
                                        <p className=" drop-shadow-2xl">{moment(data.data.news.createdAt).format("ll")}</p>
                                    </div>
                                </div>
                                <div className="p-4 text-gray-600 text-lg">
                                    <div
                                        className=" whitespace-pre-line tiptap"
                                        style={{ whiteSpace: "pre-line" }}
                                        dangerouslySetInnerHTML={{ __html: data.data.news.translations[`${locale}`].content }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default New;