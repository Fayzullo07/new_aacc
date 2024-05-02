"use client"
import { aboutGetOneAPI, aboutPutAPI } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import TipTap from "@/components/Core/TipTap";
import UploadImage from "@/utils/UploadImage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const About = () => {
    const id = "6633e63aaa72d640333ca62f"
    const [isPicker, setIsPicker] = useState(false);
    const [isPickerSecond, setIsPickerSecond] = useState(false);
    const [formData, setFormData] = useState({
        photo: "",
        secondPhoto: "",
        uzDesc: "",
        ruDesc: "",
        enDesc: "",
    });

    const setURLPhoto = (url: string) => {
        setFormData({ ...formData, photo: url });
    }
    const setURLPhotoSecond = (url: string) => {
        setFormData({ ...formData, secondPhoto: url });
    }

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
        queryKey: ["aboutid"],
        queryFn: async () => {
            return await aboutGetOneAPI({ id });
        },

    });
    const mutation = useMutation(
        {
            mutationFn: async () => {
                return aboutPutAPI(formData, id);
            },
            onSuccess: () => {
                toast.success("Updated successfully!")
            }
        }
    );
    useEffect(() => {
        if (data) {
            setFormData({
                photo: data.data.about.photo,
                secondPhoto: data.data.about.secondPhoto,
                uzDesc: data.data.about.translations.uz.desc,
                ruDesc: data.data.about.translations.ru.desc,
                enDesc: data.data.about.translations.en.desc,
            });
        }
    }, [data]);

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    const handleSubmit = (e: any) => {
        e.preventDefault();


        if (!formData.uzDesc || !formData.ruDesc || !formData.enDesc) {
            toast.warning("Content");
            return;
        }

        mutation.mutate();
    };
    return (
        <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">About Image</label>
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
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Second Image</label>
                {!formData.secondPhoto ? (

                    <div
                        className="container border-[5px] border-dashed border-green-500 cursor-pointer flex justify-center p-8"
                        onClick={() => (isPickerSecond ? setIsPickerSecond(false) : setIsPickerSecond(true))}
                        title="Choose Image"
                    >
                        <ImageIcon size={"50"} strokeWidth={1} />
                    </div>
                ) : (
                    <div className="border-[5px] border-dashed border-green-500 min-h-10 relative p-1">
                        <div className="absolute right-0">
                            <XIcon className=" cursor-pointer" onClick={() => setFormData({ ...formData, secondPhoto: "" })} />
                        </div>

                        <div className="max-w-xl h-auto mx-auto flex justify-center">
                            <Image
                                src={formData.secondPhoto}
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
            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Content UZ</label>
                <TipTap
                    content={data?.data.about.translations.uz.desc}
                    onChange={(newContent: string) => handleContentChangeUz(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Content RU</label>
                <TipTap
                    content={data?.data.about.translations.ru.desc}
                    onChange={(newContent: string) => handleContentChangeRu(newContent)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Content EN</label>
                <TipTap
                    content={data?.data.about.translations.en.desc}
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
            {/* FileStack */}
            {isPicker && (
                <UploadImage
                    setIsPicker={setIsPicker}
                    setURL={setURLPhoto}
                />
            )}

            {/* FileStack */}
            {isPickerSecond && (
                <UploadImage
                    setIsPicker={setIsPickerSecond}
                    setURL={setURLPhotoSecond}
                />
            )}
        </div>
    )
}

export default About;