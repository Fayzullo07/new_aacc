"use client"
import { serviceGetOneAPI, servicePutAPI } from "@/api/AdminRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import TipTap from "@/components/Core/TipTap";
import Loading from "@/components/Core/Loading";
const UpdateProject = ({ params }: { params: any }) => {
    const { id } = params;
    const router = useRouter();
    const locale = useLocale();
    const [formData, setFormData] = useState({
        uzTitle: "",
        ruTitle: "",
        enTitle: "",
        uzDesc: "",
        ruDesc: "",
        enDesc: "",
    });

    const { data, isError, isLoading } = useQuery({
        queryKey: ["serviceid", id],
        queryFn: async () => {
            return await serviceGetOneAPI({ id });
        },

    });
    const mutation = useMutation(
        {
            mutationFn: async () => {
                return servicePutAPI(formData, id);
            },
            onSuccess: () => {
                router.push(`/${locale}/admin/services`)
            }
        }
    );
    useEffect(() => {
        if (data) {
            setFormData({
                uzTitle: data.data.services.translations.uz.title,
                ruTitle: data.data.services.translations.ru.title,
                enTitle: data.data.services.translations.en.title,
                uzDesc: data.data.services.translations.uz.desc,
                ruDesc: data.data.services.translations.ru.desc,
                enDesc: data.data.services.translations.en.desc,
            });
        }
    }, [data]);

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;



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

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!formData.uzTitle) {
            toast.warning("Title");
            return;
        }

        if (!formData.uzDesc || !formData.ruDesc || !formData.enDesc) {
            toast.warning("Content");
            return;
        }

        mutation.mutate();
    };

    return (
        <div className="shadow p-4 bg-white rounded-xl">

            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div>
                    <label htmlFor="uzTitle" className="block mb-2 text-sm font-medium text-gray-900">Title UZ</label>
                    <input
                        type="text"
                        name="uzTitle"
                        id="uzTitle"
                        value={formData.uzTitle}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter title . . ."
                    />
                </div>
                <div>
                    <label htmlFor="ruTitle" className="block mb-2 text-sm font-medium text-gray-900">Title RU</label>
                    <input
                        type="text"
                        name="ruTitle"
                        id="ruTitle"
                        value={formData.ruTitle}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter title . . ."
                    />
                </div>
                <div>
                    <label htmlFor="enTitle" className="block mb-2 text-sm font-medium text-gray-900">Title EN</label>
                    <input
                        type="text"
                        name="enTitle"
                        id="enTitle"
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
                    content={data?.data.services.translations.uz.desc}
                    onChange={(newContent: string) => handleContentChangeUz(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Content RU</label>
                <TipTap
                    content={data?.data.services.translations.ru.desc}
                    onChange={(newContent: string) => handleContentChangeRu(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Content EN</label>
                <TipTap
                    content={data?.data.services.translations.en.desc}
                    onChange={(newContent: string) => handleContentChangeEn(newContent)}
                />
            </div>

            <button
                disabled={mutation.isPending}
                onClick={handleSubmit}
                className="text-white bg-maincolor hover:scale-90 duration-300 font-medium rounded-lg text-sm  px-5 py-2.5"
            >
                {!mutation.isPending ? "Update" : "Loading . . ."}
            </button>

        </div>

    )
}

export default UpdateProject;