import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { useRef } from "react"

import AutoScroll from "embla-carousel-auto-scroll"
const ImagesCarusel = ({ images, button = false }: { images: any, button: Boolean }) => {
    const plugin1 = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
        // AutoScroll({ loop: true, speed: 1, autoScroll: true }),
    )
    return (
        <Carousel
            plugins={[plugin1.current]}
            className="w-full"
            onMouseEnter={plugin1.current.stop}
            onMouseLeave={plugin1.current.play}
        >
            <CarouselContent>
                {images.map((item: any, index: number) => (
                    <CarouselItem key={index}>
                        <div className=" border bg-maincolor">
                            {/* <Card> */}
                            {/* <CardContent className="flex aspect-square items-center justify-center p-6"> */}
                            {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                            <Image
                                src={item}
                                width={0}
                                height={0}
                                className="transition hover:scale-110 duration-300 shadow-xl"
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }} // optional
                                alt="Image"
                            />
                            {/* </CardContent> */}
                            {/* </Card> */}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {!button && (
                <><CarouselPrevious /><CarouselNext /></>
            )}
        </Carousel>
    )
}

export default ImagesCarusel;