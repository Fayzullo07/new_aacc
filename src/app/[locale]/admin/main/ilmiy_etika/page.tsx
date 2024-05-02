"use client"
import { centerMindGetOneAPI, centerMindPutAPI, ilmiyEtikaGetOneAPI, ilmiyEtikaPutAPI } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import TipTap from "@/components/Core/TipTap";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const IlmiyEtika = () => {
    const [formData, setFormData] = useState({
        uzTitle: "",
        ruTitle: "",
        enTitle: "",
        uzDesc: "",
        ruDesc: "",
        enDesc: "",
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleContentChangeUz = (reason: any) => {
        setFormData({ ...formData, uzDesc: reason });
    }

    const handleContentChangeRu = (reason: any) => {
        setFormData({ ...formData, ruDesc: reason });
    }

    const handleContentChangeEn = (reason: any) => {
        setFormData({ ...formData, enDesc: reason });
    }

    const { data, isError, isLoading } = useQuery({
        queryKey: ["ilmiy_etika"],
        queryFn: async () => {
            return await ilmiyEtikaGetOneAPI();
        },

    });
    const mutation = useMutation(
        {
            mutationFn: async (id: any) => {
                return ilmiyEtikaPutAPI(formData, id);
            },
            onSuccess: () => {
                toast.success("Updated successfully!")
            }
        }
    );
    useEffect(() => {
        if (data) {
            setFormData({
                uzTitle: data.data.ilmiy_etika.translations.uz.title,
                ruTitle: data.data.ilmiy_etika.translations.ru.title,
                enTitle: data.data.ilmiy_etika.translations.en.title,
                uzDesc: data.data.ilmiy_etika.translations.uz.desc,
                ruDesc: data.data.ilmiy_etika.translations.ru.desc,
                enDesc: data.data.ilmiy_etika.translations.en.desc,
            });
        }
    }, [data]);

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    const handleSubmit = (id: any) => {


        if (!formData.uzDesc || !formData.ruDesc || !formData.enDesc) {
            toast.warning("Content");
            return;
        }

        mutation.mutate(id);
    };
    return (
        <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div>
                    <label htmlFor="uztitle" className="block mb-2 text-sm font-medium text-gray-900">Title UZ</label>
                    <input
                        type="text"
                        name="uzTitle"
                        id="uztitle"
                        value={formData.uzTitle}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter title . . ."
                    />
                </div>
                <div>
                    <label htmlFor="rutitle" className="block mb-2 text-sm font-medium text-gray-900">Title RU</label>
                    <input
                        type="text"
                        name="ruTitle"
                        id="rutitle"
                        value={formData.ruTitle}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter title . . ."
                    />
                </div>
                <div>
                    <label htmlFor="entitle" className="block mb-2 text-sm font-medium text-gray-900">Title EN</label>
                    <input
                        type="text"
                        name="enTitle"
                        id="entitle"
                        value={formData.enTitle}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter title . . ."
                    />
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Content UZ</label>
                <TipTap
                    content={data?.data.ilmiy_etika.translations.uz.desc}
                    onChange={(newContent: string) => handleContentChangeUz(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Content RU</label>
                <TipTap
                    content={data?.data.ilmiy_etika.translations.ru.desc}
                    onChange={(newContent: string) => handleContentChangeRu(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Content EN</label>
                <TipTap
                    content={data?.data.ilmiy_etika.translations.en.desc}
                    onChange={(newContent: string) => handleContentChangeEn(newContent)}
                />
            </div>

            <button
                disabled={mutation.isPending}
                onClick={() => handleSubmit(data?.data.ilmiy_etika._id)}
                className="text-white bg-maincolor hover:scale-90 duration-300 font-medium rounded-lg text-sm  px-5 py-2.5"
            >
                {!mutation.isPending ? "Save" : "Loading . . ."}
            </button>

        </div>
    )
}

export default IlmiyEtika;