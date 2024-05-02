"use client"
import { eventWaitGetOneAPI, eventWaitPutAPI } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import { Button } from "@/components/ui/button";
import UploadImage from "@/utils/UploadImage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ImageIcon, PlusIcon, XIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditWait = ({ params }: { params: any }) => {
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
        uzTarget: "",
        ruTarget: "",
        enTarget: "",
        uzResult: "",
        ruResult: "",
        enResult: "",
        partners: []
    });

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
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };
    const setURLPhoto = (url: string): void => {
        setFormData({ ...formData, photo: url });
    }
    const { data, isError, isLoading } = useQuery({
        queryKey: ["eventWaitID", id],
        queryFn: async () => {
            return await eventWaitGetOneAPI({ id });
        },

    });
    const mutation = useMutation(
        {
            mutationFn: async () => {
                return eventWaitPutAPI(formData, id);
            },
            onSuccess: () => {
                router.push(`/${locale}/admin/events`)
            }
        }
    );
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
                uzTarget: data.data.eventsWait.translations.uz.target,
                ruTarget: data.data.eventsWait.translations.ru.target,
                enTarget: data.data.eventsWait.translations.en.target,
                uzResult: data.data.eventsWait.translations.uz.result,
                ruResult: data.data.eventsWait.translations.ru.result,
                enResult: data.data.eventsWait.translations.en.result,

            });
            setPartners(data.data.eventsWait.partners)
        }
    }, [data]);

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!formData.uzName || !formData.ruName || !formData.enName) {
            toast.warning("Title");
            return;
        }

        if (!formData.uzForm || !formData.ruForm || !formData.enForm) {
            toast.warning("Content");
            return;
        }

        setFormData({ ...formData, partners: partners })
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

            {/* Target */}
            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div>
                    <label htmlFor="uzTarget" className="block mb-2 text-sm font-medium text-gray-900">Tadbir maqsadi UZ</label>
                    <input
                        type="text"
                        name="uzTarget"
                        id="uzTarget"
                        value={formData.uzTarget}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter target . . ."
                    />
                </div>
                <div>
                    <label htmlFor="ruTarget" className="block mb-2 text-sm font-medium text-gray-900">Tadbir maqsadi RU</label>
                    <input
                        type="text"
                        name="ruTarget"
                        id="ruTarget"
                        value={formData.ruTarget}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter target . . ."
                    />
                </div>
                <div>
                    <label htmlFor="enTarget" className="block mb-2 text-sm font-medium text-gray-900">Tadbir maqsadi EN</label>
                    <input
                        type="text"
                        name="enTarget"
                        id="enTarget"
                        value={formData.enTarget}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter target . . ."
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
                {!mutation.isPending ? "Update" : "Loading . . ."}
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

export default EditWait;