import classes from "./SubmitModal.module.scss";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import WizzardButtons from "../WizzardButtons/WizzardButtons";
import PropTypes from "prop-types";
import {
  WIZARD_PAGE_3_SUBMIT_MODAL_BUTTON_FINISH,
  WIZARD_PAGE_3_SUCCESS_RESPONSE_LINE,
  WIZARD_PAGE_3_SUCCESS_RESPONSE_TEXT,
} from "../../../static";

/**
 * Submit modal that handles succes and error after successfully filling all forms
 *
 * @param {object} props Data needed for modal rendering logic and leaving wizard
 * @returns {JSX} Modal with a message and two buttons
 */

const SubmitModal = (props) => {
  const {
    isLoading,
    setIsModal,
    handleWizardExit,
    error,
    candidateDataPostResponse,
  } = props;

  const onBackHandler = () => {
    setIsModal(false);
  };
  const onSubmitHandler = () => {
    handleWizardExit();
  };
  let content;
  let successfulResponse =
    candidateDataPostResponse.request.statusText === "Created";
  if (error) {
    content = <div className={classes.response}>{error}</div>;
  }
  if (successfulResponse) {
    content = (
      <div className={classes.response}>
        <div className={classes.success}>
          {WIZARD_PAGE_3_SUCCESS_RESPONSE_LINE}
        </div>
        <div className={classes.response_text}>
          {WIZARD_PAGE_3_SUCCESS_RESPONSE_TEXT}
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className={classes.wrapper}>
          <div className={classes.content_holder}>
            {content}

            <WizzardButtons
              onClickBackHandler={onBackHandler}
              onClickSubmitHandler={onSubmitHandler}
              buttonText={WIZARD_PAGE_3_SUBMIT_MODAL_BUTTON_FINISH}
              disabledBack={successfulResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
};

SubmitModal.propTypes = {
  props: PropTypes.shape({
    isLoading: PropTypes.func,
    setIsModal: PropTypes.func,
    handleWizardExit: PropTypes.func,
    error: PropTypes.string,
    candidateDataPostResponse: PropTypes.string,
  }),
};

export default SubmitModal;
