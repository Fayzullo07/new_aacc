"use client"
import { aboutGetAPI } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import Image from "next/image";

const AboutUs = () => {
    const locale = useLocale();

    const { data, isError, isLoading } = useQuery({
        queryKey: ["aboutid"],
        queryFn: async () => {
            return await aboutGetAPI();
        },

    });

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <div className="bg-white border-slate-200 shadow shadow-slate-950/5 rounded overflow-hidden" >
            {data?.data.about.length >= 1 ? (

                <div className=" overflow-hidden ">

                    {/* <!-- Image --> */}
                    <div className="w-full h-auto mx-auto flex justify-center border p-2">
                        <Image
                            src={data.data.about[0].photo}
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
                            dangerouslySetInnerHTML={{ __html: data.data.about[0].translations[`${locale}`].desc }}
                        />
                    </div>
                    {/* <!-- SECOND IMAGE --> */}
                    <div className="w-full h-auto mx-auto flex justify-center border p-2">
                        <Image
                            src={data.data.about[0].secondPhoto}
                            width={0}
                            height={0}
                            className="object-cover"
                            sizes="100vw"
                            style={{ width: 'auto', height: 'auto' }} // optional
                            alt="Image"
                        />
                    </div>
                </div>
            ) : null}
        </div>

    )
}

export default AboutUs;