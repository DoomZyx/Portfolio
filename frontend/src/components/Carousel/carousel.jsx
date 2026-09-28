/* eslint-disable react/prop-types -- pas de PropTypes dans ce projet */
import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "swiper/css";
import { useState } from "react";

function Carousel({ images, projectTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const label = projectTitle || "Projet";

  return (
    <>
      <Swiper spaceBetween={50} slidesPerView={1} loop={images.length > 1}>
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <button
              type="button"
              className="carousel-open-lightbox"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
              aria-label={`Agrandir l’image ${index + 1} de ${label}`}
            >
              <img
                src={img}
                alt={`${label}, image ${index + 1}`}
                width={1916}
                height={912}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={images.map((src) => ({ src }))}
          index={photoIndex}
        />
      )}
    </>
  );
}

export default Carousel;
