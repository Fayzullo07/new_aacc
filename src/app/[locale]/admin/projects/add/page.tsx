"use client"
import { projectPostAPI } from "@/api/AdminRequest";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import TipTap from "@/components/Core/TipTap";

const AddProject = () => {
    const router = useRouter();
    const locale = useLocale();
    const [formData, setFormData] = useState({
        title: "",
        uzContent: "",
        ruContent: "",
        enContent: "",
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const mutation = useMutation(
        {
            mutationFn: async () => {
                return projectPostAPI(formData);
            },
            onSuccess: () => {
                router.push(`/${locale}/admin/projects`)
            }
        }
    );

    const handleContentChangeUz = (reason: any) => {
        setFormData({ ...formData, uzContent: reason });
    }

    const handleContentChangeRu = (reason: any) => {
        setFormData({ ...formData, ruContent: reason });
    }

    const handleContentChangeEn = (reason: any) => {
        setFormData({ ...formData, enContent: reason });
    }


    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!formData.title) {
            toast.warning("Title");
            return;
        }

        if (!formData.uzContent || !formData.ruContent || !formData.enContent) {
            toast.warning("Content");
            return;
        }

        mutation.mutate();
    };

    return (
        <div className="shadow p-4 bg-white rounded-xl">

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter title . . ."
                />
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

            <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

        </div>

    )
}

export default AddProject;