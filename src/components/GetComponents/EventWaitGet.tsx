"use client"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Loading from "../Core/Loading";
import { eventWaitPatchAPI, eventsWaitdGetAPI } from "@/api/AdminRequest";
import moment from "moment";
import Modal from "../Core/Modal";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "react-toastify";
import { telegramPostAPI } from "@/api/TelegramRequest";
import { checkPhoneNumber } from "@/functions/NecessaryFunctions";
import { usePathname } from "next/navigation";

const EventWaitGet = ({ search = "", amount = 0 }) => {
    const pathname = usePathname();
    const [formData, setFormData] = useState({
        name: "",
        phone: "+998",
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
                    chat_id: -1002094967596,
                    text: "Service\nIsm: " + formData.name + "\nTel: " + formData.phone
                });
            },
            onSuccess: () => {
                setFormData({ ...formData, name: "", phone: "", })
            }
        }
    );

    const mutation = useMutation(
        {
            mutationFn: async (id: any) => {
                return eventWaitPatchAPI(formData, id);
            },
            onSuccess: () => {
                toast.success("Yuborildi");
                document.getElementById('closeDialog')?.click();
                mutationBot.mutate();
                // setFormData({ ...formData, name: "", phone: "", desc: "" })
            }
        }
    );

    const handleSubmit = async (id: any) => {
        if (!formData.name) {
            toast.warning("Name")
            return
        }

        if (checkPhoneNumber(formData.phone)) {
            toast.warning("Phone")
            return
        }


        mutation.mutate(id);
    };
    const locale = useLocale();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["eventWait"],
        queryFn: async () => {
            return await eventsWaitdGetAPI({ search });
        }
    });

    const dataItem = useMemo(() => {
        if (data && data.data && data.data.eventsWait) {
            if (amount !== 0) {
                return data.data.eventsWait.slice(0, amount);
            } else {
                return data.data.eventsWait;
            }
        }
        return [];
    }, [data, amount]);

    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <>
            {dataItem.map((item: any, i: number) => (
                <div key={i} data-aos="fade-up" data-aos-delay={(i + 1) * 100} data-aos-duration={(i + 1) * 100}
                    className="bg-white relative cursor-pointer hover:shadow-2xl transition duration-300 rounded overflow-hidden shadow-lg">
                    <Link href={`/${locale}/main_all/events/wait/${item._id}`}>
                        <div className="py-4 px-8">
                            <h4 className="text-xl tracking-wide mb-3 font-semibold text-maincolor capitalize">{item.translations[`${locale}`].name}</h4>
                            <p className="text-sm">Tadbirdan kutilayotgan natigalar</p>
                            <p className="mb-2 ml-2 text-sm text-gray-500">
                                {item.translations[`${locale}`].result}
                            </p>
                            <p className="text-sm">Tadbir maqsadi</p>
                            <p className="mb-2 ml-2 text-sm text-gray-500">
                                {item.translations[`${locale}`].target}
                            </p>
                            <p className="text-sm">Tadbir shakli</p>
                            <p className="mb-2 ml-2 text-sm text-gray-500">
                                {item.translations[`${locale}`].form}
                                {"Lorem Ipsum is simply dummy text of the printing and typesetting since the 1500s"}
                            </p>
                            <p className="text-sm">{"Tadbir bo'lib o'tadigan joyi"}</p>
                            <p className="mb-2 ml-2 text-sm text-gray-500">
                                {item.place}
                            </p>
                            <div className=" overflow-hidden">
                                {/* <ImagesCarusel images={images} /> */}
                                <Image
                                    src={item.photo}
                                    width={0}
                                    height={0}
                                    className="transition hover:scale-110 duration-300 shadow-xl"
                                    sizes="100vw"
                                    style={{ width: '100%', height: 'auto' }} // optional
                                    alt="Image"
                                />
                            </div>

                            <hr className="mt-4" />
                            <p className="text-sm">Hamkorlar</p>
                            <div>
                                {item.partners.map((item: any, i: number) => (
                                    <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700 m-1">{item}</span>
                                ))}
                            </div>
                            <span className="text-xs text-green-500">{moment(item.date).format("L")} {moment(item.date).format("LT")}</span>

                        </div>
                    </Link>
                    {pathname.split("/")[4] != "wait" && (
                        <Modal button={<button className="absolute bottom-0 right-0 inline-flex justify-center border border-maincolor hover:border-white hover:text-white rounded-tl-3xl hover:bg-maincolor px-3 py-1 text-base font-medium hover:px-4 hover:py-2 duration-300">{"Ro'yxatdan o'tish"}</button>}>
                            <ScrollArea className="h-[60vh] py-4">

                                <div>
                                    <div className="mb-5">
                                        <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Ism familiya
                                        </label>
                                        <input type="text" name="name" id="name" placeholder="Ism familiya"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Telefon raqamingiz
                                        </label>
                                        <input type="tel" name="phone" id="phone" placeholder="+998 XX XXX XX XX"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>


                                    <button
                                        onClick={() => handleSubmit(item._id)}
                                        type="submit"
                                        disabled={mutation.isPending}
                                        className="mb-6 w-full rounded bg-maincolor text-white px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal   lg:mb-0">
                                        {!mutation.isPending ? "Yuborish" : "Loaning..."}
                                    </button>
                                </div>
                            </ScrollArea>
                        </Modal>
                    )}
                </div>
            ))}
        </>
    )
}

export default EventWaitGet;