import { useLocale } from "next-intl";
import ImagesCarusel from "../Core/ImagesCarusel";
import Link from "next/link";
import { eventsFinishedGetAPI } from "@/api/AdminRequest";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import Loading from "../Core/Loading";
import moment from "moment";

const EventFinishedGet = ({ search = "", amount = 0 }) => {
    const locale = useLocale();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["eventWait"],
        queryFn: async () => {
            return await eventsFinishedGetAPI({ search });
        }
    });

    const dataItem = useMemo(() => {
        if (data && data.data && data.data.eventsFinished) {
            if (amount !== 0) {
                return data.data.eventsFinished.slice(0, amount);
            } else {
                return data.data.eventsFinished;
            }
        }
        return [];
    }, [data, amount]);

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <>
            {dataItem.map((item: any, i: number) => (

                <div key={i} data-aos="fade-up" data-aos-delay={(i + 1) * 100} data-aos-duration={(i + 1) * 100}
                    className=" bg-white relative cursor-pointer hover:shadow-2xl transition duration-300  rounded overflow-hidden shadow-lg">
                    <Link href={`/${locale}/main_all/events/finished/${item._id}`}>
                        <div className="py-4 px-8">
                            <h4 className="text-xl tracking-wide mb-3 font-semibold text-red-500">{item.translations[`${locale}`].name}</h4>
                            <p className="text-sm">Tadbirdan erishgan natijalar</p>
                            <p className="mb-2 ml-2 text-sm text-gray-500">
                                {item.translations[`${locale}`].result}
                            </p>
                            <p className="text-sm">Tadbir shakli</p>
                            <p className="mb-2 ml-2 text-sm text-gray-500">
                                {item.translations[`${locale}`].form}
                            </p>
                            <p className="text-sm">{"Tadbir o'tkazilgan joyi"}</p>
                            <p className="mb-2 ml-2 text-sm text-gray-500">
                                {item.place}
                            </p>
                            <div className=" overflow-hidden">
                                <ImagesCarusel images={item.photos} button={false} />
                            </div>

                            <hr className="mt-4" />
                            <p className="text-sm">Hamkorlar</p>
                            <div>
                                {item.partners.map((item: any, i: number) => (
                                    <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700 m-1">{item}</span>
                                ))}
                            </div>
                            <span className="text-xs text-red-500">{moment(item.date).format("L")} {moment(item.date).format("LT")}</span>
                        </div>
                    </Link>
                </div>
            ))}
        </>
    )
}

export default EventFinishedGet;