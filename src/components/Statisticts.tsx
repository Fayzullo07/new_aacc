import Image from "next/image";
import Container from "./Core/Container";
import { AwardIcon, Building2Icon, SmilePlusIcon, User2Icon } from "lucide-react";

import CountUp from "react-countup";
import { useTranslations } from "next-intl";


const Statistics = () => {
    const t = useTranslations("Stats");
    return (
        <section id="stats" className="bg-white">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 ">
                    <div className="flex flex-col justify-around text-xl text-green-500 ">
                        <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="500">
                            <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-green-500">{t("title")}</h1>
                            <div className=" text-gray-500 my-5">{t("desc")}</div>
                        </div>
                        <div className="flex lg:flex-row flex-col justify-between" data-aos="fade-up" data-aos-delay="100" data-aos-duration="500">

                            <div className="flex flex-col gap-6 mb-4">

                                <div className="flex gap-4">
                                    <div className="text-green-500">
                                        <Building2Icon size={32} />
                                    </div>
                                    <div>
                                        <b className="mb-2 text-2xl md:text-3xl font-bold">
                                            {
                                                <CountUp
                                                    enableScrollSpy
                                                    start={0}
                                                    end={92}
                                                    duration={2}
                                                    delay={0}
                                                />
                                            }
                                        </b>
                                        <p className="font-light text-gray-500 dark:text-gray-400">{t("companies")}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-green-500">
                                        <User2Icon size={32} />
                                    </div>
                                    <div>
                                        <b className="mb-2 text-2xl md:text-3xl font-bold ">
                                            {
                                                <CountUp
                                                    enableScrollSpy
                                                    start={0}
                                                    end={25}
                                                    duration={2}
                                                    delay={0}
                                                />
                                            }
                                        </b>
                                        <p className="font-light text-gray-500 dark:text-gray-400">{t("consulting")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex gap-4">
                                    <div className="text-green-500">
                                        <AwardIcon size={32} />
                                    </div>
                                    <div>
                                        <b className="mb-2 text-2xl md:text-3xl font-bold">
                                            {
                                                <CountUp
                                                    enableScrollSpy
                                                    start={0}
                                                    end={27}
                                                    duration={2}
                                                    delay={0}
                                                />
                                            }
                                        </b>
                                        <p className="font-light text-gray-500 dark:text-gray-400">{t("winners")}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-green-500">
                                        <SmilePlusIcon size={32} />
                                    </div>
                                    <div>
                                        <b className="mb-2 text-2xl md:text-3xl font-bold">
                                            {
                                                <CountUp
                                                    enableScrollSpy
                                                    start={0}
                                                    end={187}
                                                    duration={2}
                                                    delay={0}
                                                />
                                            }
                                        </b>
                                        <p className="font-light text-gray-500 dark:text-gray-400">{t("clients")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" flex justify-center items-center image_anm" data-aos="fade-up" data-aos-delay="100" data-aos-duration="500">
                        <Image
                            src="/stats.png"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }} // optional
                            alt="Image"
                        />
                    </div>
                </div>
            </Container>

        </section>
    )
}

export default Statistics;