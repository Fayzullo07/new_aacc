"use client"
import Container from "./Core/Container";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { messagePostAPI } from "@/api/AdminRequest";
import { telegramPostAPI } from "@/api/TelegramRequest";
import { checkPhoneNumber } from "@/functions/NecessaryFunctions";
import { MapPinIcon, PhoneCallIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Contact = () => {
    const t = useTranslations("Contact");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        desc: "",
        role: "service",
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        if (name === "name" && value.length > 50) {
            return;
        }
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

        if (name === "desc" && value.length > 200) {
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const mutationBot = useMutation(
        {
            mutationFn: async () => {
                return telegramPostAPI({
                    chat_id: -1002020152748,
                    text: "Bog'lanish uchun xabar!\nXizmatlardan foydalish uchun ham!\n\nIsm: " + formData.name + "\nTel: " + formData.phone + "\nIzoh: " + formData.desc
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

        if (checkPhoneNumber(formData.phone)) {
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
        <div id="contact" className="pb-5 sm:pb-10">
            <Container>
                <div className="flex justify-between items-center py-5 md:py-10" >
                    <h2 className="text-2xl font-semibold" data-aos="fade-up" data-aos-delay="100" data-aos-duration="100">{t("hero_title")}</h2>
                </div>
                <div id="map" className="relative h-auto overflow-hidden bg-cover bg-[50%] bg-no-repeat">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
                        width="100%" height="480" loading="lazy"></iframe>
                </div>
                <div className="px-4 md:px-12">
                    <div
                        className="block rounded-lg bg-white px-6 py-12 shadow-xl md:py-16 md:px-5 mt-[50px] backdrop-blur-[30px] border border-gray-300">
                        <div className="flex flex-wrap">
                            <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                                <form onSubmit={handleSubmit}>
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
                                    <div className="mb-5">
                                        <label htmlFor="desc" className="mb-3 block text-base font-medium text-[#07074D]">
                                            {t("desc")}
                                        </label>
                                        <textarea name="desc" id="desc" placeholder={t("desc") + "..."}
                                            value={formData.desc}
                                            onChange={handleInputChange}
                                            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={mutation.isPending}
                                        className="mb-6 w-full rounded bg-maincolor text-white px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal   lg:mb-0">
                                        {!mutation.isPending ? t("button") : "Loaning..."}
                                    </button>
                                </form>
                            </div>
                            <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                                <div className="flex flex-wrap">
                                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                                        <div className="flex items-start">
                                            <div className="shrink-0">
                                                <div className="inline-block rounded-md bg-sky-200 p-3 text-primary">
                                                    <PhoneCallIcon />
                                                </div>
                                            </div>
                                            <div className="ml-4 grow">
                                                <p className="font-semibold text-lg">
                                                    {t("contact_number")}
                                                </p>
                                                <a href="tel:+998772807060" className="text-sm text-neutral-500">
                                                    +998 77 280 70 60
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                                        <div className="flex items-start">
                                            <div className="srink-0">
                                                <div className="inline-block rounded-md bg-sky-200 p-3 text-primary">
                                                    <MapPinIcon />
                                                </div>
                                            </div>
                                            <div className="ml-4 grow">
                                                <p className="font-semibold text-lg">
                                                    {t("contact_address")}
                                                </p>
                                                <p className="text-sm text-neutral-500">
                                                    {"Toshkent shahri, Yakkasaroy tumani, Shota Rustaveli koʻchasi, 45-uy"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mx-auto h-auto overflow-hidden rounded-md sm:rounded-xl hidden sm:flex">
                                        <Image
                                            src={"/contact.png"}
                                            width={150}
                                            height={0}
                                            // className="transition hover:scale-110 duration-300 shadow-xl"
                                            sizes="100vw"
                                            style={{ width: '100%', height: 'auto' }} // optional
                                            alt="Image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Contact;