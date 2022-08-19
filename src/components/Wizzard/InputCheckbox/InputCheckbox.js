import classes from "./InputCheckbox.module.scss";

const InputCheckbox = (props) => {
  const {
    type,
    id,
    name,
    value,
    onChange,
    checked,
    label,
    className,
    isClass,
  } = props;

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

export default InputCheckbox;
