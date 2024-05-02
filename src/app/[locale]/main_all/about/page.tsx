"use client"
import { aboutGetOneAPI } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import Image from "next/image";

const AboutUs = () => {
    const id = "6633e63aaa72d640333ca62f"
    const locale = useLocale();

    const { data, isError, isLoading } = useQuery({
        queryKey: ["aboutid"],
        queryFn: async () => {
            return await aboutGetOneAPI({ id });
        },

    });

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <div className="bg-white border-slate-200 shadow shadow-slate-950/5 rounded overflow-hidden" >
            {data?.data.about && (

                <div className=" overflow-hidden ">

                    {/* <!-- Image --> */}
                    <div className="w-full h-auto mx-auto flex justify-center border p-2">
                        <Image
                            src={data.data.about.photo}
                            width={0}
                            height={0}
                            className="object-cover"
                            sizes="100vw"
                            style={{ width: 'auto', height: 'auto' }} // optional
                            alt="Image"
                        />
                    </div>


                    <div className="p-4 text-gray-600 text-lg">
                        <div
                            className=" whitespace-pre-line tiptap"
                            style={{ whiteSpace: "pre-line" }}
                            dangerouslySetInnerHTML={{ __html: data.data.about.translations[`${locale}`].desc }}
                        />
                    </div>
                     {/* <!-- SECOND IMAGE --> */}
                     <div className="w-full h-auto mx-auto flex justify-center border p-2">
                        <Image
                            src={data.data.about.secondPhoto}
                            width={0}
                            height={0}
                            className="object-cover"
                            sizes="100vw"
                            style={{ width: 'auto', height: 'auto' }} // optional
                            alt="Image"
                        />
                    </div>
                </div>
            )}
        </div>

    )
}

export default AboutUs;