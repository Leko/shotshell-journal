import { Dispatch } from "redux"
import { connect } from "react-redux"
import { NavigationScreenProps } from "react-navigation"
import { withFormik, WithFormikConfig } from "formik"
import * as Yup from "yup"
import { State } from "../redux/state"
import { UnsavedJournal } from "../models/Journal"
import { JournalForm } from "../components/pages/JournalForm"
import { setJournal } from "../usecases/setJournal"
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
      const id = ownProps.navigation.getParam("id", null)
      await dispatch(setJournal(id, values))
      ownProps.navigation.goBack()
    },
  }
}

const journalForm: WithFormikConfig<
  NavigationScreenProps<{ initialValues: UnsavedJournal }> & {
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
    const { navigation } = props

    const initialValues = navigation.getParam(
      "initialValues",
      {} as UnsavedJournal
    )
    return initialValues
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
