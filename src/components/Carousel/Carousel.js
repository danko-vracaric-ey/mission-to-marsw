import classes from "./Carousel.module.scss";
import { useEffect, useState } from "react";
import CarouselCard from "./CarouselCard/CarouselCard";

const Carousel = (props) => {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);
  const [isInnerWidth, setIsInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setIsInnerWidth(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () =>
        setIsInnerWidth(window.innerWidth)
      );
    };
  }, []);
  useEffect(() => {
    setData(props.data);
  }, [props.data]);

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
                      description={e.explanation.slice(0, 16)}
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
