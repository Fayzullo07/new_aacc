"use client"
import { memberPostAPI, projectPostAPI } from "@/api/AdminRequest";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import TipTap from "@/components/Core/TipTap";

const AddMemberLegal = () => {
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

    const mutation = useMutation(
        {
            mutationFn: async () => {
                return memberPostAPI(formData);
            },
            onSuccess: () => {
                router.push(`/${locale}/admin/members`)
            }
        }
    );

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
                    onChange={(newContent: string) => handleContentChangeUz(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Description RU</label>
                <TipTap
                    onChange={(newContent: string) => handleContentChangeRu(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Description EN</label>
                <TipTap
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

export default AddMemberLegal;