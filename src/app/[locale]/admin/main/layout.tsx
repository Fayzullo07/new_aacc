import { AppWindowIcon, ArchiveIcon, BellIcon, BriefcaseIcon, CalendarIcon, FileTextIcon, FoldersIcon, Handshake, HomeIcon, MessageCircleIcon, RssIcon, UserIcon, UserRoundCogIcon, UsersIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const locale = useLocale();
    const data_links = [
        {
            slug: "/hero",
            title: "Hero",
        },
        {
            slug: "/about",
            title: "About",
        },
        {
            slug: "/center_mind",
            title: "Aql makazi",
        },
        {
            slug: "/ilmiy_etika",
            title: "Ilmiy Etika",
        },
    ]

    return (
        <div className='w-full'>
            <header className=''>
                <ul className='text-gray-500 font-semibold flex gap-2'>

                    {data_links.map((item, i) => (
                        <li key={i}>
                            <Link href={`/${locale}/admin/main${item.slug}`} className='flex rounded px-3 py-2 hover:text-black hover:bg-gray-50 transition-all'>
                                <span className='flex items-center gap-3'>
                                    {item.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

            </header>
            <main className='py-8 bg-gray-100  '>
                {children}
            </main>
        </div>
    );
}
