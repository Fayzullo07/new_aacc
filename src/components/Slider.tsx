import React from "react";
import { RssIcon } from "lucide-react";
import Container from "./Core/Container"

import AutoScroll from "embla-carousel-auto-scroll"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import useEmblaCarousel from 'embla-carousel-react'
const Slider = () => {
    const plugin2 = React.useRef(
        AutoScroll({ loop: true, speed: 1, autoScroll: true }),
        // Autoplay({ delay: 2000, stopOnInteraction: true, speed: 1, })
    )



    return (
        <div>
            <Container>
                <Carousel
                    plugins={[plugin2.current]}
                    onMouseEnter={plugin2.current.stop}
                    onMouseLeave={plugin2.current.play}
                    className="w-full">
                    <CarouselContent>
                        {Array.from({ length: 7 }).map((_, index) => (
                            <CarouselItem key={index} className="pr-5 basis-1/2 lg:basis-1/4">
                                <div className="p-1">
                                    <Card className=" cursor-pointer border border-maincolor hover:scale-105 duration-300">
                                        <CardContent className="flex items-center justify-center px-6 p-2">
                                            <span className="text-2xl font-semibold">{index + 1}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </Container>
        </div>
    )
}

export default Slider;