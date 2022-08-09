import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./Carousel.module.scss";
import CarouselCard from "./CarouselCard/CarouselCard";
import CarouselArrow from "./CarouselArrow/CarouselArrow";
import CarouselArrowLayout from "../../layout/CarouselArrowLayout/CarouselArrowLayout";

/**
 * Shows images in a slider type carousel that user can control
 *
 * @param {array} randomSelectionOfImages Images data used to show images and it's details.
 * @returns {JSX} A slider with buttons to switch between selected groups of images and two buttons to move left and right through the selected groups.
 */

const Carousel = ({ data: randomSelectionOfImages }) => {
  const [current, setCurrent] = useState(0);
  const [isInnerWidth, setIsInnerWidth] = useState(window.innerWidth);

  let showRightArrow;

  const debounce = (fn, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(fn, delay, [...args]);
    };
  };
  useEffect(() => {
    const updateSize = function () {
      setIsInnerWidth(window.innerWidth);
    };

    const debouncedUpdateSize = debounce(updateSize, 200);
    window.addEventListener("resize", debouncedUpdateSize);
    updateSize();

    return () => {
      window.removeEventListener("resize", () => debouncedUpdateSize);
    };
  }, []);

  let splitDataArr = [];
  const splitData = () => {
    if (isInnerWidth < 480) {
      randomSelectionOfImages.forEach((image, imagePosition, imagesOfTheDay) =>
        !(imagePosition % 1)
          ? splitDataArr.push(
              imagesOfTheDay.slice(imagePosition, imagePosition + 1)
            )
          : ""
      );
    }
    if (isInnerWidth < 768 && isInnerWidth > 480) {
      randomSelectionOfImages.forEach((image, imagePosition, imagesOfTheDay) =>
        !(imagePosition % 2)
          ? splitDataArr.push(
              imagesOfTheDay.slice(imagePosition, imagePosition + 2)
            )
          : ""
      );
    }
    if (isInnerWidth > 768) {
      randomSelectionOfImages.forEach((image, imagePosition, imagesOfTheDay) =>
        !(imagePosition % 4)
          ? splitDataArr.push(
              imagesOfTheDay.slice(imagePosition, imagePosition + 4)
            )
          : ""
      );
    }
  };

  splitData();
  let buttons = [];
  return (
    <div className={classes.slider_container}>
      <CarouselArrowLayout>
        {current !== 0 && (
          <CarouselArrow
            className={classes.left_button_wrapper}
            alt="left-arrow"
            onClick={() => {
              if (current !== 0) {
                setCurrent(current - 1);
              }
            }}
          />
        )}
      </CarouselArrowLayout>
      {
        <div className={classes.slider_wrapper}>
          <div className={classes.cards_wrapper}>
            {splitDataArr.map(
              (imageBatch, imageBatchPosition, imageBatches) => {
                showRightArrow = imageBatches.length - 1;
                buttons.push(
                  <button
                    key={"btn" + imageBatchPosition}
                    type="button"
                    className={
                      current === imageBatchPosition
                        ? classes.active
                        : classes.notactive
                    }
                    onClick={() => {
                      setCurrent(imageBatchPosition);
                    }}
                  ></button>
                );
                if (current === imageBatchPosition) {
                  return imageBatch.map((image, imagePosition) => {
                    return (
                      <CarouselCard
                        key={image.url.slice(0, 5) + imagePosition}
                        image={image}
                      />
                    );
                  });
                }
              }
            )}
          </div>
          <div className={classes.button_scroller}>{buttons}</div>
        </div>
      }
      <CarouselArrowLayout>
        {showRightArrow !== current && (
          <CarouselArrow
            alt="right-arrow"
            onClick={() => {
              if (current !== splitDataArr.length - 1) {
                setCurrent(current + 1);
              }
            }}
          />
        )}
      </CarouselArrowLayout>
    </div>
  );
};

Carousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      explanation: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};

export default Carousel;
