import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image"
import Link from "next/link";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const locale = useLocale();

    const data_links = [
        {
            slug: "/news",
            title: "Yangiliklar"
        },
        {
            slug: "/projects",
            title: "Loyihalarimiz"
        },
        {
            slug: "/members",
            title: "A'zolar"
        },
        {
            slug: "/events",
            title: "Tadbirlar"
        },

        {
            slug: "/partners",
            title: "Hamkorlar"
        },
        {
            slug: "/initiators",
            title: "Tashabbuskorlar"
        },
        {
            slug: "/services",
            title: "Xizmatlar"
        },
        {
            slug: "/center_mind",
            title: "Aql Markazi"
        },
        {
            slug: "/ilmiy_etika",
            title: "Ilmiy etika"
        },
        {
            slug: "/about",
            title: "Biz haqimizda"
        },
    ]
    return (
        <div className=" bg-slate-50">
            <div className="md:h-32 border overflow-hidden relative">
                <Image
                    src="https://ngoshivam.org/images/news-event.jpg"
                    className="object-cover "
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                />
                <h1 className=" absolute md:top-[38%] top-[25%] md:left-[45%] left-[38%] md:text-4xl text-2xl text-white font-semibold drop-shadow-2xl">Innovation</h1>
            </div>

            <div className="lg:px-15 md:px-10 px-0 py-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                    <div className="col-span-4">
                        {/* <div className="flex items-center mb-4 ml-1">
                            <Link href={"/"}>
                                <Button variant={"link"} className="text-base">Bosh sahifa</Button>
                            </Link>
                            <ChevronRightIcon size={15} />
                            <div className="text-base text-gray-400 px-2">Yangiliklar</div>
                        </div> */}
                        {children}
                    </div>
                    <div className="hidden sm:flex">
                        <div className="p-4 bg-white shadow *:cursor-pointer sticky top-24 h-[70vh]">
                            {data_links.map((item, i) => (
                                <Link key={i} href={`/${locale}/main_all${item.slug}`}>
                                    <div className="p-1.5 border border-white hover:bg-slate-200 duration-300 hover:border-gray-200">
                                        <h1 className=" text-xl tracking-wide">{item.title}</h1>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;