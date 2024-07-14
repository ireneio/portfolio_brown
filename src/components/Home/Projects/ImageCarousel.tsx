import Image, { StaticImageData } from "next/image";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

type CarouselImage = {
  src: StaticImageData;
  alt: string;
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const ImageCarousel = ({ images }: { images: CarouselImage[] }) => {
  return (
    <Carousel responsive={responsive} containerClass="w-[88vw]">
      {images.map((image, index) => {
        return (
          <div key={index}>
            <Image
              src={image.src}
              alt={image.alt}
              quality={95}
              className="object-contain w-[88vw] max-h-[177px]"
            />
          </div>
        )
      })}
    </Carousel>
  )
}

export default ImageCarousel