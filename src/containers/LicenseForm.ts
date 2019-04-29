import { Dispatch } from "redux";
import { connect } from "react-redux";
import addYears from "date-fns/add_years";
import subDays from "date-fns/sub_days";
import { RouteComponentProps } from "react-router";
import { withFormik, WithFormikConfig } from "formik";
import * as Yup from "yup";
import { State } from "../redux/state";
import { LicenseForm } from "../components/pages/LicenseForm";
import { addLicense } from "../usecases/addLicense";
import { getLicenses } from "../redux/selectors/getLicenses";
import { License, UnsavedLicense } from "../models/License";

function mapStateToProps(state: State) {
  return {
    licenses: getLicenses(state)
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<any>,
  ownProps: RouteComponentProps
) {
  return {
    async onSubmit(values: UnsavedLicense) {
      await dispatch(addLicense(values));
      ownProps.history.goBack();
    }
  };
}

const journalForm: WithFormikConfig<
  RouteComponentProps<{ kind: UnsavedLicense["kind"] }> & {
    onSubmit(values: UnsavedLicense): any;
  },
  UnsavedLicense
> = {
  isInitialValid(props) {
    const values = journalForm.mapPropsToValues!(props);
    return journalForm.validationSchema.isValidSync(values);
  },
  validationSchema: Yup.object().shape({
    kind: Yup.string().required(),
    gauge: Yup.number()
      .integer()
      .required(),
    purpose: Yup.string().required(),
    startsAt: Yup.date().required(),
    // FIXME: should be required
    amount: Yup.number().integer(),
    expiredAt: Yup.date()
  }),

  mapPropsToValues(props) {
    const { location } = props;

    if (
      location.state &&
      (location.state.kind as License["kind"]) === "unlimited"
    ) {
      return {
        kind: "unlimited",
        purpose: "SHOOTING",
        gauge: 18,
        startsAt: new Date()
      };
    } else {
      return {
        kind: "limited",
        purpose: "SHOOTING",
        startsAt: new Date(),
        expiredAt: subDays(addYears(new Date(), 1), 1),
        amount: 100,
        gauge: 18
      };
    }
  },

  handleSubmit(values, bag) {
    bag.setSubmitting(true);
    try {
      bag.props.onSubmit(values);
    } finally {
      bag.setSubmitting(false);
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFormik(journalForm)(LicenseForm));
