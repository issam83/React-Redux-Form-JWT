import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./carouselDirectory";

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

const items = [
  {
    id: 1,
    altText: "Slide 1",
    caption: "Slide 1",
    src:
      "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?cs=srgb&dl=pair-of-white-air-jordan-1-s-2385477.jpg&fm=jpg"
  },
  {
    id: 2,
    altText: "Slide 2",
    caption: "Slide 2",
    src:
      "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?cs=srgb&dl=pair-of-white-air-jordan-1-s-2385477.jpg&fm=jpg"
  },
  {
    id: 3,
    altText: "Slide 3",
    caption: "Slide 3",
    src:
      "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?cs=srgb&dl=pair-of-white-air-jordan-1-s-2385477.jpg&fm=jpg"
  }
];

const CarouselDirectory = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        // <img src={item.image}/>
      >
        <img
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
          src={item.src}
          alt={item.altText}
        />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <div style={{ marginBottom: 40 }}>
      <style>
        {`.custom-tag {
                max-width: 100%;
                height: 500px;
                background: black;
              }`}
      </style>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
};

export default CarouselDirectory;
