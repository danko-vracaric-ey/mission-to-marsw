import classes from "./ConvictedDetails.module.scss";
import Input from "../Input/Input";
import {
  WIZARD_PAGE_3_CONVICTED_DETAILS_WHAT_ERROR_LABEL,
  WIZARD_PAGE_3_CONVICTED_DETAILS_WHAT_LABEL,
  WIZARD_PAGE_3_CONVICTED_DETAILS_WHAT_PLACEHOLDER,
  WIZARD_PAGE_3_CONVICTED_DETAILS_WHEN_LABEL,
} from "../../../static";
import PropTypes from "prop-types";

/**
 * Component for handling conviction details
 * @param {object} props Input pairs validation and render handling logic
 * @returns {JSX} Pairs of inputs for entering conviction details
 */

const ConvictedDetails = (props) => {
  const {
    convictions,
    errorMessageReasons,
    reasonsListHandleChange,
    reasonsListRemoveField,
    reasonsListAddField,
  } = props;

  return (
    <div className={classes.convicted_details_container}>
      {convictions.map((reason, eachReasonNumber, Reasons) => {
        let forWhat = `forWhat-${eachReasonNumber}`;
        let convictionDate = `convictionDate-${eachReasonNumber}`;

        if (eachReasonNumber === Reasons.length - 1) {
          return (
            <div
              key={eachReasonNumber}
              className={classes.convicted_details_wrapper}
            >
              <div className={classes.convicted_details_input_wrapper}>
                <Input
                  name={`forWhat`}
                  id={forWhat}
                  onChange={(e) => reasonsListHandleChange(e)}
                  type="text"
                  dataid={eachReasonNumber}
                  label={WIZARD_PAGE_3_CONVICTED_DETAILS_WHAT_LABEL}
                  value={reason.forWhat}
                  placeholder={
                    errorMessageReasons.length - 1 >= eachReasonNumber &&
                    errorMessageReasons[eachReasonNumber].errorwhatName
                      ? WIZARD_PAGE_3_CONVICTED_DETAILS_WHAT_ERROR_LABEL
                      : WIZARD_PAGE_3_CONVICTED_DETAILS_WHAT_PLACEHOLDER
                  }
                />
                <Input
                  name={`convictionDate`}
                  id={convictionDate}
                  onChange={(e) => reasonsListHandleChange(e)}
                  type="date"
                  dataid={eachReasonNumber}
                  label={WIZARD_PAGE_3_CONVICTED_DETAILS_WHEN_LABEL}
                  value={reason.convictionDate}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className={classes.convicted_details_buttons_wrapper}>
                <button
                  disabled={Reasons.length === 1}
                  onClick={reasonsListRemoveField(eachReasonNumber)}
                >
                  -
                </button>
                <button onClick={reasonsListAddField("add")}>+</button>
              </div>
            </div>
          );
        }
        if (eachReasonNumber >= 0 && eachReasonNumber < Reasons.length - 1) {
          return (
            <div
              key={eachReasonNumber}
              className={classes.convicted_details_wrapper}
            >
              <div className={classes.convicted_details_input_wrapper}>
                <Input
                  name={`forWhat`}
                  id={forWhat}
                  onChange={(e) => reasonsListHandleChange(e)}
                  type="text"
                  dataid={eachReasonNumber}
                  label={WIZARD_PAGE_3_CONVICTED_DETAILS_WHAT_LABEL}
                  value={reason.forWhat}
                  placeholder={
                    errorMessageReasons.length - 1 >= eachReasonNumber &&
                    errorMessageReasons[eachReasonNumber].errorwhatName
                      ? WIZARD_PAGE_3_CONVICTED_DETAILS_WHAT_ERROR_LABEL
                      : WIZARD_PAGE_3_CONVICTED_DETAILS_WHAT_PLACEHOLDER
                  }
                />
                <Input
                  name={`convictionDate`}
                  id={convictionDate}
                  onChange={(e) => reasonsListHandleChange(e)}
                  type="date"
                  dataid={eachReasonNumber}
                  label={WIZARD_PAGE_3_CONVICTED_DETAILS_WHEN_LABEL}
                  value={reason.convictionDate}
                  min="1945-12-31"
                  max={new Date().toISOString().split("T")[0]}
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

ConvictedDetails.propTypes = {
  props: PropTypes.shape({
    convictions: PropTypes.arrayOf(
      PropTypes.shape({
        forWhat: PropTypes.string,
        convictionDate: PropTypes.string,
      })
    ),
    errorMessageReasons: PropTypes.arrayOf(
      PropTypes.shape({
        errorwhatName: PropTypes.string,
        errorWhenName: PropTypes.string,
      })
    ),
    reasonsListHandleChange: PropTypes.func,
    reasonsListAddField: PropTypes.func,
    reasonsListRemoveField: PropTypes.func,
  }),
};

export default ConvictedDetails;
