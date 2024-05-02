"use client"
import Container from "./Core/Container"
import { ArrowUpIcon } from "lucide-react";
import { messagePostAPI } from "@/api/AdminRequest";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "./Core/Modal";
import { useTranslations } from "next-intl";
import { telegramPostAPI } from "@/api/TelegramRequest";

const PartnersApplication = () => {
    const t = useTranslations("Contact");
    const i = useTranslations("InitiatorReg");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        desc: "",
        role: "partner",
    });

    const handleInputChange = (e: any) => {
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
        setFormData({ ...formData, [name]: value });
    };

    const mutationBot = useMutation(
        {
            mutationFn: async () => {
                return telegramPostAPI({
                    chat_id: -1002020152748,
                    text: "Hamkorlik uchun xabar!\n\nIsm: " + formData.name + "\nTel: " + formData.phone + "\nIzoh: " + formData.desc
                });
            },
            onSuccess: () => {
                toast.success(t("message"));
                setFormData({ ...formData, name: "", phone: "", desc: "" })
            }
        }
    );
    const mutation = useMutation(
        {
            mutationFn: async () => {
                return messagePostAPI(formData);
            },
            onSuccess: () => {
                document.getElementById('closeDialog')?.click();
                mutationBot.mutate();
                // setFormData({ ...formData, name: "", phone: "", desc: "" })
            }
        }
    );

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!formData.name) {
            toast.warning(t("name"))
            return
        }

        if (!formData.phone) {
            toast.warning(t("phone"))
            return
        }

        if (!formData.desc) {
            toast.warning(t("desc"))
            return
        }
        mutation.mutate();
    };
    return (
        <div className="bg-maincolor relative">
            <Container>
                <div className="absolute inset-x-0 bottom-0">
                    <svg viewBox="0 0 224 12" fill="currentColor" className="w-full -mb-1 text-white" preserveAspectRatio="none">
                        <path
                            d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z">
                        </path>
                    </svg>
                </div>
                <div className="px-4 py-6 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                    <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
                        <h2 className="mb-6  text-xl text-center font-semibold tracking-whide text-white sm:text-3xl ">
                            {i("hero_title")}
                        </h2>

                        <div className="flex flex-wrap justify-center items-center  mb-4">
                            <input
                                placeholder="+998 XX XXX XX XX"
                                value={formData.phone}
                                onChange={handleInputChange}
                                name="phone"
                                required
                                type="tel"
                                className="h-10 px-4 mb-3 bg-white text-lg transition duration-200 border-2 rounded md:mr-2 md:mb-0 focus:outline-none focus:shadow-outline"
                            />

                            <Modal button={<button className=" inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-gray-200 transition duration-200 rounded shadow-md md:w-auto hover:text-deep-purple-900 bg-teal-accent-400 hover:bg-teal-accent-700 focus:shadow-outline focus:outline-none">{t("button")}</button>}>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                                        <div className="mb-5">
                                            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                                {t("name")}
                                            </label>
                                            <input type="text" name="name" id="name" placeholder={t("name")}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                                                {t("phone")}
                                            </label>
                                            <input type="tel" name="phone" id="phone" placeholder="+998 XX XXX XX XX"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="desc" className="mb-3 block text-base font-medium text-[#07074D]">
                                            {t("desc")}
                                        </label>
                                        <textarea name="desc" id="desc" placeholder={t("desc") + "..."}
                                            value={formData.desc}
                                            onChange={handleInputChange}
                                            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required />
                                    </div>

                                    <div>
                                        <button
                                            disabled={mutation.isPending}
                                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                            {!mutation.isPending ? t("button") : "Loading. . ."}
                                        </button>
                                    </div>
                                </form>


                            </Modal>
                        </div>
                        {/* <p className="max-w-md mb-6 text-xs tracking-wide text-indigo-100 sm:text-sm sm:mx-auto md:mb-10">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
                        </p> */}
                        <a href="#"
                            className="flex items-center justify-center w-10 h-10 mx-auto text-white duration-300 transform border border-gray-400 rounded-full  hover:shadow hover:scale-110">
                            <ArrowUpIcon />
                        </a>
                    </div>
                </div>

                {/* <div className="p-1 border-[3px] border-maincolor rounded-2xl bg-white">

                    <div className="py-2 px-1 sm:px-6 sm:py-6 border-[3px] bg-white border-maincolor rounded-2xl bg-gradient-to-r from-green-500 from-10% to-maincolor to-90%">

                        <div className="flex items-center justify-between flex-wrap">
                            <div className="grid gap-2 text-center sm:text-start">
                                <h1 className="text-3xl text-white font-semibold">{"Hankorlik uchun ariza"}</h1>
                                <p className=" text-lg text-white">{"Biz ning assatsiyaga hamkor bo'lish uchun ariza qoldiring"}</p>
                            </div>
                            <div className="rounded-full p-1 border border-maincolor">
                                <div className="flex items-center rounded-full bg-white ">
                                    <input type="tel" className="px-2 sm:px-4 py-2 focus:outline-none bg-transparent w-full" placeholder="+998 XX XXX XX XX" />
                                    <button className="px-2 sm:px-5 py-1 sm:py-2 text-lg text-white bg-maincolor rounded-full hover:scale-105 duration-300 m-1">Button</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </Container>
        </div>
    )
}

export default PartnersApplication;