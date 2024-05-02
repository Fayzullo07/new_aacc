"use client"
import { usePathname } from "next/navigation";
import Container from "./Core/Container";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { MailCheck, MailCheckIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

const Footer = () => {
    const pathname = usePathname();

    const t = useTranslations("Footer");
    const data_services = [
        "Ekspertiza",
        "Texnik koʻmak",
        "Reyting",
        "Slib.uz",
        "E-taqriz",
        "ROI",
        "Anjumanlar.uz",
        "Veb sayt yaratish",
        "Tarjima",
        "Inson resurslari",
        "ScienceGate"
    ]
    return (
        <div className={`${pathname.split("/")[2] == "admin" ? "hidden" : ""} bg-gray-900`}>
            <Container>
                {/* <!-- Footer --> */}
                <footer className="">
                    <div className="max-w-screen-xl px-4 pt-10 pb-6 mx-auto sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                            <div className="lg:col-span-2">
                                <div>
                                    <Link href={"/"} className="flex  items-center gap-2 ">
                                        <div className=" h-8 w-0.5 bg-green-400">
                                        </div>
                                        <div>
                                            <span className="text-blue-500 font-semibold text-lg">{t("hero_title")}</span>
                                        </div>

                                    </Link>
                                </div>

                                <p
                                    className="text-justify mt-6 leading-relaxed text-lg text-gray-400 sm:text-left"
                                >
                                    {t("hero_desc")}
                                </p>


                            </div>

                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-3 text-center md:grid-cols-2">


                                <div className="text-left">
                                    <p className="text-lg font-medium text-white">Our Services</p>

                                    <div className="mt-2">
                                        <ul className=" text-sm">
                                            {data_services.map((item, i) => (

                                                <li key={i}>
                                                    <div className="mb-1 text-white transition hover:text-white/75">
                                                        {item}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="text-left">
                                    <p className="text-lg font-medium text-white">Contact Us</p>

                                    <ul className="mt-4 space-y-4 text-sm">
                                        <li>
                                            <Link
                                                className="flex items-center justify-start gap-2"
                                                href="/"
                                            >
                                                <MailIcon color="white" />

                                                <span className="text-white transition group-hover:text-white/75">
                                                    daminov.asror86@gmail.com
                                                </span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                className="flex items-center justify-start gap-2"
                                                href="/"
                                            >
                                                <PhoneIcon color="white" />

                                                <span className="text-white transition group-hover:text-white/75">
                                                    +998 77 280 70 60
                                                </span>
                                            </Link>
                                        </li>

                                        <li
                                            className="flex items-center gap-2 sm:justify-start"
                                        >
                                            <MapPinIcon color="white" />

                                            <address className="-mt-0.5 not-italic text-white">
                                                {"Toshkent shahri, Yakkasaroy tumani, Shota Rustaveli koʻchasi, 45-uy"}
                                            </address>
                                        </li>
                                    </ul>
                                    <ul className="hidden md:flex justify-center gap-6 mt-8 md:gap-8 sm:justify-start">
                                        <li>
                                            <Image
                                                src="/socials/facebook.png"
                                                width={30}
                                                height={30}
                                                className=" hover:scale-125 duration-300 cursor-pointer"
                                                alt="Image"
                                            />
                                        </li>

                                        <li>
                                            <Image
                                                src="/socials/instagram.png"
                                                width={30}
                                                height={30}
                                                className=" hover:scale-125 duration-300 cursor-pointer"
                                                alt="Image"
                                            />
                                        </li>

                                        <Link href={"https://t.me/Ilmbukuch"}>
                                            <Image
                                                src="/socials/telegram.png"
                                                width={30}
                                                height={30}
                                                className=" hover:scale-125 duration-300 cursor-pointer"
                                                alt="Image"
                                            />
                                        </Link>

                                        <li>
                                            <Image
                                                src="/socials/whatsap.png"
                                                width={30}
                                                height={30}
                                                className=" hover:scale-125 duration-300 cursor-pointer"
                                                alt="Image"
                                            />
                                        </li>

                                        <li>
                                            <Image
                                                src="/socials/youtube.png"
                                                width={30}
                                                height={30}
                                                className=" hover:scale-125 duration-300 cursor-pointer"
                                                alt="Image"
                                            />
                                        </li>
                                    </ul>
                                </div>

                            </div>
                            <div >

                                <ul className=" md:hidden flex items-center justify-evenly gap-6 mt-8 ">
                                    <li>
                                        <Image
                                            src="/socials/facebook.png"
                                            width={30}
                                            height={30}
                                            className=" hover:scale-125 duration-300 cursor-pointer"
                                            alt="Image"
                                        />
                                    </li>

                                    <li>
                                        <Image
                                            src="/socials/instagram.png"
                                            width={30}
                                            height={30}
                                            className=" hover:scale-125 duration-300 cursor-pointer"
                                            alt="Image"
                                        />
                                    </li>

                                    <Link href={"https://t.me/Ilmbukuch"}>
                                        <Image
                                            src="/socials/telegram.png"
                                            width={30}
                                            height={30}
                                            className=" hover:scale-125 duration-300 cursor-pointer"
                                            alt="Image"
                                        />
                                    </Link>

                                    <li>
                                        <Image
                                            src="/socials/whatsap.png"
                                            width={30}
                                            height={30}
                                            className=" hover:scale-125 duration-300 cursor-pointer"
                                            alt="Image"
                                        />
                                    </li>

                                    <li>
                                        <Image
                                            src="/socials/youtube.png"
                                            width={30}
                                            height={30}
                                            className=" hover:scale-125 duration-300 cursor-pointer"
                                            alt="Image"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>


                    </div>
                </footer>

            </Container>

        </div>
    )
}

export default Footer;