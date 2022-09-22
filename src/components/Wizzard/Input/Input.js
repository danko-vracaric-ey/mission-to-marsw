import React from "react";
import classes from "./Input.module.scss";
import PropTypes from "prop-types";

/**
 * Reusable input component
 * @param {object} props Input prop configuration data
 * @returns {JSX} Input field with conditional text label
 */

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
    errorMessage,
    isInvalid,
    min,
    max,
    dataid,
    placeholder,
  } = props;

  return (
    <div className={classes.name_input_wrapper}>
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
          placeholder={placeholder ? placeholder : name}
          min={min}
          max={max}
          data-id={dataid}
        />
        {isInvalid && !disabled && <p>{errorMessage}</p>}
      </div>
    </div>
  );
});

Input.propTypes = {
  props: PropTypes.shape({
    className: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    notMandatory: PropTypes.bool,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    isInvalid: PropTypes.bool,
    min: PropTypes.string,
    max: PropTypes.string,
    dataid: PropTypes.string,
    placeholder: PropTypes.string,
  }),
};

export default Input;
