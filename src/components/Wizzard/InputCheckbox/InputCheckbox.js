import classes from "./InputCheckbox.module.scss";
import PropTypes from "prop-types";

/**
 * Reusable Input type checkbox component
 * @param {object} props Checkbox input prop configuration data
 * @returns {JSX} Checkmark field
 */

const InputCheckbox = (props) => {
  const { id, name, value, onChange, checked, label, className, isClass } =
    props;

  return (
    <div className={isClass ? className : classes.wrapper}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

InputCheckbox.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    label: PropTypes.string,
    className: PropTypes.string,
    isClass: PropTypes.bool,
  }),
};

export default InputCheckbox;
