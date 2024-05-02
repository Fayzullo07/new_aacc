"use client"
import { centerMindGetOneAPI, centerMindPatchAPI, messagePostAPI } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";

import { UserCircle2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { telegramPostAPI } from "@/api/TelegramRequest";
import Modal from "@/components/Core/Modal";

const CenterOfMind = () => {
    const locale = useLocale();
    const t = useTranslations("Contact");
    const [formData, setFormData] = useState({
        name: "",
        desc: "",
    });

    const [formDataM, setFormDataM] = useState({
        name: "",
        phone: "",
        desc: "",
        role: "center_mind",
    });

    const handleInputChangeM = (e: any) => {
        const { name, value } = e.target;
        if (name === "phone") {
            if (value.length > 13) {
                return;
            } else {
                e.target.value = value.slice(0, 13);
                if (typeof value === "string") {
                    // Raqam matn (string) turida kiritilgan
                    e.target.value = value.replace(/[^0-9+]|(?<=^[\s\S]*?\+)[+]+/g, "");
                }
            }
        }
        setFormDataM({ ...formDataM, [name]: value });
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const { data, isError, isLoading } = useQuery({
        queryKey: ["center_mind"],
        queryFn: async () => {
            return await centerMindGetOneAPI();
        },
        refetchInterval: 1000

    });

    const mutation = useMutation(
        {
            mutationFn: async (id: any) => {
                return centerMindPatchAPI(formData, id);
            },
            onSuccess: () => {
                toast.success("Yuborildi");
                setFormData({ ...formData, name: "", desc: "" })
            }
        }
    );

    const mutationBot = useMutation(
        {
            mutationFn: async () => {
                return telegramPostAPI({
                    chat_id: -1002020152748,
                    text: "Aql Markazi uchun xabar!\n\nIsm: " + formDataM.name + "\nTel: " + formDataM.phone + "\nIzoh: " + formDataM.desc
                });
            },
            onSuccess: () => {
                setFormDataM({ ...formDataM, name: "", phone: "", desc: "" })
            }
        }
    );

    const mutationMessage = useMutation(
        {
            mutationFn: async () => {
                return messagePostAPI(formDataM);
            },
            onSuccess: () => {
                toast.success("Ariza yuborildi");
                document.getElementById('closeDialog')?.click();
                mutationBot.mutate();
                // setFormData({ ...formData, name: "", phone: "", desc: "" })
            }
        }
    );

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!formDataM.name) {
            toast.warning("Name")
            return
        }

        if (!formDataM.phone) {
            toast.warning("Phone")
            return
        }

        if (!formDataM.desc) {
            toast.warning("Desc")
            return
        }
        mutationMessage.mutate();
    };
    return (
        <div className="bg-white border-slate-200 shadow shadow-slate-950/5 rounded overflow-hidden" >
            {data?.data.center_mind && (
                <div className=" overflow-hidden ">
                    <div className="p-4 text-gray-600 text-lg">
                        <div className=" flex justify-between items-center">
                            <h1 className=" font-semibold text-maincolor">{data.data.center_mind.translations[`${locale}`].title}</h1>
                            <Modal button={<button
                                className="mb-6  rounded bg-maincolor text-white px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal   lg:mb-0">
                                {"A'zolik uchun ariza qoldirish"}
                            </button>}>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                                        <div className="mb-5">
                                            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                                {t("name")}
                                            </label>
                                            <input type="text" name="name" id="name" placeholder={t("name")}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                value={formDataM.name}
                                                onChange={handleInputChangeM}
                                                required
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                                                {t("phone")}
                                            </label>
                                            <input type="tel" name="phone" id="phone" placeholder="+998 XX XXX XX XX"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                value={formDataM.phone}
                                                onChange={handleInputChangeM}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="desc" className="mb-3 block text-base font-medium text-[#07074D]">
                                            {t("desc")}
                                        </label>
                                        <textarea name="desc" id="desc" placeholder={t("desc") + "..."}
                                            value={formDataM.desc}
                                            onChange={handleInputChangeM}
                                            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required />
                                    </div>

                                    <div>
                                        <button
                                            disabled={mutationMessage.isPending}
                                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                            {!mutationMessage.isPending ? t("button") : "Loading. . ."}
                                        </button>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                        <div
                            className=" whitespace-pre-line tiptap"
                            style={{ whiteSpace: "pre-line" }}
                            dangerouslySetInnerHTML={{ __html: data.data.center_mind.translations[`${locale}`].desc }}
                        />

                    </div>
                    <div className="bg-gray-100 p-4">
                        <h2 className="text-lg font-bold mb-4">Comments</h2>
                        <div className="flex flex-col space-y-4">
                            {data.data.center_mind.comments.map((item: any, i: number) => (

                                <div key={i} className="bg-white p-4 rounded-lg shadow-md">
                                    <div className="flex justify-start items-center gap-4 border-b">
                                        <UserCircle2Icon size={50} strokeWidth={1} />
                                        <div>
                                            <h3 className="text-lg font-bold text-maincolor">{item.name}</h3>
                                            <p className="text-gray-700 text-sm mb-2">{moment(item.createdAt).fromNow()}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700">{item.desc}
                                    </p>
                                </div>
                            ))}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-2">Add a comment</h3>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        name="name"
                                        className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name" type="text" placeholder="Enter your name" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="comment">
                                        Comment
                                    </label>
                                    <textarea
                                        value={formData.desc}
                                        onChange={handleInputChange}
                                        name="desc"
                                        className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="comment" rows={3} placeholder="Enter your comment"></textarea>
                                </div>
                                <button
                                    disabled={mutation.isPending}
                                    onClick={() => mutation.mutate(data.data.center_mind._id)}
                                    className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    {mutation.isPending ? "Loading..." : "Send"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default CenterOfMind;