"use client"
import { projectGetAPI } from "@/api/AdminRequest";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightIcon, Building2Icon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo } from "react";
import Loading from "../Core/Loading";

const ProjectsGet = ({ search = "", amount = 0 }) => {
    const t = useTranslations("AboutUs");
    const locale = useLocale();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["projects", search],
        queryFn: async () => {
            return await projectGetAPI({ search });
        }
    });

    const dataItem = useMemo(() => {
        if (data && data.data && data.data.projects) {
            if (amount !== 0) {
                return data.data.projects.slice(0, amount);
            } else {
                return data.data.projects;
            }
        }
        return [];
    }, [data, amount]);
    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;


    return (
        <>
            {dataItem.map((item: any, i: number) => (
                <div key={i} className="flex flex-col justify-between items-start p-4 bg-white border border-gray-100 rounded-lg shadow hover:shadow-xl duration-300" data-aos="fade-up" data-aos-delay={(i + 1) * 100} data-aos-duration={(i + 1) * 100}>
                    <div>
                        <div className="flex items-center gap-2 sm:gap-4 text-maincolor mb-2">
                            <Building2Icon />
                            <h5 className="text-base sm:text-xl font-semibold tracking-wide">{item.title}</h5>
                        </div>
                        {item.translations[`${locale}`].content.length > 200 ? (

                            <div
                                className=" whitespace-pre-line mb-3 font-normal text-sm sm:text-base text-gray-500"
                                style={{ whiteSpace: "pre-line" }}
                                dangerouslySetInnerHTML={{ __html: `${item.translations[`${locale}`].content.substring(0, 200)} ...` }}
                            />
                        ) : (
                            <div
                                className=" whitespace-pre-line mb-3 font-normal text-sm sm:text-base text-gray-500"
                                style={{ whiteSpace: "pre-line" }}
                                dangerouslySetInnerHTML={{ __html: `${item.translations[`${locale}`].content}` }}
                            />
                        )}
                        {/* <p className="mb-3 font-normal text-base sm:text-xl text-gray-700 dark:text-gray-400">{item.translations[`${locale}`].content.substring(0, 100)}</p> */}
                    </div>
                    <Link href={`/${locale}/main_all/projects/${item._id}`} className="inline-flex items-center text-base font-medium text-center text-maincolor border border-maincolor hover:text-white hover:bg-maincolor rounded-lg px-2 py-1 hover:px-6 duration-300">
                        {t('button')}
                        <ArrowRightIcon className="ms-2 w-5 h-5" />
                    </Link>
                </div>
            )

            )}
        </>
    )
}

export default ProjectsGet;