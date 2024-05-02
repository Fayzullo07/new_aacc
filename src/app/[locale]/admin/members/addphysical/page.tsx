"use client"
import { memberPostAPI } from "@/api/AdminRequest";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import TipTap from "@/components/Core/TipTap";
import Image from "next/image";
import { ImageIcon, XIcon } from "lucide-react";
import UploadImage from "@/utils/UploadImage";
import { toast } from "react-toastify";

const AddMemberPhysical = () => {
    const router = useRouter();
    const locale = useLocale();
    const [isPicker, setIsPicker] = useState(false);
    const [formData, setFormData] = useState({
        photo: "",
        firstname: "",
        lastname: "",
        thirdname: "",
        scienceID: "",
        uzWorkAddress: "",
        ruWorkAddress: "",
        enWorkAddress: "",
        uzWorkPostion: "",
        ruWorkPostion: "",
        enWorkPostion: "",
        uzActivity: "",
        ruActivity: "",
        enActivity: "",
        uzDesc: "",
        ruDesc: "",
        enDesc: "",
        isLegal: false
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

    const setURLPhoto = (url: string) => {
        setFormData({ ...formData, photo: url });
    }


    const handleSubmit = (e: any) => {
        e.preventDefault();

        // if (!formData.firstname || !formData.lastname || !formData.thirdname) {
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

            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900"> Photo user</label>
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
                    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900">Ism</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter firstname . . ."
                    />
                </div>
                <div>
                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900">Familiya</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter lastname . . ."
                    />
                </div>
                <div>
                    <label htmlFor="thirdname" className="block mb-2 text-sm font-medium text-gray-900">{"O'chestva"}</label>
                    <input
                        type="text"
                        name="thirdname"
                        id="thirdname"
                        value={formData.thirdname}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter thirdname . . ."
                    />
                </div>
            </div>

            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div>
                    <label htmlFor="uzWorkAddress" className="block mb-2 text-sm font-medium text-gray-900">Address UZ</label>
                    <input
                        type="text"
                        name="uzWorkAddress"
                        id="uzWorkAddress"
                        value={formData.uzWorkAddress}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter Address . . ."
                    />
                </div>
                <div>
                    <label htmlFor="ruWorkAddress" className="block mb-2 text-sm font-medium text-gray-900">Address RU</label>
                    <input
                        type="text"
                        name="ruWorkAddress"
                        id="ruWorkAddress"
                        value={formData.ruWorkAddress}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter Address . . ."
                    />
                </div>
                <div>
                    <label htmlFor="enWorkAddress" className="block mb-2 text-sm font-medium text-gray-900">Address EN</label>
                    <input
                        type="text"
                        name="enWorkAddress"
                        id="enWorkAddress"
                        value={formData.enWorkAddress}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter Address . . ."
                    />
                </div>
            </div>

            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div>
                    <label htmlFor="uzWorkPostion" className="block mb-2 text-sm font-medium text-gray-900">Lavozimi UZ</label>
                    <input
                        type="text"
                        name="uzWorkPostion"
                        id="uzWorkPostion"
                        value={formData.uzWorkPostion}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter position . . ."
                    />
                </div>
                <div>
                    <label htmlFor="ruWorkPostion" className="block mb-2 text-sm font-medium text-gray-900">Lavozimi RU</label>
                    <input
                        type="text"
                        name="ruWorkPostion"
                        id="ruWorkPostion"
                        value={formData.ruWorkPostion}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter position . . ."
                    />
                </div>
                <div>
                    <label htmlFor="enWorkPostion" className="block mb-2 text-sm font-medium text-gray-900">Lavozimi EN</label>
                    <input
                        type="text"
                        name="enWorkPostion"
                        id="enWorkPostion"
                        value={formData.enWorkPostion}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter position . . ."
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
                <div>
                    <label htmlFor="scienceID" className="block mb-2 text-sm font-medium text-gray-900">Science ID</label>
                    <input
                        type="text"
                        name="scienceID"
                        id="scienceID"
                        value={formData.scienceID}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter scienceID . . ."
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

export default AddMemberPhysical;