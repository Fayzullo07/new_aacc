"use client"
import { newPostAPI } from "@/api/AdminRequest";
import UploadImage from "@/utils/UploadImage";
import { useMutation } from "@tanstack/react-query";
import { ImageIcon, XIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import TipTap from "@/components/Core/TipTap";

const AddNew = () => {
    const router = useRouter();
    const locale = useLocale();
    const [isPicker, setIsPicker] = useState(false);
    const [formData, setFormData] = useState({
        photo: "",
        uzTitle: "",
        ruTitle: "",
        enTitle: "",
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
                return newPostAPI(formData);
            },
            onSuccess: () => {
                router.push(`/${locale}/admin/news`)
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

    const setURLPhoto = (url: string) => {
        setFormData({ ...formData, photo: url });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!formData.uzTitle || !formData.ruTitle || !formData.enTitle) {
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
                <label className="block mb-2 text-sm font-medium text-gray-900">Hero Image</label>
                {!formData.photo ? (

                    <div
                        className="container border-[5px] border-dashed border-green-500 cursor-pointer flex justify-center p-8"
                        onClick={() => (isPicker ? setIsPicker(false) : setIsPicker(true))}
                        title="Choose Image"
                    >
                        <ImageIcon size={"50"} strokeWidth={1} />
                    </div>
                ) : (
                    <div className="border-[5px] border-dashed border-green-500 min-h-10 relative p-1">
                        <div className="absolute right-0">
                            <XIcon className=" cursor-pointer" onClick={() => setFormData({ ...formData, photo: "" })} />
                        </div>

                        <div className="max-w-xl h-auto mx-auto flex justify-center">
                            <Image
                                src={formData.photo}
                                width={0}
                                height={0}
                                // className=" transition hover:scale-110 duration-300"
                                sizes="100vw"
                                style={{ width: 'auto', height: 'auto' }} // optional
                                alt="Image"
                            />
                        </div>
                    </div>
                )}
            </div>

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
            {/* FileStack */}
            {isPicker && (
                <UploadImage
                    setIsPicker={setIsPicker}
                    setURL={setURLPhoto}
                />
            )}
        </div>

    )
}

export default AddNew;