"use client"
import Container from "./Core/Container";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import LegalUsersGet from "./GetComponents/LegalUsersGet";
import PhysicalUsersGet from "./GetComponents/PhysicalUsersGet";

const Members = () => {
    const t = useTranslations("Members");
    const locale = useLocale();
    const [isYuridik, setIsYuridik] = useState(false);

    return (
        <div className="pb-5 sm:pb-10">
            <Container>
                <div className="flex justify-between items-center py-5 md:py-10" >
                    <h2 className="text-2xl font-semibold" data-aos="fade-up" data-aos-delay="100" data-aos-duration="500">{t('hero_title')}</h2>
                    <div className="flex items-center gap-2">
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <button className="w-full sm:w-auto px-2 py-1 text-base text-maincolor bg-white border border-maincolor rounded-md hover:bg-maincolor hover:text-white duration-300">{isYuridik ? t('legal') : t('physical')}</button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className=" text-base">
                                    <Link href={`/${locale}/main_all/members`}>
                                        {t("all_members")}
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className=" text-base" onClick={() => setIsYuridik(true)}>{t('legal')}</DropdownMenuItem>
                                <DropdownMenuItem className=" text-base" onClick={() => setIsYuridik(false)}>{t('physical')}</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 duration-100">
                    {isYuridik ? (
                        <LegalUsersGet amount={3} />
                    ) : (
                        <PhysicalUsersGet amount={3} />
                    )
                    }
                </div>
            </Container>
        </div>
    )
}

export default Members;