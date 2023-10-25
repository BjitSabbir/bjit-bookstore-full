import { useState, useEffect, useRef } from "react";
import "./sliderComponent.scss";

const App = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  const images = [
    "https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/289/original/33106_RememberUs_Bookshop-Banners_2048x600.gif?1696946903",
    "https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/290/original/94805-Foul-Heart-2048x600.jpg?1696946651",

    // "https://images.squarespace-cdn.com/content/v1/552beafbe4b0f5818ce21d16/1575400779647-TANHLFJQGVSLO01G8L7E/AB-christmas-sale-wide.png",
  ];

  const totalSlides = images.length;
  const intervalDuration = 10000; // Change this to adjust the interval duration (in milliseconds)

  const desired = (e) => {
    setCurrent(Number(e.target.id));
  };

  useEffect(() => {
    ref.current.style.transition = "transform 0.2s ease-in-out";
    ref.current.style.transform = `translateX(-${current * 100}%)`;

    // Automatically change the slide every intervalDuration milliseconds
    const interval = setInterval(() => {
      setCurrent((prevCurrent) => (prevCurrent + 1) % totalSlides);
    }, intervalDuration);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [current, totalSlides]);

  return (
    <div className="slider-wrapper">
      <div className="frame">
        <div className="box-container" ref={ref}>
          {images.map((imageUrl, index) => (
            <div className="box" key={index}>
              <img src={imageUrl} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="button-2-container">
        {images.map((_, index) => (
          <div
            className={`button-2 ${index === current ? "active" : ""}`}
            onClick={desired}
            id={index}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
