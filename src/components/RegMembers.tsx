"use client"
import { useState } from "react";
import Container from "./Core/Container"
import Modal from "./Core/Modal";
import { useMutation } from "@tanstack/react-query";
import { messagePostAPI } from "@/api/AdminRequest";
import { toast } from "react-toastify";
import { telegramPostAPI } from "@/api/TelegramRequest";
import { useTranslations } from "next-intl";

const RegMembers = () => {
    const t = useTranslations("Contact");
    const m = useTranslations("MemberReg");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        desc: "",
        role: "member",
        isLegal: true
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
                    text: `A'zo bo'lish uchun ariza!\n${formData.isLegal ? "Yuridik " : "Jismoniy "}shaxs bo'lib.\n\nIsm: ` + formData.name + "\nTel: " + formData.phone + "\nIzoh: " + formData.desc
                });
            },
            onSuccess: () => {
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
                toast.success(t("message"));
                document.getElementById('closeDialog')?.click();
                mutationBot.mutate();
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
        <div>
            <Container >
                <div className="p-1 border-[3px] border-maincolor rounded-2xl sm:rounded-full bg-white">

                    <div className="py-2 px-1 sm:px-6 sm:py-6 border-[3px] bg-white border-maincolor rounded-2xl sm:rounded-full bg-gradient-to-r from-maincolor from-10% to-green-500 to-90%">

                        <div className="flex items-center justify-between flex-wrap">
                            <div className="grid gap-2 text-center sm:text-start">
                                <h1 className="text-xl text-white font-semibold">{m("hero_title")}</h1>
                                <p className=" text-sm md:text-base text-white">{m("hero_desc")}</p>
                            </div>
                            <div className="rounded-full p-1 border border-maincolor">
                                <div className="flex items-center rounded-full bg-white ">
                                    <input value={formData.phone}
                                        onChange={handleInputChange} name="phone" type="tel" className="px-2 sm:px-4 py-2 focus:outline-none bg-transparent text-lg w-full rounded-full" placeholder="+998 XX XXX XX XX" />
                                    <Modal button={<button className="px-4 sm:px-5 py-1 sm:py-2 text-lg text-white bg-maincolor rounded-full hover:scale-105 duration-300 m-1 tracking-wide">{t("button")}</button>}>
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


                                            <div className="mb-5">
                                                <label className="mb-3 block text-base font-medium text-[#07074D]">
                                                    {m("is_legal_question")}
                                                </label>
                                                <div className="flex items-center space-x-6">
                                                    <div className="flex items-center">
                                                        <input type="radio" name="radio1" id="radioButton1" className="h-5 w-5"
                                                            checked={formData.isLegal === true}
                                                            onChange={() => setFormData({ ...formData, isLegal: !formData.isLegal })}
                                                        />
                                                        <label htmlFor="radioButton1" className="pl-3 text-base font-medium text-[#07074D]">
                                                            {m("legal")}
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input type="radio" name="radio1" id="radioButton2" className="h-5 w-5"
                                                            checked={formData.isLegal === false}
                                                            onChange={() => setFormData({ ...formData, isLegal: !formData.isLegal })}
                                                        />
                                                        <label htmlFor="radioButton2" className="pl-3 text-base font-medium text-[#07074D]">
                                                            {m("physical")}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <button
                                                    disabled={mutation.isPending}
                                                    className="hover:shadow-form rounded-md bg-maincolor py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                                    {!mutation.isPending ? t("button") : "Loading. . ."}
                                                </button>
                                            </div>
                                        </form>

                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default RegMembers;