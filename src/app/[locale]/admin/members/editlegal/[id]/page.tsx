"use client"
import { memberGetOneAPI, memberPostAPI, memberPutAPI, projectPostAPI } from "@/api/AdminRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import TipTap from "@/components/Core/TipTap";
import Loading from "@/components/Core/Loading";

const UpdateMemberLegal = ({ params }: { params: any }) => {
    const { id } = params;
    const router = useRouter();
    const locale = useLocale();
    const [formData, setFormData] = useState({
        uzName: "",
        ruName: "",
        enName: "",
        uzAddress: "",
        ruAddress: "",
        enAddress: "",
        uzActivity: "",
        ruActivity: "",
        enActivity: "",
        uzDesc: "",
        ruDesc: "",
        enDesc: "",
        isLegal: true
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };
    const { data, isError, isLoading } = useQuery({
        queryKey: ["userLegalid", id],
        queryFn: async () => {
            return await memberGetOneAPI({ id, legal: true });
        },

    });
    const mutation = useMutation(
        {
            mutationFn: async () => {
                return memberPutAPI(formData, id);
            },
            onSuccess: () => {
                router.push(`/${locale}/admin/members`)
            }
        }
    );
    useEffect(() => {
        if (data) {
            setFormData({
                uzName: data.data.membersLegal.translations.uz.name,
                ruName: data.data.membersLegal.translations.ru.name,
                enName: data.data.membersLegal.translations.en.name,
                uzAddress: data.data.membersLegal.translations.uz.address,
                ruAddress: data.data.membersLegal.translations.ru.address,
                enAddress: data.data.membersLegal.translations.en.address,
                uzActivity: data.data.membersLegal.translations.uz.activity,
                ruActivity: data.data.membersLegal.translations.ru.activity,
                enActivity: data.data.membersLegal.translations.en.activity,
                uzDesc: data.data.membersLegal.translations.uz.desc,
                ruDesc: data.data.membersLegal.translations.ru.desc,
                enDesc: data.data.membersLegal.translations.en.desc,
                isLegal: true
            });
        }
    }, [data]);

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

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

        // if (!formData.uzName || !formData.ruName || !formData.enName) {
        //     toast.warning("Name");
        //     return;
        // }

        // if (!formData.uzDesc || !formData.ruDesc || !formData.enDesc) {
        //     toast.warning("Content");
        //     return;
        // }

        mutation.mutate();
    };

    return (
        <div className="shadow p-4 bg-white rounded-xl">

            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div>
                    <label htmlFor="uzName" className="block mb-2 text-sm font-medium text-gray-900">Tashkilot UZ</label>
                    <input
                        type="text"
                        name="uzName"
                        id="uzName"
                        value={formData.uzName}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter name . . ."
                    />
                </div>
                <div>
                    <label htmlFor="rutitle" className="block mb-2 text-sm font-medium text-gray-900">Tashkilot RU</label>
                    <input
                        type="text"
                        name="ruName"
                        id="rutitle"
                        value={formData.ruName}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter name . . ."
                    />
                </div>
                <div>
                    <label htmlFor="entitle" className="block mb-2 text-sm font-medium text-gray-900">Tashkilot EN</label>
                    <input
                        type="text"
                        name="enName"
                        id="entitle"
                        value={formData.enName}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter name . . ."
                    />
                </div>
            </div>

            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div>
                    <label htmlFor="uzAddress" className="block mb-2 text-sm font-medium text-gray-900">Address UZ</label>
                    <input
                        type="text"
                        name="uzAddress"
                        id="uzAddress"
                        value={formData.uzAddress}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter Address . . ."
                    />
                </div>
                <div>
                    <label htmlFor="ruAddress" className="block mb-2 text-sm font-medium text-gray-900">Address RU</label>
                    <input
                        type="text"
                        name="ruAddress"
                        id="ruAddress"
                        value={formData.ruAddress}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter Address . . ."
                    />
                </div>
                <div>
                    <label htmlFor="enAddress" className="block mb-2 text-sm font-medium text-gray-900">Address EN</label>
                    <input
                        type="text"
                        name="enAddress"
                        id="enAddress"
                        value={formData.enAddress}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter Address . . ."
                    />
                </div>
            </div>

            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div>
                    <label htmlFor="uzActivity" className="block mb-2 text-sm font-medium text-gray-900">Faoliyat turi UZ</label>
                    <input
                        type="text"
                        name="uzActivity"
                        id="uzActivity"
                        value={formData.uzActivity}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter Faoliyat . . ."
                    />
                </div>
                <div>
                    <label htmlFor="ruActivity" className="block mb-2 text-sm font-medium text-gray-900">Faoliyat turi RU</label>
                    <input
                        type="text"
                        name="ruActivity"
                        id="ruActivity"
                        value={formData.ruActivity}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter Faoliyat . . ."
                    />
                </div>
                <div>
                    <label htmlFor="enActivity" className="block mb-2 text-sm font-medium text-gray-900">Faoliyat turi EN</label>
                    <input
                        type="text"
                        name="enActivity"
                        id="enActivity"
                        value={formData.enActivity}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter Faoliyat . . ."
                    />
                </div>
            </div>



            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Description UZ</label>
                <TipTap
                    content={data?.data.membersLegal.translations.uz.desc}
                    onChange={(newContent: string) => handleContentChangeUz(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Description RU</label>
                <TipTap
                    content={data?.data.membersLegal.translations.ru.desc}
                    onChange={(newContent: string) => handleContentChangeRu(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Description EN</label>
                <TipTap
                    content={data?.data.membersLegal.translations.en.desc}
                    onChange={(newContent: string) => handleContentChangeEn(newContent)}
                />
            </div>

            <button
                disabled={mutation.isPending}
                onClick={handleSubmit}
                className="text-white bg-maincolor hover:scale-90 duration-300 font-medium rounded-lg text-sm  px-5 py-2.5"
            >
                {!mutation.isPending ? "Save" : "Loading . . ."}
            </button>
        </div>
    )
}

export default UpdateMemberLegal;