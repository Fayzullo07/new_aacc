"use client"
import { heroGetAPI, heroPutAPI } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import UploadImage from "@/utils/UploadImage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ImageIcon, XIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Hero = () => {
    const locale = useLocale();
    const [isPicker, setIsPicker] = useState(false);
    const [formData, setFormData] = useState({
        photo: "",
        uzTitle: "",
        ruTitle: "",
        enTitle: "",
        uzDesc: "",
        ruDesc: "",
        enDesc: "",
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        if (name === "uzTitle" && value.length > 50) {
            return;
        }

        if (name === "ruTitle" && value.length > 50) {
            return;
        }

        if (name === "enTitle" && value.length > 50) {
            return;
        }

        if (name === "uzDesc" && value.length > 500) {
            return;
        }

        if (name === "ruDesc" && value.length > 500) {
            return;
        }

        if (name === "enDesc" && value.length > 500) {
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const setURLPhoto = (url: string) => {
        setFormData({ ...formData, photo: url });
    }

    const { data, isError, isLoading } = useQuery({
        queryKey: ["heroid"],
        queryFn: async () => {
            return await heroGetAPI();
        },

    });
    const mutation = useMutation(
        {
            mutationFn: async (id: any) => {
                return heroPutAPI(formData, id);
            },
            onSuccess: () => {
                toast.success("Updated successfully!")
            }
        }
    );
    useEffect(() => {
        if (data) {
            setFormData({
                photo: data.data?.hero[0]?.photo,
                uzTitle: data.data.hero[0]?.translations.uz.title,
                ruTitle: data.data.hero[0]?.translations.ru.title,
                enTitle: data.data.hero[0]?.translations.en.title,
                uzDesc: data.data.hero[0]?.translations.uz.desc,
                ruDesc: data.data.hero[0]?.translations.ru.desc,
                enDesc: data.data.hero[0]?.translations.en.desc,
            });
        }
    }, [data]);

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    const handleSubmit = (id: any) => {
        if (!formData.uzTitle || !formData.ruTitle || !formData.enTitle) {
            toast.warning("Title");
            return;
        }

        if (!formData.uzDesc || !formData.ruDesc || !formData.enDesc) {
            toast.warning("Content");
            return;
        }

        mutation.mutate(id);
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {data.data.hero.length > 1 ? (
                <>
                    <div className="grid items-center justify-between gap-4" data-aos="fade-up" data-aos-delay="300">
                        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="uztitle" className="block mb-2 text-sm font-medium text-gray-900">Title UZ</label>
                                <textarea
                                    name="uzTitle"
                                    id="uztitle"
                                    value={formData.uzTitle}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Enter title uz . . ."
                                />
                            </div>
                            <div>
                                <label htmlFor="rutitle" className="block mb-2 text-sm font-medium text-gray-900">Title RU</label>
                                <textarea
                                    name="ruTitle"
                                    id="rutitle"
                                    value={formData.ruTitle}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Enter title ru . . ."
                                />
                            </div>
                            <div>
                                <label htmlFor="entitle" className="block mb-2 text-sm font-medium text-gray-900">Title EN</label>
                                <textarea
                                    name="enTitle"
                                    id="entitle"
                                    value={formData.enTitle}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Enter title en. . ."
                                />
                            </div>
                        </div>

                        <div className="mb-5 grid grid-cols-1  gap-4">
                            <div>
                                <label htmlFor="uzDesc" className="block mb-2 text-sm font-medium text-gray-900">Desc UZ</label>
                                <textarea
                                    rows={5}
                                    name="uzDesc"
                                    id="uzDesc"
                                    value={formData.uzDesc}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Enter desc uz . . ."
                                />
                            </div>
                            <div>
                                <label htmlFor="rudesc" className="block mb-2 text-sm font-medium text-gray-900">Desc RU</label>
                                <textarea
                                    rows={5}
                                    name="ruDesc"
                                    id="rudesc"
                                    value={formData.ruDesc}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Enter desc ru . . ."
                                />
                            </div>
                            <div>
                                <label htmlFor="endesc" className="block mb-2 text-sm font-medium text-gray-900">Desc EN</label>
                                <textarea
                                    rows={5}
                                    name="enDesc"
                                    id="endesc"
                                    value={formData.enDesc}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Enter desc en . . ."
                                />
                            </div>
                        </div>



                    </div>
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
                    <button
                        disabled={mutation.isPending}
                        onClick={() => handleSubmit(data?.data.hero[0]._id)}
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
                </>
            ) : (
                <Link href={`/${locale}/admin/main/hero/add`}>
                    <button className="p-2 px-4 rounded-lg text-white text-base bg-maincolor">Create Hero page</button>
                </Link>
            )}
        </div>
    )
}

export default Hero;