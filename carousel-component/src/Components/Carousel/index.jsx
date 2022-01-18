import styles from "./Carousel.module.scss";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import leftArrow from "../../img/leftArrow.png";
import rightArrow from "../../img/rightArrow.png";

const Carousel = (props) => {
  let carouselData = props.data;
  const [data, setData] = useState(carouselData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flaggerMinus, setFlaggerMinus] = useState(false);
  const [flaggerMax, setFlaggerMax] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < activeIndex) {
      const shifted = carouselData.splice(carouselData.length - 1, 1);
      carouselData.unshift(...shifted);

      setTimeout(() => {
        setFlaggerMinus(false);
      }, 500);
    } else if (newIndex > activeIndex) {
      setTimeout(() => {
        const shift = carouselData.shift();
        carouselData.push(shift);
        setFlaggerMax(false);
      }, 500);
    }

    setData(carouselData);

    setActiveIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!flaggerMax) {
        updateIndex(activeIndex + 1);
        setFlaggerMax(true);
      }
    },
    onSwipedRight: () => {
      if (!flaggerMinus || flaggerMax) {
        updateIndex(activeIndex - 1);
        setFlaggerMinus(true);
      }
    },
  });
  return (
    <div {...handlers}>
      <div className={styles.carousel}>
        <div className={`${styles.inner}`} id="slider">
          {data.map((image, key) => {
            return (
              <div
                key={key}
                className={`${styles.slides} ${
                  flaggerMinus ? styles.movementMinus : ""
                } ${flaggerMax ? styles.movementMax : ""}`}
              >
                <img src={image} alt={`carousel.img`} />
              </div>
            );
          })}
        </div>
        <div className={styles.indicators}>
          <button
            className={styles.buttonLeft}
            onClick={() => {
              if (!flaggerMinus || flaggerMax) {
                updateIndex(activeIndex - 1);
                setFlaggerMinus(true);
              }
            }}
          >
            <img src={leftArrow} alt="leftArrow" />
          </button>
          <button
            className={styles.buttonRight}
            onClick={() => {
              if (!flaggerMax || flaggerMinus) {
                updateIndex(activeIndex + 1);
                setFlaggerMax(true);
              }
            }}
          >
            <img src={rightArrow} alt="leftArrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
