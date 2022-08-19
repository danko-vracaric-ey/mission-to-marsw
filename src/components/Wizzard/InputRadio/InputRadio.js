import classes from "./InputRadio.module.scss";

const InputRadio = (props) => {
  const {
    label,
    value1,
    value2,
    isRadioSelected,
    handleRadioClick,
    name,
    id1,
    id2,
  } = props;

  return (
    <div className={classes.container}>
      <label htmlFor="yes">
        <span>*</span>
        {label}
      </label>

      <div className={classes.inputs_wrapper}>
        <div className={classes.inputs}>
          <input
            type="radio"
            id={id1}
            name={name}
            value={value1}
            checked={isRadioSelected(value1)}
            onChange={handleRadioClick}
          />
          <label htmlFor={id1}>Yes</label>
        </div>
        <div className={classes.inputs}>
          <input
            type="radio"
            id={id2}
            name={name}
            value={value2}
            checked={isRadioSelected(value2)}
            onChange={handleRadioClick}
          />
          <label htmlFor={id2}>No</label>
        </div>
      </div>
    </div>
  );
};

export default InputRadio;
