import classes from "./Select.module.scss";
const Select = (props) => {
  const {
    value,
    name,
    id,
    label,
    notMandatory,
    className,
    onChange,
    value2,
    isInvalid,
    errorMessage,
  } = props;
  return (
    <div className={classes.select_input_wrapper}>
      <div className={`${classes.wrapper} ${className}`}>
        {label && (
          <div className={classes.label}>
            {!notMandatory && <span>*</span>}
            <label htmlFor={id}>{label}</label>
          </div>
        )}
        <select
          className={classes.select}
          name={name}
          id={id}
          onChange={onChange}
          value={value2}
        >
          {value.map((title, i) => {
            return (
              <option key={Math.random()} value={title}>
                {title}
              </option>
            );
          })}
        </select>
      </div>
      {isInvalid && <p>{errorMessage}</p>}
    </div>
  );
};

export default Select;
