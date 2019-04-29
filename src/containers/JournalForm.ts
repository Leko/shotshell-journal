import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withFormik, WithFormikConfig } from "formik";
import * as Yup from "yup";
import { State } from "../redux/state";
import { UnsavedJournal } from "../models/Journal";
import { JournalForm } from "../components/pages/JournalForm";
import { addJournal } from "../usecases/addJournal";
import { getLicenses } from "../redux/selectors/getLicenses";

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
    async onSubmit(values: UnsavedJournal) {
      await dispatch(addJournal(values));
      ownProps.history.goBack();
    }
  };
}

const journalForm: WithFormikConfig<
  RouteComponentProps<{ kind: UnsavedJournal["kind"] }> & {
    onSubmit(values: UnsavedJournal): any;
  },
  UnsavedJournal
> = {
  validationSchema: Yup.object().shape({
    date: Yup.date().required(),
    licenseId: Yup.string().required(),
    kind: Yup.string().required(),
    amount: Yup.number()
      .integer()
      .required(),
    // FIXME: should be required
    transferrer: Yup.string(),
    place: Yup.string()
  }),

  mapPropsToValues(props) {
    const { location } = props;

    if ((location.state.kind as Journal["kind"]) === "consume") {
      return {
        date: new Date(),
        kind: "consume",
        licenseId: "", // TODO: 1つのときの制御
        amount: 100,
        transferrer: ""
      };
    } else {
      return {
        date: new Date(),
        kind: "receive",
        licenseId: "", // TODO: 1つのときの制御
        amount: 100,
        transferrer: ""
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
)(withFormik(journalForm)(JournalForm));
