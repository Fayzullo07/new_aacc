"use client"
import { projectPostAPI, servicePostAPI } from "@/api/AdminRequest";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import TipTap from "@/components/Core/TipTap";

const AddService = () => {
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

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const mutation = useMutation(
        {
            mutationFn: async () => {
                return servicePostAPI(formData);
            },
            onSuccess: () => {
                router.push(`/${locale}/admin/services`)
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
                    onChange={(newContent: string) => handleContentChangeUz(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Content RU</label>
                <TipTap
                    onChange={(newContent: string) => handleContentChangeRu(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Content EN</label>
                <TipTap
                    onChange={(newContent: string) => handleContentChangeEn(newContent)}
                />
            </div>

            <button
                disabled={mutation.isPending}
                onClick={handleSubmit}
                className="text-white bg-maincolor hover:scale-90 duration-300 font-medium rounded-lg text-sm  px-5 py-2.5"
            >
                {!mutation.isPending ? "Add" : "Loading . . ."}
            </button>

        </div>

    )
}

export default AddService;