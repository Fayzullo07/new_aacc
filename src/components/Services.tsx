"use client"
import Container from "./Core/Container";
import { useLocale, useTranslations } from "next-intl";
import ServicesGet from "./GetComponents/ServicesGet";
import Link from "next/link";

const Services = () => {
    const locale = useLocale();
    const t = useTranslations("Services");

    return (
        <div id="services">
            <Container>
                <div className="flex justify-between items-center py-5 md:py-10" >
                    <h2 className="text-2xl font-semibold" data-aos="fade-up" data-aos-delay="100" data-aos-duration="100">{t("hero_title")}</h2>
                    {/* <Link href={`/${locale}/main_all/services`}>
                        <button className="w-full sm:w-auto px-2 py-1 text-base text-maincolor bg-white border border-maincolor rounded-md hover:bg-maincolor hover:text-white duration-300">{t("button")}</button>
                    </Link> */}
                </div>
                <section className="we-offer-area">
                    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 our-offer-items less-carousel">
                        <ServicesGet />
                    </div>
                </section>
            </Container>
        </div>
    )
}

export default Services;