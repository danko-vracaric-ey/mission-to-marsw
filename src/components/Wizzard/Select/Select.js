import classes from "./Select.module.scss";
const Select = (props) => {
  const { value, name, id, label, notMandatory, className, onChange, value2 } =
    props;
  return (
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
        placeholder={"jabadabadu"}
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
  );
};

export default Select;
