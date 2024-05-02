"use client"
import Container from "./Core/Container";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import PartnersGet from "./GetComponents/PartnersGet";

const Partners = () => {
    const locale = useLocale();
    const t = useTranslations("Partners");

    return (
        <div className="pb-5 sm:pb-10 bg-slate-50">
            <Container>
                <div className="flex justify-between items-center py-5 md:py-10" >
                    <h2 className="text-2xl font-semibold" data-aos="fade-up" data-aos-delay="100" data-aos-duration="100">{t("hero_title")}</h2>
                    <Link href={`/${locale}/main_all/partners`}>
                        <button className="w-full sm:w-auto px-2 py-1 text-base text-maincolor bg-white border border-maincolor rounded-md hover:bg-maincolor hover:text-white duration-300">{t("button")}</button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    <PartnersGet amount={3} />
                </div>
            </Container>

        </div>

    )
}

export default Partners;