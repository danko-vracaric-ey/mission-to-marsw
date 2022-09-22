import classes from "./Select.module.scss";
import PropTypes from "prop-types";

/**
 * Reusable select component
 * @param {object} props Select prop configuration data
 * @returns {JSX} Select field with conditional text label
 */

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
    disabled,
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
          disabled={disabled ? disabled : false}
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
      {isInvalid && !disabled && <p>{errorMessage}</p>}
    </div>
  );
};

Select.propTypes = {
  props: PropTypes.shape({
    value: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    notMandatory: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    value2: PropTypes.array,
    isInvalid: PropTypes.bool,
    errorMessage: PropTypes.string,
    disabled: PropTypes.bool,
  }),
};

export default Select;
