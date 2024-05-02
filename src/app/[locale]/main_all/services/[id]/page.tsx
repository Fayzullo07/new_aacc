"use client"
import { serviceGetOneAPI } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import NewsGet from "@/components/GetComponents/NewsGet";
import ServicesGet from "@/components/GetComponents/ServicesGet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

const Servise = ({ params }: { params: any }) => {
    const { id } = params;

    const locale = useLocale();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["serviseId", id],
        queryFn: async () => {
            return await serviceGetOneAPI({ id });
        }
    });

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">

            <div className="">
                <div className="sticky top-24">

                    <ScrollArea className="h-[80vh]">
                        <div className="grid grid-cols-1 gap-4 md:gap-8">
                            <ServicesGet />
                        </div>
                    </ScrollArea>
                </div>
            </div>
            <div className=" col-span-2 bg-white border-slate-200 shadow shadow-slate-950/5 rounded overflow-hidden" >
                {data?.data.services && (

                    <div className=" overflow-hidden p-4">
                        <div className="z-10 flex justify-between items-center space-x-2 text-maincolor w-full">
                            <h2 className=" tracking-wide text-xl font-semibold  ">
                                {data.data.services.translations[`${locale}`].title}
                            </h2>
                            <div className="text-sm text-black flex items-center gap-2">
                            </div>
                        </div>
                        <div className="text-gray-600 text-lg">
                            <div
                                className=" whitespace-pre-line tiptap"
                                style={{ whiteSpace: "pre-line" }}
                                dangerouslySetInnerHTML={{ __html: data.data.services.translations[`${locale}`].desc }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Servise;