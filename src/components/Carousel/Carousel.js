import classes from "./Carousel.module.scss";
import { useEffect, useState } from "react";
import CarouselCard from "./CarouselCard/CarouselCard";

const Carousel = ({ data }) => {
  const [current, setCurrent] = useState(0);
  const [isInnerWidth, setIsInnerWidth] = useState(window.innerWidth);

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
      data.forEach((e, i, arr) =>
        !(i % 1) ? splitDataArr.push(arr.slice(i, i + 1)) : ""
      );
    }
    if (isInnerWidth < 768 && isInnerWidth > 480) {
      data.forEach((e, i, arr) =>
        !(i % 2) ? splitDataArr.push(arr.slice(i, i + 2)) : ""
      );
    }
    if (isInnerWidth > 768) {
      data.forEach((e, i, arr) =>
        !(i % 4) ? splitDataArr.push(arr.slice(i, i + 4)) : ""
      );
    }
  };

  splitData();
  let buttons = [];
  return (
    <div className={classes.slider_container}>
      <div className={classes.left_button_wrapper}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/e8/ArrowRight-gray.svg"
          onClick={() => {
            if (current !== 0) {
              setCurrent(current - 1);
            }
          }}
        ></img>
      </div>
      {
        <div className={classes.slider_wrapper}>
          <div className={classes.cards_wrapper}>
            {splitDataArr.map((e, i, arr) => {
              buttons.push(
                <button
                  type="button"
                  className={current === i ? classes.active : classes.notactive}
                  onClick={() => {
                    setCurrent(i);
                  }}
                ></button>
              );
              if (current === i) {
                return e.map((e, i, arr) => {
                  return (
                    <CarouselCard
                      key={i}
                      url={e.url}
                      description={e.explanation.slice(0, 120)}
                      title={e.title}
                    />
                  );
                });
              }
            })}
          </div>
          <div className={classes.button_scroller}>{buttons}</div>
        </div>
      }
      <div className={classes.right_button_wrapper}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/e8/ArrowRight-gray.svg"
          onClick={() => {
            if (current !== splitDataArr.length - 1) {
              setCurrent(current + 1);
            }
          }}
        ></img>
      </div>
    </div>
  );
};

export default Carousel;
