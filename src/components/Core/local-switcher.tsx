"use client"
import { ArrowDownIcon, ChevronDown, ChevronDownIcon, Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { useLocale } from "next-intl"

const LocalSwitcher = () => {
    const locale = useLocale();
    const [isPending, startTransition] = useTransition();
    const [lang, setLang] = useState(locale);
    const router = useRouter();

    const pathname = usePathname();
    const onSelectChange = (e: string) => {
        // alert(pathname.replace("ru", e))
        startTransition(() => {
            router.replace(pathname.replace(locale, e));
        });
    }

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild className=" z-[99999]">
                <Button variant="ghost" size="icon" disabled={isPending} className="w-full px-2" >
                    <div className="mr-2">

                        <Image
                            src={`/languages/${lang == 'uz' ? "uzbekistan" : lang == 'en' ? "english" : "russia"}.png`}
                            width={20}
                            height={20}
                            alt="Image"
                        />
                    </div>
                    <div className="text-base font-normal uppercase mr-1">
                        {lang}
                    </div>
                    <ChevronDownIcon size={20}  />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onSelectChange("en")}>
                    <div className="flex justify-between items-center w-full">
                        <Image
                            src="/languages/english.png"
                            width={20}
                            height={20}
                            alt="Image"
                        />
                        <p className="text-base font-normal">EN</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSelectChange("ru")}>
                    <div className="flex justify-between items-center w-full">

                        <Image
                            src="/languages/russia.png"
                            width={20}
                            height={20}
                            alt="Image"
                        />
                        <p className=" text-base font-normal">RU</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSelectChange("uz")}>
                    <div className="flex justify-between items-center w-full">

                        <Image
                            src="/languages/uzbekistan.png"
                            width={20}
                            height={20}
                            alt="Image"
                        />
                        <p className=" text-base font-normal">UZ</p>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LocalSwitcher;
