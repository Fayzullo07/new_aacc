"use client"
import { eventFinishedGetOneAPI, eventsFinishedGetAPI, newGetOneAPI } from "@/api/AdminRequest";
import ImagesCarusel from "@/components/Core/ImagesCarusel";
import Loading from "@/components/Core/Loading";
import EventFinishedGet from "@/components/GetComponents/EventFinishedGet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { ClockIcon, UserIcon } from "lucide-react";
import moment from "moment";
import { useLocale } from "next-intl";
import Image from "next/image";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const EventFinished = ({ params }: { params: any }) => {
    const { id } = params;
    const locale = useLocale();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["eventFinishedID", id],
        queryFn: async () => {
            return await eventFinishedGetOneAPI({ id });
        }
    });
    const images = [
        'https://source.unsplash.com/random/800x600',
        'https://source.unsplash.com/random/800x600?2',
        'https://source.unsplash.com/random/800x600?3'
    ];

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    const data_users = [
        {},
        {},
        {},
        {},
        {},
    ]
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            <div className="">
                <div className="sticky top-24">

                    <ScrollArea className="h-[80vh]">
                        <div className="grid grid-cols-1 gap-4 md:gap-8">
                            <EventFinishedGet />
                        </div>
                    </ScrollArea>
                </div>
            </div>
            <div className=" col-span-2 bg-white border-slate-200 shadow shadow-slate-950/5 rounded overflow-hidden" >
                {data?.data.eventsFinished && (

                    <div className=" overflow-hidden ">
                        {/* <!-- Image --> */}
                        <div className="w-full h-auto mx-auto flex justify-center border p-2">
                            <ImagesCarusel images={data.data.eventsFinished.photos} button={false} />
                        </div>

                        <div className="z-10 flex justify-between items-center space-x-2 text-maincolor w-full p-4  text-red-500">
                            <h2 className=" tracking-wide text-xl font-semibold  ">
                                {data.data.eventsFinished.translations[`${locale}`].name}
                            </h2>
                            <div className="text-sm flex items-center gap-2">
                                <ClockIcon size={20} />
                                <p className=" drop-shadow-2xl">{moment(data.data.eventsFinished.date).format("L")} {moment(data.data.eventsFinished.date).format("LT")}</p>
                            </div>
                        </div>

                        <div className="p-4 text-gray-600 text-lg">
                            <p className="text-sm">Tadbirdan kutilayotgan natigalar</p>
                            <p className="mb-2 ml-2 text-sm text-gray-500">
                                {data.data.eventsFinished.translations[`${locale}`].result}
                            </p>
                            <p className="text-sm">Tadbir maqsadi</p>
                            <p className="mb-2 ml-2 text-sm text-gray-500">
                                {data.data.eventsFinished.translations[`${locale}`].target}
                            </p>
                            <p className="text-sm">Tadbir shakli</p>
                            <p className="mb-2 ml-2 text-sm text-gray-500">
                                {data.data.eventsFinished.translations[`${locale}`].form}
                                {"Lorem Ipsum is simply dummy text of the printing and typesetting since the 1500s"}
                            </p>
                            <p className="text-sm">{"Tadbir bo'lib o'tadigan joyi"}</p>
                            <p className="mb-2 ml-2 text-sm text-gray-500">
                                {data.data.eventsFinished.place}
                            </p>
                            <hr className="mt-4" />
                            <p className="text-sm">Hamkorlar</p>
                            <div>
                                {data.data.eventsFinished.partners.map((item: any, i: number) => (
                                    <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700 m-1">{item}</span>
                                ))}
                            </div>
                            <Accordion type="single" collapsible>

                                <AccordionItem value={`item-1`}>
                                    <AccordionTrigger>Users</AccordionTrigger>
                                    <AccordionContent>
                                        <ul>
                                            {data_users.map((item, i) => (

                                                <li key={i} className="flex items-center justify-between py-2 border-b border-gray-300">
                                                    <div className="flex items-center">
                                                        <span className="text-lg font-medium mr-4">{i + 1}</span>
                                                        <UserIcon className="w-8 h-8 rounded-full mr-4 bg-gray-200" />
                                                        <span className="text-gray-800 font-medium">Fayzullo Jurayev</span>
                                                    </div>
                                                    <span className="text-maincolor font-medium">+998 93 917 99 33</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EventFinished;