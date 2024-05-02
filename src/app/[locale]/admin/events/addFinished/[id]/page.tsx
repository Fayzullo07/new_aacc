"use client"
import { eventFinishedPostAPI, eventWaitGetOneAPI } from "@/api/AdminRequest";
import UploadImage from "@/utils/UploadImage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Loading from "@/components/Core/Loading";
import { Button } from "@/components/ui/button";

const AddFinished = ({ params }: { params: any }) => {
    const { id } = params;
    const router = useRouter();
    const locale = useLocale();
    const [isPicker, setIsPicker] = useState(false);
    const [formData, setFormData] = useState<any>({
        photo: "",
        place: "",
        date: "",
        uzName: "",
        ruName: "",
        enName: "",
        uzForm: "",
        ruForm: "",
        enForm: "",
        uzResult: "",
        ruResult: "",
        enResult: "",
        partners: [],
    });

    const [photos, setPhotos] = useState<string[]>([]);
    const [partners, setPartners] = useState<string[]>([]);

    const [partner, setPartner] = useState("");
    const addPartners = (item: string): void => {
        if (!partner) {
            toast.warning("Empty partner");
            return;
        }
        setPartners([...partners, item]);
        setPartner("");
    }

    const deletePartner = (index: number): void => {
        setPartners(prevPartners => prevPartners.filter((_, i) => i !== index));
    }

    const setURLPhoto = (url: string): void => {
        setPhotos([...photos, url]);
    }

    const deletePhoto = (index: number): void => {
        setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
    }
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const mutation = useMutation(
        {
            mutationFn: async () => {
                return eventFinishedPostAPI({ ...formData, idWait: id, partners: [...partners] });
            },
            onSuccess: () => {
                router.push(`/${locale}/admin/events/finished`)
            }
        }
    );
    const { data, isError, isLoading } = useQuery({
        queryKey: ["eventWaitID", id],
        queryFn: async () => {
            return await eventWaitGetOneAPI({ id });
        },

    });

    useEffect(() => {
        if (data) {
            setFormData({
                photo: data.data.eventsWait.photo,
                place: data.data.eventsWait.place,
                date: data.data.eventsWait.date,
                uzName: data.data.eventsWait.translations.uz.name,
                ruName: data.data.eventsWait.translations.ru.name,
                enName: data.data.eventsWait.translations.en.name,
                uzForm: data.data.eventsWait.translations.uz.form,
                ruForm: data.data.eventsWait.translations.ru.form,
                enForm: data.data.eventsWait.translations.en.form,
                uzResult: data.data.eventsWait.translations.uz.result,
                ruResult: data.data.eventsWait.translations.ru.result,
                enResult: data.data.eventsWait.translations.en.result,

            });
            setPhotos([data.data.eventsWait.photo])
            setPartners([...data.data.eventsWait.partners])
        }
    }, [data]);

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;


    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!formData.uzName || !formData.ruName || !formData.ruName) {
            toast.warning("Title");
            return;
        }

        // if (!formData.uzContent || !formData.ruContent || !formData.enContent) {
        //     toast.warning("Content");
        //     return;
        // }
        setFormData({ ...formData, partners: partners })
        setFormData({ ...formData, photos: photos })
        mutation.mutate();
    };
    return (
        <div className="shadow p-4 bg-white rounded-xl">
            <div className="mb-5 p-2 border rounded-md flex items-center flex-wrap gap-3.5">
                {photos && photos.map((item, i) => (
                    <div key={i} className=" relative border-[2px] rounded w-20 h-20 flex items-center justify-center text-gray-400">
                        <Image
                            src={item}
                            width={150}
                            height={0}
                            // className="transition hover:scale-110 duration-300 shadow-xl"
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }} // optional
                            alt="Image"
                        />
                        <div onClick={() => deletePhoto(i)} className="absolute -top-2 -right-2 cursor-pointer border rounded-lg bg-white">
                            <XIcon size={18} />
                        </div>
                    </div>
                ))}
                <div onClick={() => (isPicker ? setIsPicker(false) : setIsPicker(true))} className="border-[2px] border-dashed border-green-500 rounded w-20 h-20 flex items-center justify-center text-gray-400 cursor-pointer">
                    <PlusIcon />
                </div>
            </div>

            {/* Name */}
            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div>
                    <label htmlFor="uzName" className="block mb-2 text-sm font-medium text-gray-900">Tadbir nomi UZ</label>
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
                    <label htmlFor="ruName" className="block mb-2 text-sm font-medium text-gray-900">Tadbir nomi RU</label>
                    <input
                        type="text"
                        name="ruName"
                        id="ruName"
                        value={formData.ruName}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter name . . ."
                    />
                </div>
                <div>
                    <label htmlFor="enName" className="block mb-2 text-sm font-medium text-gray-900">Tadbir nomi EN</label>
                    <input
                        type="text"
                        name="enName"
                        id="enName"
                        value={formData.enName}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter name . . ."
                    />
                </div>
            </div>

            {/* Form */}
            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div>
                    <label htmlFor="uzForm" className="block mb-2 text-sm font-medium text-gray-900">Tadbir shakli UZ</label>
                    <input
                        type="text"
                        name="uzForm"
                        id="uzForm"
                        value={formData.uzForm}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter form . . ."
                    />
                </div>
                <div>
                    <label htmlFor="ruForm" className="block mb-2 text-sm font-medium text-gray-900">Tadbir shakli RU</label>
                    <input
                        type="text"
                        name="ruForm"
                        id="ruForm"
                        value={formData.ruForm}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter form . . ."
                    />
                </div>
                <div>
                    <label htmlFor="enForm" className="block mb-2 text-sm font-medium text-gray-900">Tadbir shakli EN</label>
                    <input
                        type="text"
                        name="enForm"
                        id="enForm"
                        value={formData.enForm}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter form . . ."
                    />
                </div>
            </div>

            {/* Result */}
            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div>
                    <label htmlFor="uzResult" className="block mb-2 text-sm font-medium text-gray-900">Tadbirdan kutilayotgan natigalar UZ</label>
                    <input
                        type="text"
                        name="uzResult"
                        id="uzResult"
                        value={formData.uzResult}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter result . . ."
                    />
                </div>
                <div>
                    <label htmlFor="ruResult" className="block mb-2 text-sm font-medium text-gray-900">Tadbirdan kutilayotgan natigalar RU</label>
                    <input
                        type="text"
                        name="ruResult"
                        id="ruResult"
                        value={formData.ruResult}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter result . . ."
                    />
                </div>
                <div>
                    <label htmlFor="enResult" className="block mb-2 text-sm font-medium text-gray-900">Tadbirdan kutilayotgan natigalar EN</label>
                    <input
                        type="text"
                        name="enResult"
                        id="enResult"
                        value={formData.enResult}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter result . . ."
                    />
                </div>
            </div>

            {/* Target */}
            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
                <div>
                    <label htmlFor="place" className="block mb-2 text-sm font-medium text-gray-900">{"Tadbir bo'ladigan joyi"}</label>
                    <input
                        type="text"
                        name="place"
                        id="place"
                        value={formData.place}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter place . . ."
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">{"Tadbir bo'ladigan vaqti"}</label>
                    <input
                        type="datetime-local"
                        name="date"
                        id="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter date . . ."
                    />
                </div>
            </div>

            {/* Partners */}
            <div className="mb-5">
                <label htmlFor="partner" className="block mb-2 text-sm font-medium text-gray-900">{"Hamkorlar"}</label>
                {partners && (
                    <div className="border p-2 flex items-center flex-wrap gap-1 rounded-lg">
                        {
                            partners.map((item, i) => (
                                <span key={i} className="relative inline-block bg-gray-200 rounded-full px-3 py-2 text-sm font-medium text-gray-700 mx-1">
                                    {item}
                                    <div onClick={() => deletePartner(i)} className="absolute -top-1 -right-1 cursor-pointer border rounded-lg bg-white">
                                        <XIcon size={16} />
                                    </div>
                                </span>
                            ))
                        }
                    </div>
                )}
                <div className=" inline-block">
                    <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg m-1">
                        <input
                            type="text"
                            name="partner"
                            id="partner"
                            value={partner}
                            onKeyDown={(e) => {
                                if (e.key == "Enter") {
                                    addPartners(partner);
                                }
                            }}
                            onChange={(e: any) => setPartner(e.target.value)}
                            className=" text-gray-900 text-sm  focus:outline-none rounded-lg inline-block  p-2"
                            placeholder="Add partner . . ."
                        />
                        <Button size={"icon"} onClick={() => addPartners(partner)}>
                            <PlusIcon />
                        </Button>
                    </div>
                </div>
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

export default AddFinished;