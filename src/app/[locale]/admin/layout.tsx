"use client"
import { AppWindowIcon, BellIcon, CalendarIcon, FoldersIcon, Handshake, HomeIcon, MessageCircleQuestionIcon, RssIcon, UserRoundCogIcon, UsersIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const locale = useLocale();
    // const session = await auth();
    // if (!session) redirect(`/uz/login`);

    const data_links = [
        {
            slug: "/main/hero",
            title: "Main",
            icon: <RssIcon />
        },
        {
            slug: "/news",
            title: "Yangiliklar",
            icon: <RssIcon />
        },
        {
            slug: "/projects",
            title: "Loyihalarimiz",
            icon: <FoldersIcon />
        },
        {
            slug: "/members",
            title: "A'zolar",
            icon: <UsersIcon />
        },
        {
            slug: "/events",
            title: "Tadbirlar",
            icon: <CalendarIcon />
        },

        {
            slug: "/partners",
            title: "Hamkorlar",
            icon: <Handshake />
        },
        {
            slug: "/initiators",
            title: "Tashabbuskorlar",
            icon: <AppWindowIcon />
        },
        {
            slug: "/services",
            title: "Xizmatlar",
            icon: <UserRoundCogIcon />
        },
        {
            slug: "/question",
            title: "Questions",
            icon: <MessageCircleQuestionIcon />
        },
    ]

    return (
        <div>
            <div className='flex bg-gray-100'>
                <aside className='h-screen bg-white fixed lg:sticky top-0 border-r-2 p-4  whitespace-nowrap z-10 closed shadow-xl '>

                    <ul className='text-gray-500 font-semibold flex flex-col gap-2'>
                        <li>
                            <Link href={'/'} className='flex items-center rounded px-3 py-2 hover:text-black hover:bg-gray-50  transition-all'>
                                <HomeIcon className="mr-3" />
                                <span className='flex-grow'>Bosh sahifa</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${locale}/admin/messages`} className='flex rounded px-3 py-2 hover:text-black hover:bg-gray-50 transition-all'>
                                <BellIcon className="mr-3" />
                                <span className='flex items-center gap-3'>
                                    Habarlar
                                    {/* <span className='bg-red-500 text-white leading-none px-2 py-1 rounded-full text-xs'>2</span> */}
                                </span>
                            </Link>
                        </li>
                        <li className='border my-1'></li>
                        {data_links.map((item, i) => (
                            <li key={i}>
                                <Link href={`/${locale}/admin${item.slug}`} className='flex rounded px-3 py-2 hover:text-black hover:bg-gray-50 transition-all'>
                                    <span className='flex items-center gap-3'>
                                        {item.icon}
                                        {item.title}
                                        {/* <span className='bg-red-500 text-white leading-none px-2 py-1 rounded-full text-xs'>99+</span> */}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className='w-full'>
                    <header className=' flex items-center justify-between px-6 lg:px-8 py-4 shadow bg-white sticky top-0 z-10'>

                        <h1 className='text-xl font-semibold flex items-center'>
                            <button className='btn-open-menu inline-block lg:hidden mr-6'>
                                <i data-feather='menu'></i>
                            </button>
                            <span>My Admin</span>
                        </h1>
                        <button onClick={() => {
                            signOut();

                        }} className={` text-gray-800 bg-indigo-100 hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm`}>
                            Logout
                        </button>

                    </header>
                    <main className='px-6 py-8 lg:px-8 bg-gray-100 flex flex-col gap-6 '>
                        {children}
                    </main>
                </div>
            </div>

        </div>
    );
}
