"use client"
import { newGetOneAPI, projectGetOneAPI } from "@/api/AdminRequest";
import NewsGet from "@/components/GetComponents/NewsGet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Building2Icon, ChevronRightIcon, ClockIcon } from "lucide-react";
import moment from "moment";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import ProjectsGet from "@/components/GetComponents/ProjectsGet";
import Loading from "@/components/Core/Loading";

const Project = ({ params }: { params: any }) => {
    const { id } = params;
    const locale = useLocale();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["project", id],
        queryFn: async () => {
            return await projectGetOneAPI({ id });
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
                            <ProjectsGet />
                        </div>
                    </ScrollArea>
                </div>
            </div>
            <div className=" col-span-2 bg-white border-slate-200 shadow shadow-slate-950/5 rounded overflow-hidden" >
                {data?.data.projects && (

                    <div className=" overflow-hidden p-4">

                        <div className="z-10 flex justify-between items-center space-x-2 text-maincolor w-full">
                            <h2 className=" tracking-wide text-xl font-semibold  ">
                                {data.data.projects.title}
                            </h2>
                            {/* <div className="text-sm text-black flex items-center gap-2">
                                        <ClockIcon size={20} />
                                        <b className=" drop-shadow-2xl">{moment(data.data.projects.createdAt).format("ll")}</b>
                                    </div> */}
                        </div>
                        <div className=" text-gray-600">
                            <div
                                className=" whitespace-pre-line tiptap"
                                style={{ whiteSpace: "pre-line" }}
                                dangerouslySetInnerHTML={{ __html: data.data.projects.translations[`${locale}`].content }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Project;