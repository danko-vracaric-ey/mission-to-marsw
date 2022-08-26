import classes from "./ConvictedDetails.module.scss";
import Input from "../Input/Input";

const ConvictedDetails = (props) => {
  const {
    reasons,
    errorMessageReasons,
    reasonsListHandleChange,
    reasonsListRemoveField,
    reasonsListAddField,
  } = props;

  let buttonsContent;
  if (reasons.length === 1) {
    buttonsContent = (
      <div className={classes.convicted_details_buttons_wrapper}>
        <button onClick={reasonsListAddField("add")}>+</button>
      </div>
    );
  }
  return (
    <div className={classes.convicted_details_container}>
      {reasons.map((reason, eachReasonNumber, Reasons) => {
        let whatName = `whatName-${eachReasonNumber}`;
        let whenName = `whenName-${eachReasonNumber}`;

        if (eachReasonNumber === 0) {
          return (
            <div
              key={eachReasonNumber}
              className={classes.convicted_details_wrapper}
            >
              <div className={classes.convicted_details_input_wrapper}>
                <Input
                  name={`whatName`}
                  id={whatName}
                  onChange={(e) => reasonsListHandleChange(e)}
                  type="text"
                  dataid={eachReasonNumber}
                  label="For what?"
                  value={reason.whatName}
                  placeholder={
                    errorMessageReasons.length - 1 >= eachReasonNumber &&
                    errorMessageReasons[eachReasonNumber].errorwhatName
                      ? "Please enter what for"
                      : "What?"
                  }
                />
                <Input
                  name={`whenName`}
                  id={whenName}
                  onChange={(e) => reasonsListHandleChange(e)}
                  type="text"
                  dataid={eachReasonNumber}
                  label="For when?"
                  value={reason.whenName}
                  placeholder={
                    errorMessageReasons.length - 1 >= eachReasonNumber &&
                    errorMessageReasons[eachReasonNumber].errorwhenName
                      ? "Please enter when"
                      : "When?"
                  }
                />
              </div>
              {buttonsContent}
            </div>
          );
        }
        if (eachReasonNumber === Reasons.length - 1) {
          return (
            <div
              key={eachReasonNumber}
              className={classes.convicted_details_wrapper}
            >
              <div className={classes.convicted_details_input_wrapper}>
                <Input
                  name={`whatName`}
                  id={whatName}
                  onChange={(e) => reasonsListHandleChange(e)}
                  type="text"
                  dataid={eachReasonNumber}
                  label="For what?"
                  value={reason.whatName}
                  placeholder={
                    errorMessageReasons.length - 1 >= eachReasonNumber &&
                    errorMessageReasons[eachReasonNumber].errorwhatName
                      ? "Please enter what for"
                      : "What?"
                  }
                />
                <Input
                  name={`whenName`}
                  id={whenName}
                  onChange={(e) => reasonsListHandleChange(e)}
                  type="text"
                  dataid={eachReasonNumber}
                  label="For when?"
                  value={reason.whenName}
                  placeholder={
                    errorMessageReasons.length - 1 >= eachReasonNumber &&
                    errorMessageReasons[eachReasonNumber].errorwhenName
                      ? "Please enter when?"
                      : "When?"
                  }
                />
              </div>

              <div className={classes.convicted_details_buttons_wrapper}>
                <button onClick={reasonsListRemoveField(eachReasonNumber)}>
                  -
                </button>
                <button onClick={reasonsListAddField("add")}>+</button>
              </div>
            </div>
          );
        }
        if (eachReasonNumber > 0 && eachReasonNumber < Reasons.length - 1) {
          return (
            <div
              key={eachReasonNumber}
              className={classes.convicted_details_wrapper}
            >
              <div className={classes.convicted_details_input_wrapper}>
                <Input
                  name={`whatName`}
                  id={whatName}
                  onChange={(e) => reasonsListHandleChange(e)}
                  type="text"
                  dataid={eachReasonNumber}
                  label="For what?"
                  value={reason.whatName}
                  placeholder={
                    errorMessageReasons.length - 1 >= eachReasonNumber &&
                    errorMessageReasons[eachReasonNumber].errorwhatName
                      ? "Please enter what for"
                      : "What?"
                  }
                />
                <Input
                  name={`whenName`}
                  id={whenName}
                  onChange={(e) => reasonsListHandleChange(e)}
                  type="text"
                  dataid={eachReasonNumber}
                  label="For when?"
                  value={reason.whenName}
                  placeholder={
                    errorMessageReasons.length - 1 >= eachReasonNumber &&
                    errorMessageReasons[eachReasonNumber].errorwhenName
                      ? "Please enter when?"
                      : "When?"
                  }
                />
              </div>
              <div className={classes.convicted_details_buttons_wrapper}>
                <button onClick={reasonsListRemoveField(eachReasonNumber)}>
                  -
                </button>
              </div>
            </div>
          );
        }
        return <></>;
      })}
    </div>
  );
};

export default ConvictedDetails;
