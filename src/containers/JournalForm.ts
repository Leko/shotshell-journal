import { Dispatch } from "redux"
import { connect } from "react-redux"
import { NavigationScreenProps } from "react-navigation"
import { withFormik, WithFormikConfig } from "formik"
import * as Yup from "yup"
import { State } from "../redux/state"
import { UnsavedJournal } from "../models/Journal"
import { JournalForm } from "../components/pages/JournalForm"
import { addJournal } from "../usecases/addJournal"
import { getLicenses } from "../redux/selectors/getLicenses"
import { License } from "../models/License"
import { getJournals } from "../redux/selectors/getJournals"

function mapStateToProps(state: State) {
  return {
    licenses: getLicenses(state),
    journals: getJournals(state),
  }
}

function mapDispatchToProps(
  dispatch: Dispatch<any>,
  ownProps: NavigationScreenProps
) {
  return {
    async onSubmit(values: UnsavedJournal) {
      await dispatch(addJournal(values))
      ownProps.navigation.goBack()
    },
  }
}

const journalForm: WithFormikConfig<
  NavigationScreenProps<{ kind: UnsavedJournal["kind"] }> & {
    licenses: License[]
    onSubmit(values: UnsavedJournal): any
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
    place: Yup.string(),
  }),

  mapPropsToValues(props) {
    const { licenses, navigation } = props

    const kind = navigation.getParam("kind", "consume")
    if (kind === "consume") {
      return {
        date: new Date(),
        kind: "consume",
        licenseId: licenses.length === 1 ? licenses[0].id : "", // TODO: 1つのときの制御
        amount: 100,
        transferrer: "",
      }
    } else {
      return {
        date: new Date(),
        kind: "receive",
        licenseId: licenses.length === 1 ? licenses[0].id : "", // TODO: 1つのときの制御
        amount: 100,
        transferrer: "",
      }
    }
  },

  handleSubmit(values, bag) {
    bag.setSubmitting(true)
    try {
      bag.props.onSubmit(values)
    } finally {
      bag.setSubmitting(false)
    }
  },
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFormik(journalForm)(JournalForm))
