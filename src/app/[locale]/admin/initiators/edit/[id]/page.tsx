"use client"
import { initiatorGetOneAPI, initiatorPutAPI, questionGetOneAPI, questionPutAPI } from "@/api/AdminRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import UploadImage from "@/utils/UploadImage";
import Image from "next/image";
import { ImageIcon, XIcon } from "lucide-react";
import Loading from "@/components/Core/Loading";
const UpdateInitiators = ({ params }: { params: any }) => {
    const { id } = params;
    const router = useRouter();
    const locale = useLocale();
    const [isPicker, setIsPicker] = useState(false);
    const [formData, setFormData] = useState({
        photo: "",
        firstname: "",
        lastname: "",
        birthday: "",
        birthplace: "",
        addressResidential: "",
        workplace: ""
    });

    const { data, isError, isLoading } = useQuery({
        queryKey: ["initiatorsID", id],
        queryFn: async () => {
            return await initiatorGetOneAPI({ id });
        },

    });
    const mutation = useMutation(
        {
            mutationFn: async () => {
                return initiatorPutAPI(formData, id);
            },
            onSuccess: () => {
                router.push(`/${locale}/admin/initiators`)
            }
        }
    );
    const setURLPhoto = (url: string) => {
        setFormData({ ...formData, photo: url });
    }
    useEffect(() => {
        if (data) {
            setFormData({
                photo: data.data.initiators.photo,
                firstname: data.data.initiators.firstname,
                lastname: data.data.initiators.lastname,
                birthday: data.data.initiators.birthday,
                birthplace: data.data.initiators.birthplace,
                addressResidential: data.data.initiators.addressResidential,
                workplace: data.data.initiators.workplace,
            });
        }
    }, [data]);

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;



    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!formData.firstname || !formData.lastname || !formData.birthday) {
            toast.warning("Enter inputs");
            return;
        }

        mutation.mutate();
    };

    return (
        <div className="shadow p-4 bg-white rounded-xl">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Photo</label>
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
                    <label htmlFor="birthplace" className="block mb-2 text-sm font-medium text-gray-900">{"Tug'ilgan joyi"}</label>
                    <input
                        type="text"
                        name="birthplace"
                        id="birthplace"
                        value={formData.birthplace}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter birthplace . . ."
                    />
                </div>
            </div>

            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div>
                    <label htmlFor="addressResidential" className="block mb-2 text-sm font-medium text-gray-900">Yashash joyi</label>
                    <input
                        type="text"
                        name="addressResidential"
                        id="addressResidential"
                        value={formData.addressResidential}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter address . . ."
                    />
                </div>
                <div>
                    <label htmlFor="workplace" className="block mb-2 text-sm font-medium text-gray-900">Ish joyi</label>
                    <input
                        type="text"
                        name="workplace"
                        id="workplace"
                        value={formData.workplace}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter workplace . . ."
                    />
                </div>
                <div>
                    <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-900">{"Tug'ilgan sana"}</label>
                    <input
                        type="date"
                        name="birthday"
                        id="birthday"
                        value={formData.birthday}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter birthday . . ."
                    />
                </div>
            </div>

            <button onClick={handleSubmit} disabled={mutation.isPending} className="text-white bg-maincolor hover:scale-95 duration-300 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{!mutation.isPending ? "Submit" : "Loading . . ."}</button>
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

export default UpdateInitiators;