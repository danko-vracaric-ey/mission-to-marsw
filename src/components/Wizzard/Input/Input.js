import React from "react";
import classes from "./Input.module.scss";
const Input = React.forwardRef((props, ref) => {
  const {
    className,
    label,
    id,
    name,
    type,
    notMandatory,
    value,
    onBlur,
    onChange,
    disabled,
  } = props;

  return (
    <div className={`${classes.first_input_wrapper} ${className}`}>
      {label && (
        <div className={classes.label}>
          {!notMandatory && <span>*</span>}
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <input
        onBlur={onBlur}
        onChange={onChange}
        type={type}
        id={id}
        name={name}
        value={value}
        ref={ref}
        disabled={disabled}
        placeholder={name}
      />
    </div>
  );
});

export default Input;
