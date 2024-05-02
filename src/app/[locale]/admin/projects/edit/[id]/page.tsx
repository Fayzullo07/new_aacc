"use client"
import { projectGetOneAPI, projectPutAPI } from "@/api/AdminRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



import TipTap from "@/components/Core/TipTap";
const UpdateProject = ({ params }: { params: any }) => {
    const { id } = params;
    const router = useRouter();
    const locale = useLocale();
    const [formData, setFormData] = useState({
        title: "",
        uzContent: "",
        ruContent: "",
        enContent: "",
    });

    const { data, isError, isLoading } = useQuery({
        queryKey: ["projectid", id],
        queryFn: async () => {
            return await projectGetOneAPI({ id });
        },

    });
    const mutation = useMutation(
        {
            mutationFn: async () => {
                return projectPutAPI(formData, id);
            },
            onSuccess: () => {
                router.push(`/${locale}/admin/projects`)
            }
        }
    );
    useEffect(() => {
        if (data) {
            setFormData({
                title: data.data.projects.title,
                uzContent: data.data.projects.translations.uz.content,
                ruContent: data.data.projects.translations.ru.content,
                enContent: data.data.projects.translations.en.content,
            });
        }
    }, [data]);

    if (isLoading) return <div>Yuklanmoqda...</div>;
    if (isError) return <div>Xatolik yuz berdi...</div>;



    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
                    content={data?.data.projects.translations.uz.content}
                    onChange={(newContent: string) => handleContentChangeUz(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Content RU</label>
                <TipTap
                    content={data?.data.projects.translations.ru.content}
                    onChange={(newContent: string) => handleContentChangeRu(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Content EN</label>
                <TipTap
                    content={data?.data.projects.translations.en.content}
                    onChange={(newContent: string) => handleContentChangeEn(newContent)}
                />
            </div>

            <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

        </div>

    )
}

export default UpdateProject;