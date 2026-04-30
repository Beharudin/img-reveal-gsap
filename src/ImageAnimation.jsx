import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { img1, img2, img3, img4, img5, img6 } from "./assets";

import './index.css'

gsap.registerPlugin(useGSAP);

const ImageAnimation = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  const images = [img1, img2, img3, img4, img5, img6];

  useGSAP(
    () => {
      const images = imagesRef.current;

      const startPositions = [
        { x: "-120vh", y: "-50vh" },
        { x: "120vh", y: "-60vh" },
        { x: "-130vh", y: "60vh" },
        { x: "130vh", y: "50vh" },
        { x: "0vh", y: "-120vh" },
        { x: "10vh", y: "100vh" },
      ];

      const finalPositions = [
        { x: "-40%", y: "20%", rotation: 7 },
        { x: "40%", y: "-45%", rotation: -12 },
        { x: "-45%", y: "-35%", rotation: 10 },
        { x: "20%", y: "25%", rotation: -15 },
        { x: "45%", y: "-15%", rotation: -5 },
        { x: "0%", y: "0%", rotation: 0 },
      ];

      images.forEach((img, index) => {
        gsap.set(img, {
          x: startPositions[index].x,
          y: startPositions[index].y,
          rotation: gsap.utils.random(-60, 60),
          scale: 0.5,
          visibility: "visible",
        });
      });

      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2500",
          scrub: 2,
          pin: true,
          anticipatePin: 1,
        },
      });

      images.forEach((img, index) => {
        t1.to(
          img,
          {
            x: finalPositions[index].x,
            y: finalPositions[index].y,
            rotation: finalPositions[index].rotation,
            scale: 1,
            ease: "power2.out",
            duration: 1,
          },
          index * 0.3,
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section className="container" ref={containerRef}>
      <div className="center-point">
        {images.map((img, index) => (
          <div
            key={index}
            className="img-wrapper"
            ref={(el) => (imagesRef.current[index] = el)}
          >
            <img src={img} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageAnimation;
