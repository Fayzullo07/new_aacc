"use client"
import { questionPostAPI } from "@/api/AdminRequest";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import TipTap from "@/components/Core/TipTap";

const AddQuestion = () => {
    const router = useRouter();
    const locale = useLocale();
    const [formData, setFormData] = useState({
        uzQuestion: "",
        ruQuestion: "",
        enQuestion: "",
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
                return questionPostAPI(formData);
            },
            onSuccess: () => {
                router.push(`/${locale}/admin/question`)
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

        if (!formData.uzQuestion || !formData.ruQuestion || !formData.enQuestion) {
            toast.warning("Question");
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
                    <label htmlFor="uztitle" className="block mb-2 text-sm font-medium text-gray-900">Question UZ</label>
                    <input
                        type="text"
                        name="uzQuestion"
                        id="uztitle"
                        value={formData.uzQuestion}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter question . . ."
                    />
                </div>
                <div>
                    <label htmlFor="rutitle" className="block mb-2 text-sm font-medium text-gray-900">Question RU</label>
                    <input
                        type="text"
                        name="ruQuestion"
                        id="rutitle"
                        value={formData.ruQuestion}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter question . . ."
                    />
                </div>
                <div>
                    <label htmlFor="entitle" className="block mb-2 text-sm font-medium text-gray-900">Question EN</label>
                    <input
                        type="text"
                        name="enQuestion"
                        id="entitle"
                        value={formData.enQuestion}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter question . . ."
                    />
                </div>
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Desc UZ</label>
                <TipTap
                    onChange={(newContent: string) => handleContentChangeUz(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Desc RU</label>
                <TipTap
                    onChange={(newContent: string) => handleContentChangeRu(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Desc EN</label>
                <TipTap
                    onChange={(newContent: string) => handleContentChangeEn(newContent)}
                />
            </div>

            <button onClick={handleSubmit} disabled={mutation.isPending} className="text-white bg-maincolor hover:scale-95 duration-300 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{!mutation.isPending ? "Submit": "Loading . . ."}</button>

        </div>

    )
}

export default AddQuestion;