import React from "react";
import Image from "./image";
import useIntersectionObserver from "../hooks/use-intersection-observer";
import "./image-container.css";

const ImageContainer = props => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        if (!isVisible) {
          props.onIsVisible();
          setIsVisible(true);
        }
        observerElement.unobserve(ref.current);
      }
    }
  });

  const aspectRatio = (props.height / props.width) * 100;

  return (
    <div
      ref={ref}
      className="image-container"
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      {isVisible && (
        <Image src={props.src} thumb={props.thumb} alt={props.alt} />
      )}
    </div>
  );
};

export default ImageContainer;
